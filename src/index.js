const plugin = require('tailwindcss/plugin')

const getSize = (options, theme) => {
  if (options && options.size) { // with plugin options
    return options.size
  }
  return theme('scrollbar.DEFAULT.size', '5px') // with config
}
const getStyleTrack = (options, theme) => {
  const background = '#f1f1f1'
  const fromConfig = { // with config
    background,
    darkBackground: background,
    ...theme('scrollbar.DEFAULT.track', {}),
  }
  const fromOptions = options && options.track ? options.track : {} // with plugin options

  return { ...fromConfig, ...fromOptions }
}
const getStyleThumb = (options, theme) => {
  const background = '#c1c1c1'
  const fromConfig = { // with config
    background,
    darkBackground: background,
    ...theme('scrollbar.DEFAULT.thumb', {}),
  }
  const fromOptions = options && options.thumb ? options.thumb : {} // with plugin options

  return { ...fromConfig, ...fromOptions }
}
const getStyleThumbHover = (options, theme) => {
  const background = '#a8a8a8'
  const fromConfig = { // with config
    background,
    darkBackground: background,
    ...theme('scrollbar.DEFAULT.hover', {}),
  }
  const fromOptions = options && options.hover ? options.hover : {} // with plugin options

  return { ...fromConfig, ...fromOptions }
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
