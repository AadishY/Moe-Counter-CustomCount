# Aadish Counter!

Cute anime-style image counters for your GitHub profile, website, or anywhere you embed images.

> A stateless, customizable Moe Counter — no database needed. Just deploy and use!

<p align="center">
  <img src="https://aadishcounter.vercel.app/@demo?theme=random-animation-digit&count=0123456789" alt="Aadish Counter Demo">
</p>

## 🚀 How to Use

Set a unique name for your counter and replace `:name` in the URL:

```
https://aadishcounter.vercel.app@:name
```

### Embed Examples

**HTML:**
```html
<img src="https://aadishcounter.vercel.app@your-name" alt="Counter" />
```

**Markdown:**
```markdown
![Counter](https://aadishcounter.vercel.app@your-name)
```

## ⚙️ Query Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `theme` | Visual theme for counter digits | `moebooru` | `?theme=booru-lewd` |
| `count` | Number to display | `0` | `?count=12345` |
| `padding` | Minimum number of digits | `7` | `?padding=5` |
| `crop` | Only show actual digits (no zero-padding) | `false` | `?crop=true` |
| `size` | Target image height in pixels (overrides scale) | auto | `?size=64` |
| `offset` | Pixel gap between digits | `0` | `?offset=2` |
| `scale` | Image scale multiplier | `1` | `?scale=1.5` |
| `align` | Vertical alignment (`top`, `center`, `bottom`) | `top` | `?align=center` |
| `pixelated` | Pixelated rendering (`0` or `1`) | `1` | `?pixelated=0` |
| `darkmode` | Dark mode filter (`0`, `1`, `auto`) | `auto` | `?darkmode=1` |
| `prefix` | Prefix digits before the count | disabled | `?prefix=42` |

**Full example:**
```
https://aadishcounter.vercel.app@mycounter?theme=rule34&count=999&crop=true&size=64
```

## 🎨 Themes

<details>
<summary><h2>More theme</h2></summary>

### *[Contribute themes is welcome!](https://github.com/journey-ad/Moe-Counter/issues/new?assignees=&labels=theme&projects=&template=contribute-theme.yml&title=%5BTheme%5D%3A+)*

##### 3d-num

![3d-num](https://aadishcounter.vercel.app/@demo?theme=3d-num)

##### ai-1

![ai-1](https://aadishcounter.vercel.app/@demo?theme=ai-1)

##### asoul

![asoul](https://aadishcounter.vercel.app/@demo?theme=asoul)

##### booru-ffsr

![booru-ffsr](https://aadishcounter.vercel.app/@demo?theme=booru-ffsr)

##### booru-helltaker

![booru-helltaker](https://aadishcounter.vercel.app/@demo?theme=booru-helltaker)

##### booru-huggboo

![booru-huggboo](https://aadishcounter.vercel.app/@demo?theme=booru-huggboo)

##### booru-jaypee

![booru-jaypee](https://aadishcounter.vercel.app/@demo?theme=booru-jaypee)

##### booru-koe

![booru-koe](https://aadishcounter.vercel.app/@demo?theme=booru-koe)

##### booru-lewd

![booru-lewd](https://aadishcounter.vercel.app/@demo?theme=booru-lewd)

##### booru-lisu

![booru-lisu](https://aadishcounter.vercel.app/@demo?theme=booru-lisu)

##### booru-mjg

![booru-mjg](https://aadishcounter.vercel.app/@demo?theme=booru-mjg)

##### booru-mof

![booru-mof](https://aadishcounter.vercel.app/@demo?theme=booru-mof)

##### booru-nandroid

![booru-nandroid](https://aadishcounter.vercel.app/@demo?theme=booru-nandroid)

##### booru-qualityhentais

![booru-qualityhentais](https://aadishcounter.vercel.app/@demo?theme=booru-qualityhentais)

##### booru-r6gdrawfriends

![booru-r6gdrawfriends](https://aadishcounter.vercel.app/@demo?theme=booru-r6gdrawfriends)

##### booru-rfck

![booru-rfck](https://aadishcounter.vercel.app/@demo?theme=booru-rfck)

##### booru-smtg

![booru-smtg](https://aadishcounter.vercel.app/@demo?theme=booru-smtg)

##### booru-snyde

![booru-snyde](https://aadishcounter.vercel.app/@demo?theme=booru-snyde)

##### booru-the-collection

![booru-the-collection](https://aadishcounter.vercel.app/@demo?theme=booru-the-collection)

##### booru-touhoulat

![booru-touhoulat](https://aadishcounter.vercel.app/@demo?theme=booru-touhoulat)

##### booru-townofgravityfalls

![booru-townofgravityfalls](https://aadishcounter.vercel.app/@demo?theme=booru-townofgravityfalls)

##### booru-twifanartsfw

![booru-twifanartsfw](https://aadishcounter.vercel.app/@demo?theme=booru-twifanartsfw)

##### booru-ve

![booru-ve](https://aadishcounter.vercel.app/@demo?theme=booru-ve)

##### booru-vivi

![booru-vivi](https://aadishcounter.vercel.app/@demo?theme=booru-vivi)

##### booru-vp

![booru-vp](https://aadishcounter.vercel.app/@demo?theme=booru-vp)

##### booru-yuyuyui

![booru-yuyuyui](https://aadishcounter.vercel.app/@demo?theme=booru-yuyuyui)

##### capoo-1

![capoo-1](https://aadishcounter.vercel.app/@demo?theme=capoo-1)

##### capoo-2

![capoo-2](https://aadishcounter.vercel.app/@demo?theme=capoo-2)

##### e621

![e621](https://aadishcounter.vercel.app/@demo?theme=e621)

##### food

![food](https://aadishcounter.vercel.app/@demo?theme=food)

##### gelbooru

![gelbooru](https://aadishcounter.vercel.app/@demo?theme=gelbooru)

##### green

![green](https://aadishcounter.vercel.app/@demo?theme=green)

##### kasuterura-1

![kasuterura-1](https://aadishcounter.vercel.app/@demo?theme=kasuterura-1)

##### kasuterura-2

![kasuterura-2](https://aadishcounter.vercel.app/@demo?theme=kasuterura-2)

##### kasuterura-3

![kasuterura-3](https://aadishcounter.vercel.app/@demo?theme=kasuterura-3)

##### kasuterura-4

![kasuterura-4](https://aadishcounter.vercel.app/@demo?theme=kasuterura-4)

##### kyun

![kyun](https://aadishcounter.vercel.app/@demo?theme=kyun)

##### love-and-deepspace

![love-and-deepspace](https://aadishcounter.vercel.app/@demo?theme=love-and-deepspace)

##### miku

![miku](https://aadishcounter.vercel.app/@demo?theme=miku)

##### minecraft

![minecraft](https://aadishcounter.vercel.app/@demo?theme=minecraft)

##### moebooru

![moebooru](https://aadishcounter.vercel.app/@demo?theme=moebooru)

##### morden-num

![morden-num](https://aadishcounter.vercel.app/@demo?theme=morden-num)

##### nixietube-1

![nixietube-1](https://aadishcounter.vercel.app/@demo?theme=nixietube-1)

##### nixietube-2

![nixietube-2](https://aadishcounter.vercel.app/@demo?theme=nixietube-2)

##### normal-1

![normal-1](https://aadishcounter.vercel.app/@demo?theme=normal-1)

##### normal-2

![normal-2](https://aadishcounter.vercel.app/@demo?theme=normal-2)

##### original-new

![original-new](https://aadishcounter.vercel.app/@demo?theme=original-new)

##### original-old

![original-old](https://aadishcounter.vercel.app/@demo?theme=original-old)

##### rule34

![rule34](https://aadishcounter.vercel.app/@demo?theme=rule34)

##### shimmie2

![shimmie2](https://aadishcounter.vercel.app/@demo?theme=shimmie2)

##### sketch-1

![sketch-1](https://aadishcounter.vercel.app/@demo?theme=sketch-1)

##### sketch-2

![sketch-2](https://aadishcounter.vercel.app/@demo?theme=sketch-2)

##### yousa-ling

![yousa-ling](https://aadishcounter.vercel.app/@demo?theme=yousa-ling)

</details>

## 📦 Deployment

### Vercel (Recommended)

1. Fork this repo
2. Import into [Vercel](https://vercel.com)
3. Set environment variable `APP_SITE` to your domain
4. Deploy!

### Cloudflare Workers

1. Fork this repo
2. Use Cloudflare Pages or Workers
3. Set environment variable `APP_SITE`
4. Deploy!

### Docker

```shell
docker run -d -p 3000:3000 \
  -e APP_SITE=https://your-domain.com \
  -e APP_PORT=3000 \
  ghcr.io/journey-ad/moe-counter:latest
```

### Manual

```shell
git clone https://github.com/AadishY/Moe-Counter-CustomCount.git
cd Moe-Counter-CustomCount
pnpm install
pnpm start
```

## 🔧 Configuration

Create a `.env` file based on `.env.example`:

```ini
# Your public site URL
APP_SITE=https://your-domain.com

# Server port
APP_PORT=3000

# Log level: debug | info | warn | error | none
LOG_LEVEL=info

# Google Analytics (optional)
# GA_ID=G-XXXX
```

## 📄 License

[MIT License](./LICENSE), excluding all themes.

---

**[⭐ Star this repo](https://github.com/AadishY/Moe-Counter-CustomCount)** if you find it useful!
