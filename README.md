# tailwindcss-scrollbar

Tailwindcss plugin to customize browser scrollbar.

[![npm (scoped)](https://img.shields.io/npm/v/@gradin/tailwindcss-scrollbar)](https://www.npmjs.com/package/@gradin/tailwindcss-scrollbar)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@gradin/tailwindcss-scrollbar)
![npm](https://img.shields.io/npm/dt/@gradin/tailwindcss-scrollbar)

[Live Demo](https://play.tailwindcss.com/2Mc2a5IbSY)

## Installation

```sh
# Using npm
npm install -D @gradin/tailwindcss-scrollbar

# Using Yarn
yarn add -D @gradin/tailwindcss-scrollbar
```

Then add the plugin to `tailwind.config.js` file.

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar'),
  ],
}
```

## Configuration

You can customize the size and color of the scrollbar. Also supports any css attributes such as `borderRadius`.

⚠️ See [release notes](https://github.com/gradints/tailwindcss-scrollbar/releases/tag/2.0.2) if you are upgrading from v1 ⚠️

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar')({
      size: '5px', // width or height, default '5px'
      track: {
        background: 'lightgray', // default '#f1f1f1'
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-track
      },
      thumb: {
        background: 'gray', // default '#c1c1c1'
        borderRadius: '40px',
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-thumb
      },
      thumbHover: {
        background: 'darkgray', // default '#a8a8a8'
        borderRadius: '40px',
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-thumb:hover
      },
    }),
  ],
}
```

To use attributes from your config.theme, you need to override `theme.scrollbar.DEFAULT`.

```js
module.exports = {
  theme: {
    // ...
    scrollbar: theme => ({
      DEFAULT: {
        size: theme('spacing.1'),
        track: {
          background: theme('colors.gray.300'),
        },
        thumb: {
          background: theme('colors.gray.400'),
        },
        thumbHover: {
          background: theme('colors.gray.500'),
        },
      },
    })
  },
}
```

## Dark Mode

To set different background color on dark mode, you can use `darkBackground` attribute. If unset, they will have the same color as the `background`.

```js
track: {
  background: theme('colors.gray.300'),
  darkBackground: theme('colors.gray.800'),
},
thumb: {
  background: theme('colors.gray.400'),
  darkBackground: theme('colors.gray.600'),
},
hover: {
  background: theme('colors.gray.500'),
  darkBackground: theme('colors.gray.500'),
},
```

## Browser Support

This plugin uses `::-webkit-scrollbar` to modify scrollbar style.

Not supported in all versions of Firefox and Edge prior version <79.

[See Browser Compatibility](https://caniuse.com/?search=%3A%3A-webkit-scrollbar)