"use strict";

require('dotenv').config();
const express = require("express");
const compression = require("compression");
const { z } = require("zod");

const { themeList, getCountImage } = require("./utils/themify");
const { cors, ZodValid } = require("./utils/middleware");
const { randomArray, logger } = require("./utils");

const app = express();

const DEFAULT_COUNT = 0;

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

app.use(express.static("assets"));
app.use(compression());
app.use(cors());
app.set("view engine", "pug");

app.get('/', (req, res) => {
  const site = process.env.APP_SITE || `${req.protocol}://${req.get('host')}`
  const ga_id = process.env.GA_ID || null
  res.render('index', {
    site,
    ga_id,
    themeList,
  })
});

// get the image
app.get(["/@:name", "/get/@:name"],
  ZodValid({
    params: z.object({
      name: z.string().max(32),
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
      prefix: z.coerce.number().int().min(-1).max(999999).default(-1),
      crop: z.enum(["true", "false", "0", "1"]).default("false"),
      size: z.coerce.number().min(0).max(2000).default(0)
    })
  }),
  async (req, res) => {
    const { name } = req.params;
    let { theme = "moebooru", count = DEFAULT_COUNT, ...rest } = req.query;

    res.set({
      "content-type": "image/svg+xml",
      "cache-control": "max-age=0, no-cache, no-store, must-revalidate",
    });

    const data = await getCountData(String(name), Number(count));

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

// JSON record
app.get("/record/@:name", async (req, res) => {
  const { name } = req.params;
  const { count = DEFAULT_COUNT } = req.query;
  const data = await getCountData(name, count);
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

async function getCountData(name, count) {
  if (name === "demo") return { name, num: "0123456789" };
  return { name, num: count };
}
