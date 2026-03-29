'use strict'

const fs = require('fs')
const path = require('path')
const mimeType = require('mime-types')
const sizeOf = require('image-size')
const { toFixed } = require('./index')

const themePath = path.resolve(__dirname, '../assets/theme')
const imgExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

const themeList = {}

fs.readdirSync(themePath).forEach(theme => {
  const currentThemePath = path.resolve(themePath, theme)
  if (!fs.statSync(currentThemePath).isDirectory()) return

  if (!(theme in themeList)) themeList[theme] = {}
  const imgList = fs.readdirSync(currentThemePath)
  imgList.forEach(img => {
    if (!imgExts.includes(path.extname(img).toLowerCase())) return

    const imgPath = path.resolve(currentThemePath, img)
    const char = path.parse(img).name
    const { width, height } = sizeOf(imgPath)

    themeList[theme][char] = {
      width,
      height,
      data: convertToDatauri(imgPath)
    }
  })
})

function convertToDatauri(filePath) {
  const mime = mimeType.lookup(filePath)
  const base64 = fs.readFileSync(filePath).toString('base64')
  return `data:${mime};base64,${base64}`
}

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Assign themes to digits ensuring no consecutive repeats and maximum variety
function assignPerDigitThemes(count, pool) {
  if (!pool || pool.length === 0) return []
  if (pool.length === 1) return new Array(count).fill(pool[0])

  const result = []
  let shuffled = shuffle(pool)
  let idx = 0

  for (let i = 0; i < count; i++) {
    // If we've used all themes, reshuffle ensuring first of new batch != last of old batch
    if (idx >= shuffled.length) {
      let attempts = 0
      do {
        shuffled = shuffle(pool)
        attempts++
      } while (shuffled[0] === result[result.length - 1] && attempts < 20)
      idx = 0
    }

    // Extra check: skip if same as previous (swap with next available)
    if (result.length > 0 && shuffled[idx] === result[result.length - 1]) {
      // Find next different one
      let found = false
      for (let j = idx + 1; j < shuffled.length; j++) {
        if (shuffled[j] !== result[result.length - 1]) {
          [shuffled[idx], shuffled[j]] = [shuffled[j], shuffled[idx]]
          found = true
          break
        }
      }
      // If no different one found in remaining, reshuffle
      if (!found) {
        let attempts = 0
        do {
          shuffled = shuffle(pool)
          attempts++
        } while (shuffled[0] === result[result.length - 1] && attempts < 20)
        idx = 0
      }
    }

    result.push(shuffled[idx])
    idx++
  }

  return result
}

function getCountImage(params) {
  let { count, theme = 'moebooru', padding = 7, prefix = -1, offset = 0, align = 'top', scale = 1, pixelated = '1', darkmode = 'auto', crop = 'false', size = 0, perDigitPool = null } = params

  if (!(theme in themeList) && !perDigitPool) theme = 'moebooru'
  padding = parseInt(Number(padding), 10)
  offset = parseFloat(Number(offset), 10)
  scale = parseFloat(Number(scale), 10)
  size = parseFloat(Number(size), 10)

  const isCropped = crop === 'true' || crop === true || crop === '1'

  const countArray = isCropped
    ? count.toString().split('')
    : count.toString().padStart(padding, '0').split('')

  if (prefix >= 0) {
    countArray.unshift(...String(prefix).split(''))
  }

  // Add _start and _end only for single-theme mode
  if (!perDigitPool && themeList[theme] && themeList[theme]['_start']) {
    countArray.unshift('_start')
  }
  if (!perDigitPool && themeList[theme] && themeList[theme]['_end']) {
    countArray.push('_end')
  }

  // Build per-digit theme assignments with no-repeat guarantee
  let digitThemes
  if (perDigitPool && perDigitPool.length > 0) {
    digitThemes = assignPerDigitThemes(countArray.length, perDigitPool)
  } else {
    digitThemes = countArray.map(() => theme)
  }

  // Auto-scale to requested size
  if (size > 0) {
    let maxBaseHeight = 0
    countArray.forEach((cur, i) => {
      const t = digitThemes[i]
      if (themeList[t] && themeList[t][cur]) {
        maxBaseHeight = Math.max(maxBaseHeight, themeList[t][cur].height)
      }
    })
    if (maxBaseHeight > 0) scale = size / maxBaseHeight
  }

  let x = 0, y = 0

  countArray.forEach((cur, i) => {
    const t = digitThemes[i]
    if (themeList[t] && themeList[t][cur]) {
      y = Math.max(y, themeList[t][cur].height * scale)
    }
  })

  let parts = ''
  countArray.forEach((cur, i) => {
    const t = digitThemes[i]
    if (!themeList[t] || !themeList[t][cur]) return

    let { width, height, data } = themeList[t][cur]
    width *= scale
    height *= scale

    let yOffset = 0
    if (align === 'center') yOffset = (y - height) / 2
    else if (align === 'bottom') yOffset = y - height

    parts += `
    <image x="${toFixed(x, 5)}"${yOffset ? ` y="${toFixed(yOffset, 5)}"` : ''} width="${toFixed(width, 5)}" height="${toFixed(height, 5)}" href="${data}" />`

    x += width + offset
  })

  x -= offset

  const style = `
  svg {
    ${pixelated === '1' ? 'image-rendering: -moz-crisp-edges; image-rendering: pixelated;' : ''}
    ${darkmode === '1' ? 'filter: brightness(.6);' : ''}
  }
  ${darkmode === 'auto' ? `@media (prefers-color-scheme: dark) { svg { filter: brightness(.6); } }` : ''}
  `

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by Aadish Counter -->
<svg viewBox="0 0 ${toFixed(x, 5)} ${toFixed(y, 5)}" width="${toFixed(x, 5)}" height="${toFixed(y, 5)}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Aadish Counter!</title>
  <style>${style}</style>
  <g>${parts}
  </g>
</svg>
`
}

module.exports = {
  themeList,
  getCountImage
}
