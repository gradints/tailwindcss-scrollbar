import { withOptions } from 'tailwindcss/plugin'
import { CSSRuleObject, DarkModeConfig } from 'tailwindcss/types/config'
import { omit } from 'lodash-es'

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

export default withOptions<PluginOptions>(function (options) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ({ addBase, theme, config, prefix }: any) {
    const getSize = () => {
      return options?.size ?? theme('scrollbar.DEFAULT.size', '5px')
    }
    const getStyleTrack = () => {
      const background = '#f1f1f1' // default
      const fromConfig = theme('scrollbar.DEFAULT.track', {}) // with tailwind.config.js
      const fromOptions = options?.track ?? {} // with plugin options

      const finalConfig = { background, ...fromConfig, ...fromOptions }

      if (! finalConfig.darkBackground) {
        finalConfig.darkBackground = finalConfig.background
      }

      return finalConfig
    }
    const getStyleThumb = () => {
      const background = '#c1c1c1'
      const fromConfig = theme('scrollbar.DEFAULT.thumb', {}) // with tailwind.config.js
      const fromOptions = options?.thumb ?? {} // with plugin options

      const finalConfig = { background, ...fromConfig, ...fromOptions }

      return finalConfig
    }
    const getStyleThumbHover = () => {
      const background = '#a8a8a8'
      const fromConfig = theme('scrollbar.DEFAULT.hover', {}) // with tailwind.config.js
      const fromOptions = options?.hover ?? {} // with plugin options

      const finalConfig = { background, ...fromConfig, ...fromOptions }

      return finalConfig
    }

    const size = getSize()
    const track = getStyleTrack()
    const thumb = getStyleThumb()
    const hover = getStyleThumbHover()

    addBase([
      {
        '::-webkit-scrollbar': {
          width: size,
          height: size,
        },
        '::-webkit-scrollbar-track': omit(track, ['darkBackground']),
        '::-webkit-scrollbar-thumb': omit(thumb, ['darkBackground']),
        '::-webkit-scrollbar-thumb:hover': omit(hover, ['darkBackground']),
      },
    ])

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
      addBase([{
        '@media (prefers-color-scheme: dark)': dark,
        '@media (prefers-color-scheme: light)': light,
      }])
    } else {
      addBase([{ [prefix('.dark')]: dark }])
    }

    const getStyleScrollbarNone = (): CSSRuleObject[] => {
      return [
        {
          '.scrollbar-none': {
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none', /* Firefox */
          },
        },
        {
          '.scrollbar-none::-webkit-scrollbar': {
            'display': 'none', /* Chrome, Safari, Opera */
          },
        },
      ]
    }

    addBase(getStyleScrollbarNone())
  }
})
