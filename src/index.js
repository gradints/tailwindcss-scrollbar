const plugin = require('tailwindcss/plugin')

module.exports = plugin.withOptions(function (options) {
  const getSize = (theme) => {
    if (options && options.size) { // with plugin options
      return options.size
    }
    return theme('scrollbar.DEFAULT.size', '5px') // with config
  }
  const getStyleTrack = (theme) => {
    const fromConfig = { // with config
      background: theme('scrollbar.DEFAULT.track.background', '#f1f1f1'),
      darkBackground: theme('scrollbar.DEFAULT.track.darkBackground', '#f1f1f1'),
      ...theme('scrollbar.DEFAULT.track', {}),
    }
    const fromOptions = options && options.track ? options.track : {} // with plugin options

    return { ...fromConfig, ...fromOptions }
  }
  const getStyleThumb = (theme) => {
    const fromConfig = { // with config
      background: theme('scrollbar.DEFAULT.thumb.background', '#c1c1c1'),
      darkBackground: theme('scrollbar.DEFAULT.thumb.darkBackground', '#c1c1c1'),
      ...theme('scrollbar.DEFAULT.thumb', {}),
    }
    const fromOptions = options && options.thumb ? options.thumb : {} // with plugin options

    return { ...fromConfig, ...fromOptions }
  }
  const getStyleThumbHover = (theme) => {
    const fromConfig = { // with config
      background: theme('scrollbar.DEFAULT.hover.background', '#a8a8a8'),
      darkBackground: theme('scrollbar.DEFAULT.hover.darkBackground', '#a8a8a8'),
      ...theme('scrollbar.DEFAULT.hover', {}),
    }
    const fromOptions = options && options.hover ? options.hover : {} // with plugin options

    return { ...fromConfig, ...fromOptions }
  }

  return function ({ addBase, theme }) {
    const size = getSize(theme)
    const track = getStyleTrack(theme)
    const thumb = getStyleThumb(theme)
    const hover = getStyleThumbHover(theme)

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
      {
        '.dark': dark,
        '@media (prefers-color-scheme: dark)': dark,
        '@media (prefers-color-scheme: light)': light,
      },
    ])
  }
})
