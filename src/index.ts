import { withOptions } from 'tailwindcss/plugin'
import { CSSRuleObject, DarkModeConfig, PluginAPI } from 'tailwindcss/types/config'

interface StyleOptions {
  background?: string,
  darkBackground?: string,
}
interface PluginOptions {
  size?: string,
  track?: StyleOptions,
  thumb?: StyleOptions,
  hover?: StyleOptions,
}

// Temporary workaround until PluginAPI type also contains type for function prefix
interface CustomPluginApi extends PluginAPI {
  prefix: (selector: string) => string,
}

const themeKey = 'scrollbar' // theme.scrollbar
const darkClass = 'dark'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omit = (key: string, { [key]: _, ...obj }) => obj

/**
 * Handle plugin.withOptions and theme.scrollbar.DEFAULT
 */
const getDefaultStyle = (options: PluginOptions, pluginAPI: CustomPluginApi) => {
  const { theme, config, prefix } = pluginAPI

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

  const styles: CSSRuleObject[] = [
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

  if (config('darkMode') as Partial<DarkModeConfig> === 'media') {
    styles.push({
      '@media (prefers-color-scheme: dark)': dark,
      '@media (prefers-color-scheme: light)': light,
    })
  } else {
    styles.push({
      [prefix(`.${darkClass}`)]: dark,
    })
  }

  return styles
}

const getCustomStyles = (pluginAPI: CustomPluginApi) => {
  const { theme, config, prefix } = pluginAPI

  const styles = Object.entries(theme(themeKey, {}))
    .filter(([key]) => key !== 'DEFAULT')
    .map(([key, val]) => {
      const className = `.${themeKey}-${key}`

      const { size, track, thumb, hover } = val as PluginOptions

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
      } as CSSRuleObject
    })

  const dark = Object.entries(theme(themeKey, {}))
    .filter(([key]) => key !== 'DEFAULT')
    .map(([key, val]) => {
      const className = prefix(`.${themeKey}-${key}`)
      const value = val as PluginOptions
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
      const value = val as PluginOptions
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

  if (config('darkMode') as Partial<DarkModeConfig> === 'media') {
    styles.push({
      '@media (prefers-color-scheme: dark)': dark,
      '@media (prefers-color-scheme: light)': light,
    } as unknown as CSSRuleObject)
  } else {
    dark.forEach(s => {
      styles.push({
        [prefix(`.${darkClass}`)]: s,
      } as unknown as CSSRuleObject)
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

export default withOptions<PluginOptions>(function (options) {
  return function (pluginAPI) {
    const { addBase, addUtilities } = pluginAPI

    addBase(getDefaultStyle(options, pluginAPI as CustomPluginApi))

    addUtilities(getCustomStyles(pluginAPI as CustomPluginApi))

    addUtilities(scrollbarNoneStyle)
  }
})
