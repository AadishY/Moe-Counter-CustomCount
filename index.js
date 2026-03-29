"use strict";

require('dotenv').config();
const express = require("express");
const compression = require("compression");
const path = require("path");
const less = require("less");
const fs = require("fs");
const { z } = require("zod");
const { Redis } = require("@upstash/redis");

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const { themeList, getCountImage } = require("./utils/themify");
const { cors, ZodValid } = require("./utils/middleware");
const { randomArray, logger } = require("./utils");

const app = express();

const DEFAULT_COUNT = 0;
const PORT = process.env.APP_PORT || 3000;
let SITE = process.env.APP_SITE || `http://localhost:${PORT}`;
if (SITE.endsWith('/')) SITE = SITE.slice(0, -1);

// Theme groups for random modes
const ANIME_THEMES = [
  'asoul', 'booru-jaypee', 'booru-koe', 'booru-lewd', 'booru-lisu',
  'booru-qualityhentais', 'booru-smtg', 'booru-touhoulat', 'gelbooru',
  'gelbooru-h', 'green', 'moebooru', 'moebooru-h', 'rule34',
  'original-new', 'original-old'
].filter(t => t in themeList);

const ANIMATION_THEMES = [
  'booru-lewd', 'rule34'
].filter(t => t in themeList);

app.use(compression());
app.use(cors());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "assets")));

// Dynamic LESS to CSS compilation
app.get('/style.css', async (req, res) => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'assets', 'style.less'), 'utf8');
    const { css } = await less.render(raw);
    res.setHeader('Content-Type', 'text/css');
    res.send(css);
  } catch (err) {
    logger.error('LESS compilation error:', err);
    res.status(500).send('/* LESS Error */');
  }
});

app.get('/', (req, res) => {
  const ga_id = process.env.GA_ID || null
  res.render('index', {
    site: SITE,
    ga_id,
    themeList,
  })
});

// get the image
app.get(["/@:name", "/get/@:name"],
  (req, res, next) => {
    // Capture original query keys to detect explicit params before Zod adds defaults
    req._rawQueryKeys = Object.keys(req.query);
    next();
  },
  ZodValid({
    params: z.object({
      name: z.string().min(1).max(32).refine(val => !val.startsWith(':'), {
        message: "Counter name cannot start with a colon (:)"
      }),
    }),
    query: z.object({
      theme: z.string().default("moebooru"),
      padding: z.coerce.number().int().min(0).max(16).default(7),
      offset: z.coerce.number().min(-500).max(500).default(0),
      align: z.enum(["top", "center", "bottom"]).default("top"),
      scale: z.coerce.number().min(0.1).max(2).default(1),
      pixelated: z.enum(["0", "1"]).default("1"),
      darkmode: z.enum(["0", "1", "auto"]).default("auto"),

      // Unusual Options
      count: z.coerce.number().int().min(0).max(1e15).default(DEFAULT_COUNT),
      'count-view': z.enum(["true", "false", "0", "1"]).default("false"),
      prefix: z.coerce.number().int().min(-1).max(999999).default(-1),
      crop: z.enum(["true", "false", "0", "1"]).default("false"),
      size: z.coerce.number().min(0).max(2000).default(0)
    })
  }),
  async (req, res) => {
    let { name } = req.params;

    // Mutually exclusive parameters check based on original URL presence
    const isExplicitCount = req._rawQueryKeys.includes('count');
    const isExplicitCountView = req._rawQueryKeys.includes('count-view');

    if (isExplicitCount && isExplicitCountView) {
      return res.status(400).send({
        code: 400,
        message: "The parameters `count` and `count-view` are mutually exclusive."
      });
    }

    let { theme = "moebooru", count = DEFAULT_COUNT, "count-view": cv, ...rest } = req.query;

    const isCountView = isExplicitCountView && (cv === 'true' || cv === '1');
 
    if (isCountView) {
      if (!name.includes(':') || !name.split(':')[1].match(/^\d{4}$/)) {
        return res.status(400).send({
          code: 400,
          message: "Real-time mode requires a name with a 4-digit ID suffix (e.g., name:1234)."
        });
      }
      count = 0; 
    } else if (!isExplicitCount) {
      // Default to demo string if no count or count-view provided
      count = "0123456789";
    }

    res.set({
      "content-type": "image/svg+xml",
      "cache-control": "max-age=0, no-cache, no-store, must-revalidate",
    });

    const data = await getCountData(String(name), Number(count), isCountView);

    if (name === "demo") {
      res.set("cache-control", "max-age=31536000");
    }

    // Resolve random theme modes
    let perDigitPool = null;
    const allThemes = Object.keys(themeList);

    switch (theme) {
      case 'random-all':
        theme = randomArray(allThemes);
        break;
      case 'random-anime':
        theme = randomArray(ANIME_THEMES);
        break;
      case 'random-animation':
      case 'random-animations':
        theme = randomArray(ANIMATION_THEMES);
        break;
      case 'random-all-digit':
        theme = allThemes[0];
        perDigitPool = allThemes;
        break;
      case 'random-anime-digit':
        theme = ANIME_THEMES[0] || 'moebooru';
        perDigitPool = ANIME_THEMES;
        break;
      case 'random-animation-digit':
      case 'random-animations-digit':
        theme = ANIMATION_THEMES[0] || 'moebooru';
        perDigitPool = ANIMATION_THEMES;
        break;
    }

    const renderSvg = getCountImage({
      count: data.num,
      theme,
      perDigitPool,
      ...rest
    });

    res.send(renderSvg);

    logger.debug(
      data,
      { theme, ...req.query },
      `ip: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`,
      `ref: ${req.get("Referrer") || null}`,
      `ua: ${req.get("User-Agent") || null}`
    );
  }
);

app.get("/record/@:name", async (req, res) => {
  const { name } = req.params;
  if (!name || name.length === 0 || name.startsWith(':')) {
    return res.status(400).send({ code: 400, message: "A valid name parameter is required." });
  }
  const isExplicitCount = req.query.count !== undefined;
  const isExplicitCountView = req.query['count-view'] !== undefined;
  const cv = req.query['count-view'];

  if (isExplicitCount && isExplicitCountView) {
    return res.status(400).send({
      code: 400,
      message: "The parameters `count` and `count-view` are mutually exclusive."
    });
  }

  const { count = DEFAULT_COUNT } = req.query;
  const isCountView = isExplicitCountView && (cv === 'true' || cv === '1');

  if (isCountView && (!name.includes(':') || !name.split(':')[1].match(/^\d{4}$/))) {
    return res.status(400).send({
      code: 400,
      message: "Real-time mode requires a name with a 4-digit ID suffix."
    });
  }

  let finalCount = count;

  if (!isExplicitCount && !isCountView) {
    finalCount = "0123456789";
  }

  const data = await getCountData(name, finalCount, isCountView);
  res.json(data);
});

app.get("/heart-beat", (req, res) => {
  res.set("cache-control", "max-age=0, no-cache, no-store, must-revalidate");
  res.send("alive");
  logger.debug("heart-beat");
});

const listener = app.listen(process.env.APP_PORT || 3000, () => {
  logger.info("Your app is listening on port " + listener.address().port);
});

async function getCountData(name, countParam, countView = false) {
  if (name === "demo") return { name, num: "0123456789" };

  if (countView) {
    if (!redis) {
      logger.warn('Upstash Redis not configured, returning placeholder count.');
      return { name, num: "0000" };
    }

    try {
      // Use the whole name parameter as the identification (includes random ID if provided)
      const key = `moe-counter:${name}`;
      const count = await redis.incr(key);
      return { name, num: String(count) };
    } catch (err) {
      logger.error('Upstash Redis error:', err);
      return { name, num: "err" };
    }
  }

  return { name, num: countParam };
}
