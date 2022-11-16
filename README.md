# tailwindcss-scrollbar

Tailwindcss plugin to customize browser scrollbar.

[![npm (scoped)](https://img.shields.io/npm/v/@gradin/tailwindcss-scrollbar)](https://www.npmjs.com/package/@gradin/tailwindcss-scrollbar)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@gradin/tailwindcss-scrollbar)
![npm](https://img.shields.io/npm/dt/@gradin/tailwindcss-scrollbar)

[Live Demo](https://play.tailwindcss.com/ohaIXRd9No)

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
      hover: {
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
        hover: {
          background: theme('colors.gray.500'),
        },
      },
    })
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar'),
  ],
}
```

## Multiple scrollbar styles

You can add more scrollbar styles using `theme.scrollbar.STYLE_NAME`

They need to have `size`, `track`, `thumb`, `hover` property specified, as they don't have default value.

```js
module.exports = {
  theme: {
    // ...
    scrollbar: {
      thin: {
        size: '2px',
        track: { background: 'lightgray' },
        thumb: { background: 'gray' },
        hover: { background: 'darkgray' },
      },
      blue: {
        size: '8px',
        track: { background: 'lightblue' },
        thumb: { background: 'blue' },
        hover: { background: 'darkblue' },
      },
    },
  },
}
```
```html
<div class="overflow-auto scrollbar-thin"></div>
<div class="overflow-auto scrollbar-blue"></div>
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

## Hides scrollbar.

To hide the scrollbar but still make it scrollable, use `scrollbar-none` class
on the element with `overflow: auto | scroll`.

```html
<div class="overflow-auto scrollbar-none">
  <!-- Very long content here -->
</div>
```

This is done by using `scrollbar-width: none` on Firefox and `::-webkit-scrollbar{display:none}` on Chrome.


## Browser Support

This plugin uses `::-webkit-scrollbar` to modify scrollbar style.

Not supported in **all versions of Firefox** and **Edge version 78 or older**.

[See Browser Compatibility](https://caniuse.com/?search=%3A%3A-webkit-scrollbar)

`.scrollbar-none` is supported on [Firefox version 64 or newer](https://caniuse.com/?search=scrollbar-width).
