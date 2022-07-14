const plugin = require('tailwindcss/plugin')

const getSize = (options, theme) => {
  if (options && options.size) { // with plugin options
    return options.size
  }
  return theme('scrollbar.DEFAULT.size', '5px') // with config
}
const getStyleTrack = (options, theme) => {
  const defaultBackground = '#f1f1f1'
  const defaultConfig = {
    background: defaultBackground,
    darkBackground: defaultBackground,
  }
  const fromConfig = theme('scrollbar.DEFAULT.track', {}) // with tailwind.config.js
  const fromOptions = (options && options.track) ? options.track : {} // with plugin options

  return { ...defaultConfig, ...fromConfig, ...fromOptions }
}
const getStyleThumb = (options, theme) => {
  const defaultBackground = '#c1c1c1'
  const defaultConfig = {
    background: defaultBackground,
    darkBackground: defaultBackground,
  }
  const fromConfig = theme('scrollbar.DEFAULT.thumb', {}) // with tailwind.config.js
  const fromOptions = (options && options.thumb) ? options.thumb : {} // with plugin options

  return { ...defaultConfig, ...fromConfig, ...fromOptions }
}
const getStyleThumbHover = (options, theme) => {
  const defaultBackground = '#a8a8a8'
  const defaultConfig = {
    background: defaultBackground,
    darkBackground: defaultBackground,
  }
  const fromConfig = theme('scrollbar.DEFAULT.hover', {}) // with tailwind.config.js
  const fromOptions = (options && options.hover) ? options.hover : {} // with plugin options

  return { ...defaultConfig, ...fromConfig, ...fromOptions }
}

module.exports = plugin.withOptions(function (options) {
  return function ({ addBase, theme, config, prefix }) {
    const size = getSize(options, theme)
    const track = getStyleTrack(options, theme)
    const thumb = getStyleThumb(options, theme)
    const hover = getStyleThumbHover(options, theme)

    addBase([
      {
        '::-webkit-scrollbar': {
          width: size,
          height: size,
        },
        '::-webkit-scrollbar-track': track,
        '::-webkit-scrollbar-thumb': thumb,
        '::-webkit-scrollbar-thumb:hover': hover,
      },
    ])

    const dark = {
      '::-webkit-scrollbar-track': {
        background: track.darkBackground,
      },
      '::-webkit-scrollbar-thumb': {
        background: thumb.darkBackground,
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: hover.darkBackground,
      },
    }
    const light = {
      '::-webkit-scrollbar-track': {
        background: track.background,
      },
      '::-webkit-scrollbar-thumb': {
        background: thumb.background,
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: hover.background,
      },
    }

    if (config('darkMode') === 'media') {
      addBase([{
        '@media (prefers-color-scheme: dark)': dark,
        '@media (prefers-color-scheme: light)': light,
      }])
    } else {
      addBase([{ [prefix('.dark')]: dark }])
    }
  }
})
