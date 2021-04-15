const plugin = require('tailwindcss/plugin')

module.exports = plugin.withOptions(function (options) {
  return function ({ addBase, theme }) {
    const size = options && options.size ? options.size : theme('scrollbar.DEFAULT.size', '5px')

    const optionColors = options && options.colors ? options.colors : {}
    const defaultColors = theme('scrollbar.DEFAULT.colors', {
      track: '#f1f1f1',
      thumb: '#c1c1c1',
      hover: '#a8a8a8',
    })
    const { track, thumb, thumbHover } = { ...defaultColors, ...optionColors }

    addBase([
      {
        '::-webkit-scrollbar': {
          width: size,
          height: size,
        },
        '::-webkit-scrollbar-track': {
          background: track,
        },
        '::-webkit-scrollbar-thumb': {
          background: thumb,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: thumbHover,
        },
      },
    ])
  }
})

