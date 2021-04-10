const plugin = require('tailwindcss/plugin')

module.exports = plugin.withOptions(function (options) {
  return function ({ addBase }) {
    // const size = options?.size ?? '5px'
    // const { track, thumb, thumbHover } = options?.colors ?? {}

    const size = options && options.size ? options.size : '5px'
    const { track, thumb, thumbHover } = options && options.colors ? options.colors : {}

    addBase([
      {
        '::-webkit-scrollbar': {
          width: size,
          height: size,
        },
        '::-webkit-scrollbar-track': {
          background: track ? track : '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
          background: thumb ? thumb : '#c1c1c1',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: thumbHover ? thumbHover : '#a8a8a8',
        },
      },
    ])
  }
})

