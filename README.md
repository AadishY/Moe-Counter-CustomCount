# ✦ Aadish Counter! 🚀

> **Cute, stateless, and bold.** A high-performance anime-style counter service with a unique Neo-Brutalist design. No database, no overhead—just pure customization.

<p align="center">
  <img src="https://aadishcounter.vercel.app/@demo?theme=random-animation-digit&count=0123456789" alt="Aadish Counter Demo">
</p>

<p align="center">
  <a href="https://github.com/AadishY/Moe-Counter-CustomCount/stargazers"><img src="https://img.shields.io/github/stars/AadishY/Moe-Counter-CustomCount?style=for-the-badge&color=yellow&logo=github" alt="Stars"></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
  <a href="https://pnpm.io"><img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm"></a>
</p>

---

## ✨ Features

- ⚡ **Stateless or Live**: Hybrid architecture. Works stateless by default, or with **Upstash Redis** for real-time tracking.
- 🎨 **Neo-Brutalist Design**: A bold, high-contrast UI with deep shadows and vibrant accents.
- 🚀 **Real-time Tracking**: Increment hits live using a unique `name:id` format.
- 🎲 **Advanced Randomization**: 6 unique random modes (e.g., `random-anime-digit`) that mix digit themes on the fly.
- 🖼️ **SVG Powered**: Crisp, pixel-perfect rendering across all devices.
- 🌈 **55+ Themes**: From classic anime to modern pixel art.
- ⚙️ **Ultra Customizable**: Control scale, alignment, spacing, padding, and more via URL parameters.

---

## 📖 Quick Start

Simply replace `:id` with any unique name and embed the URL anywhere!

### 🔗 URL Format
```text
https://aadishcounter.vercel.app/@:id?count=123456789
```

### 🛠️ Embed Examples

| Type | Syntax |
| :--- | :--- |
| **Manual (Static)** | `https://aadishcounter.vercel.app/@yourname?count=100` |
| **Real-time (Live)** | `https://aadishcounter.vercel.app/@yourname:1234?count-view=true` |
| **Markdown** | `![Counter](https://aadishcounter.vercel.app/@yourname:1234?count-view=true)` |
| **HTML** | `<img src="https://aadishcounter.vercel.app/@yourname:1234?count-view=true" />` |

---

## ⚙️ Customization (Query Params)

Tailor your counter precisely using these parameters:

| Param | Description | Default | Example |
| :--- | :--- | :--- | :--- |
| `theme` | Visual style for digits | `moebooru` | `?theme=random-anime` |
| `count` | Force a specific number to show | `0123456789` | `?count=99999` |
| `count-view` | Enable Real-time hits (requires ID suffix) | `false` | `?count-view=true` |
| `padding` | Minimum number of digits (auto-zero) | `7` | `?padding=5` |
| `size` | Set image height in pixels | `auto` | `?size=64` |
| `crop` | Remove zero-padding (dynamic width) | `false` | `?crop=true` |
| `offset` | Gap between each digit (px) | `0` | `?offset=4` |
| `align` | Vertical alignment (`top`, `center`, `bottom`) | `top` | `?align=center` |
| `pixelated` | Sharp edges for pixel art (`0` or `1`) | `1` | `?pixelated=0` |
| `darkmode` | Filter for dark backgrounds (`0`, `1`, `auto`) | `auto` | `?darkmode=1` |

### 🎲 Special Random Modes
- `random-anime` / `random-all`: Picks one random theme for the whole counter.
- `random-anime-digit` / `random-all-digit`: Each digit gets a different random theme.
- `random-animation-digit`: Animates digits using specific themes like `rule34` or `moebooru`.

---

## 🎨 Themes Showcase

<details>
<summary><b>Click to Expand All 55+ Theme Previews</b></summary>
<br/>

| Name | Preview |
| :--- | :--- |
| **3d-num** | ![3d-num](https://aadishcounter.vercel.app/@demo?theme=3d-num&size=40) |
| **ai-1** | ![ai-1](https://aadishcounter.vercel.app/@demo?theme=ai-1&size=40) |
| **asoul** | ![asoul](https://aadishcounter.vercel.app/@demo?theme=asoul&size=40) |
| **booru-ffsr** | ![booru-ffsr](https://aadishcounter.vercel.app/@demo?theme=booru-ffsr&size=40) |
| **booru-helltaker** | ![booru-helltaker](https://aadishcounter.vercel.app/@demo?theme=booru-helltaker&size=40) |
| **booru-huggboo** | ![booru-huggboo](https://aadishcounter.vercel.app/@demo?theme=booru-huggboo&size=40) |
| **booru-jaypee** | ![booru-jaypee](https://aadishcounter.vercel.app/@demo?theme=booru-jaypee&size=40) |
| **booru-koe** | ![booru-koe](https://aadishcounter.vercel.app/@demo?theme=booru-koe&size=40) |
| **booru-lewd** | ![booru-lewd](https://aadishcounter.vercel.app/@demo?theme=booru-lewd&size=40) |
| **booru-lisu** | ![booru-lisu](https://aadishcounter.vercel.app/@demo?theme=booru-lisu&size=40) |
| **booru-mjg** | ![booru-mjg](https://aadishcounter.vercel.app/@demo?theme=booru-mjg&size=40) |
| **booru-mof** | ![booru-mof](https://aadishcounter.vercel.app/@demo?theme=booru-mof&size=40) |
| **booru-nandroid** | ![booru-nandroid](https://aadishcounter.vercel.app/@demo?theme=booru-nandroid&size=40) |
| **booru-qualityhentais** | ![booru-qualityhentais](https://aadishcounter.vercel.app/@demo?theme=booru-qualityhentais&size=40) |
| **booru-r6gdrawfriends** | ![booru-r6gdrawfriends](https://aadishcounter.vercel.app/@demo?theme=booru-r6gdrawfriends&size=40) |
| **booru-rfck** | ![booru-rfck](https://aadishcounter.vercel.app/@demo?theme=booru-rfck&size=40) |
| **booru-smtg** | ![booru-smtg](https://aadishcounter.vercel.app/@demo?theme=booru-smtg&size=40) |
| **booru-snyde** | ![booru-snyde](https://aadishcounter.vercel.app/@demo?theme=booru-snyde&size=40) |
| **booru-the-collection** | ![booru-the-collection](https://aadishcounter.vercel.app/@demo?theme=booru-the-collection&size=40) |
| **booru-touhoulat** | ![booru-touhoulat](https://aadishcounter.vercel.app/@demo?theme=booru-touhoulat&size=40) |
| **booru-townofgravityfalls** | ![booru-townofgravityfalls](https://aadishcounter.vercel.app/@demo?theme=booru-townofgravityfalls&size=40) |
| **booru-twifanartsfw** | ![booru-twifanartsfw](https://aadishcounter.vercel.app/@demo?theme=booru-twifanartsfw&size=40) |
| **booru-ve** | ![booru-ve](https://aadishcounter.vercel.app/@demo?theme=booru-ve&size=40) |
| **booru-vivi** | ![booru-vivi](https://aadishcounter.vercel.app/@demo?theme=booru-vivi&size=40) |
| **booru-vp** | ![booru-vp](https://aadishcounter.vercel.app/@demo?theme=booru-vp&size=40) |
| **booru-yuyuyui** | ![booru-yuyuyui](https://aadishcounter.vercel.app/@demo?theme=booru-yuyuyui&size=40) |
| **capoo-1** | ![capoo-1](https://aadishcounter.vercel.app/@demo?theme=capoo-1&size=40) |
| **capoo-2** | ![capoo-2](https://aadishcounter.vercel.app/@demo?theme=capoo-2&size=40) |
| **e621** | ![e621](https://aadishcounter.vercel.app/@demo?theme=e621&size=40) |
| **food** | ![food](https://aadishcounter.vercel.app/@demo?theme=food&size=40) |
| **gelbooru** | ![gelbooru](https://aadishcounter.vercel.app/@demo?theme=gelbooru&size=40) |
| **gelbooru-h** | ![gelbooru-h](https://aadishcounter.vercel.app/@demo?theme=gelbooru-h&size=40) |
| **green** | ![green](https://aadishcounter.vercel.app/@demo?theme=green&size=40) |
| **kasuterura-1** | ![kasuterura-1](https://aadishcounter.vercel.app/@demo?theme=kasuterura-1&size=40) |
| **kasuterura-2** | ![kasuterura-2](https://aadishcounter.vercel.app/@demo?theme=kasuterura-2&size=40) |
| **kasuterura-3** | ![kasuterura-3](https://aadishcounter.vercel.app/@demo?theme=kasuterura-3&size=40) |
| **kasuterura-4** | ![kasuterura-4](https://aadishcounter.vercel.app/@demo?theme=kasuterura-4&size=40) |
| **kyun** | ![kyun](https://aadishcounter.vercel.app/@demo?theme=kyun&size=40) |
| **love-and-deepspace** | ![love-and-deepspace](https://aadishcounter.vercel.app/@demo?theme=love-and-deepspace&size=40) |
| **miku** | ![miku](https://aadishcounter.vercel.app/@demo?theme=miku&size=40) |
| **minecraft** | ![minecraft](https://aadishcounter.vercel.app/@demo?theme=minecraft&size=40) |
| **moebooru** | ![moebooru](https://aadishcounter.vercel.app/@demo?theme=moebooru&size=40) |
| **moebooru-h** | ![moebooru-h](https://aadishcounter.vercel.app/@demo?theme=moebooru-h&size=40) |
| **morden-num** | ![morden-num](https://aadishcounter.vercel.app/@demo?theme=morden-num&size=40) |
| **nixietube-1** | ![nixietube-1](https://aadishcounter.vercel.app/@demo?theme=nixietube-1&size=40) |
| **nixietube-2** | ![nixietube-2](https://aadishcounter.vercel.app/@demo?theme=nixietube-2&size=40) |
| **normal-1** | ![normal-1](https://aadishcounter.vercel.app/@demo?theme=normal-1&size=40) |
| **normal-2** | ![normal-2](https://aadishcounter.vercel.app/@demo?theme=normal-2&size=40) |
| **original-new** | ![original-new](https://aadishcounter.vercel.app/@demo?theme=original-new&size=40) |
| **original-old** | ![original-old](https://aadishcounter.vercel.app/@demo?theme=original-old&size=40) |
| **rule34** | ![rule34](https://aadishcounter.vercel.app/@demo?theme=rule34&size=40) |
| **shimmie2** | ![shimmie2](https://aadishcounter.vercel.app/@demo?theme=shimmie2&size=40) |
| **sketch-1** | ![sketch-1](https://aadishcounter.vercel.app/@demo?theme=sketch-1&size=40) |
| **sketch-2** | ![sketch-2](https://aadishcounter.vercel.app/@demo?theme=sketch-2&size=40) |
| **yousa-ling** | ![yousa-ling](https://aadishcounter.vercel.app/@demo?theme=yousa-ling&size=40) |

---

### *Visit [aadishcounter.vercel.app](https://aadishcounter.vercel.app) to use the live generator!*

</details>

---

## 🚀 One-Click Deployment

### Vercel (Recommended)
1. Fork this repository.
2. Link it to [Vercel](https://vercel.com).
3. Set Environment Variables: 
   - `APP_SITE` = Your domain.
   - `UPSTASH_REDIS_REST_URL` = Your Upstash URL.
   - `UPSTASH_REDIS_REST_TOKEN` = Your Upstash Token.
4. **Deploy!**

### Docker
```shell
docker run -d -p 3000:3000 \
  -e APP_SITE=https://your-domain.com \
  ghcr.io/aadish/aadish-counter:latest
```

### Manual Self-Host
```shell
git clone https://github.com/AadishY/Moe-Counter-CustomCount.git
cd Moe-Counter-CustomCount
pnpm install
pnpm start
```

---

## 📄 Credits & License

- **Core Engine**: Originally based on [journey-ad/Moe-Counter](https://github.com/journey-ad/Moe-Counter).
- **Modification**: Refactored into a stateless architecture and redesigned by **[Aadish](https://github.com/AadishY)**.
- **License**: This project is licensed under the [MIT License](./LICENSE). Themes belong to their respective creators.

Created with ❤️ by **[Aadish](https://github.com/AadishY)**

<p align="center">
  <img src="https://aadishcounter.vercel.app/@aadishcountergithub:1462?theme=random-animation-digit&padding=7&crop=false&count-view=true" alt="VIEW">
</p>
