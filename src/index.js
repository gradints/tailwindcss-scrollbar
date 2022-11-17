// import { withOptions } from 'tailwindcss/plugin'
const plugin = require('tailwindcss/plugin')

const themeKey = 'scrollbar' // theme.scrollbar
const darkClass = 'dark'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omit = (key, { [key]: _, ...obj }) => obj

/**
 * Handle plugin.withOptions and theme.scrollbar.DEFAULT
 */
const getDefaultStyle = (options, pluginAPI) => {
  const { theme, config } = pluginAPI

  const getSize = () => {
    return options?.size ?? theme(`${themeKey}.DEFAULT.size`, '5px')
  }
  const getStyleTrack = () => {
    const background = '#f1f1f1' // default
    const fromConfig = theme(`${themeKey}.DEFAULT.track`, {}) // with tailwind.config.js
    const fromOptions = options?.track ?? {} // with plugin options

    const finalConfig = { background, ...fromConfig, ...fromOptions }

    if (! finalConfig.darkBackground) {
      finalConfig.darkBackground = finalConfig.background
    }

    return finalConfig
  }
  const getStyleThumb = () => {
    const background = '#c1c1c1'
    const fromConfig = theme(`${themeKey}.DEFAULT.thumb`, {}) // with tailwind.config.js
    const fromOptions = options?.thumb ?? {} // with plugin options

    const finalConfig = { background, ...fromConfig, ...fromOptions }

    return finalConfig
  }
  const getStyleThumbHover = () => {
    const background = '#a8a8a8'
    const fromConfig = theme(`${themeKey}.DEFAULT.hover`, {}) // with tailwind.config.js
    const fromOptions = options?.hover ?? {} // with plugin options

    const finalConfig = { background, ...fromConfig, ...fromOptions }

    return finalConfig
  }

  const size = getSize()
  const track = getStyleTrack()
  const thumb = getStyleThumb()
  const hover = getStyleThumbHover()

  const styles = [
    {
      '::-webkit-scrollbar': {
        width: size,
        height: size,
      },
      '::-webkit-scrollbar-track': omit('darkBackground', track),
      '::-webkit-scrollbar-thumb': omit('darkBackground', thumb),
      '::-webkit-scrollbar-thumb:hover': omit('darkBackground', hover),
    },
  ]

  const dark = {
    '::-webkit-scrollbar-track': {
      background: track.darkBackground ?? track.background,
    },
    '::-webkit-scrollbar-thumb': {
      background: thumb.darkBackground ?? thumb.background,
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: hover.darkBackground ?? hover.background,
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
    styles.push({
      '@media (prefers-color-scheme: dark)': dark,
      '@media (prefers-color-scheme: light)': light,
    })
  } else {
    styles.push({
      [`.${darkClass}`]: dark,
    })
  }

  return styles
}

/**
 * Handle theme.scrollbar.<any key>
 */
const getCustomStyles = (pluginAPI) => {
  const { theme, config } = pluginAPI

  const styles = Object.entries(theme(themeKey, {}))
    .filter(([key]) => key !== 'DEFAULT')
    .map(([key, val]) => {
      const className = `.${themeKey}-${key}`

      const { size, track, thumb, hover } = val

      if (!size) {
        throw new Error(`[@gradin/tailwindcss-scrollbar] theme.${themeKey}.${key} should have property [size].`)
      }
      if (!track) {
        throw new Error(`[@gradin/tailwindcss-scrollbar] theme.${themeKey}.${key} should have property [size].`)
      }
      if (!thumb) {
        throw new Error(`[@gradin/tailwindcss-scrollbar] theme.${themeKey}.${key} should have property [size].`)
      }
      if (!hover) {
        throw new Error(`[@gradin/tailwindcss-scrollbar] theme.${themeKey}.${key} should have property [size].`)
      }

      return {
        [`${className}::-webkit-scrollbar`]: {
          width: size,
          height: size,
        },
        [`${className}::-webkit-scrollbar-track`]: omit('darkBackground', track),
        [`${className}::-webkit-scrollbar-thumb`]: omit('darkBackground', thumb),
        [`${className}::-webkit-scrollbar-thumb:hover`]: omit('darkBackground', hover),
      }
    })

  const dark = Object.entries(theme(themeKey, {}))
    .filter(([key]) => key !== 'DEFAULT')
    .map(([key, val]) => {
      const className = `.${themeKey}-${key}`
      const value = val
      const track = value.track ?? {}
      const thumb = value.thumb ?? {}
      const hover = value.hover ?? {}

      return {
        [`${className}::-webkit-scrollbar-track`]: {
          background: track.darkBackground ?? track.background,
        },
        [`${className}::-webkit-scrollbar-thumb`]: {
          background: thumb.darkBackground ?? thumb.background,
        },
        [`${className}::-webkit-scrollbar-thumb:hover`]: {
          background: hover.darkBackground ?? hover.background,
        },
      }
    })
  const light = Object.entries(theme(themeKey, {}))
    .filter(([key]) => key !== 'DEFAULT')
    .map(([key, val]) => {
      const className = `.${themeKey}-${key}`
      const value = val
      const track = value.track ?? {}
      const thumb = value.thumb ?? {}
      const hover = value.hover ?? {}

      return {
        [`${className}::-webkit-scrollbar-track`]: {
          background: track.background,
        },
        [`${className}::-webkit-scrollbar-thumb`]: {
          background: thumb.background,
        },
        [`${className}::-webkit-scrollbar-thumb:hover`]: {
          background: hover.background,
        },
      }
    })

  if (config('darkMode') === 'media') {
    styles.push({
      '@media (prefers-color-scheme: dark)': dark,
      '@media (prefers-color-scheme: light)': light,
    })
  } else {
    dark.forEach(s => {
      styles.push({
        [`.${darkClass}`]: s,
      })
    })
  }

  return styles
}

const scrollbarNoneStyle = [
  {
    [`.${themeKey}-none`]: {
      '-ms-overflow-style': 'none', /* IE and Edge */
      'scrollbar-width': 'none', /* Firefox */
    },
  },
  {
    [`.${themeKey}-none::-webkit-scrollbar`]: {
      'display': 'none', /* Chrome, Safari, Opera */
    },
  },
]

module.exports = plugin.withOptions(function (options) {
  return function (pluginAPI) {
    const { addBase, addUtilities } = pluginAPI

    addBase(getDefaultStyle(options, pluginAPI))

    addUtilities(getCustomStyles(pluginAPI))

    addUtilities(scrollbarNoneStyle)
  }
})
