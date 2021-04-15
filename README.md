# tailwindcss-scrollbar

Tailwindcss plugin to customize browser scrollbar.

[![npm (scoped)](https://img.shields.io/npm/v/@gradin/tailwindcss-scrollbar)](https://www.npmjs.com/package/@gradin/tailwindcss-scrollbar)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@gradin/tailwindcss-scrollbar)
![npm](https://img.shields.io/npm/dw/@gradin/tailwindcss-scrollbar)

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

You can customize the size and color of the scrollbar.

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar')({
      size: '5px', // width or height, default '5px'
      colors: {
        track: 'lightgray', // default '#f1f1f1'
        thumb: 'gray', // default '#c1c1c1'
        thumbHover: 'darkgray', // default '#a8a8a8'
      }
    }),
  ],
}
```

To use colors from your theme, you need to override `theme.scrollbar.DEFAULT`.

```js
module.exports = {
  theme: {
    // ...
    scrollbar: theme => ({
      DEFAULT: {
        size: theme('spacing.1'),
        colors: {
          track: theme('colors.gray.300'),
          thumb: theme('colors.gray.100'),
          thumbHover: theme('colors.gray.600'),
        }
      },
    })
  },
}
```

## Browser Support

Custom scrollbars are not supported in Firefox or in Edge, prior version 79.