# tailwindcss-scrollbar

Tailwindcss plugin to customize browser scrollbar.

![npm (scoped)](https://img.shields.io/npm/v/@gradin/tailwindcss-scrollbar)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@gradin/tailwindcss-scrollbar)
![npm](https://img.shields.io/npm/dw/@gradin/tailwindcss-scrollbar)

## Installation

```sh
# Using npm
npm install -D @gradin/tailwindcss-scrollbar

# Using Yarn
yarn add -D @gradin/tailwindcss-scrollbar
```

Then add the plugin to `tailwind.config.js` file

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar')({
      size: '5px',
      colors: {
        track: 'lightgray', // default '#f1f1f1'
        thumb: 'gray', // default '#c1c1c1'
        thumbHover: 'darkgray', // default '#a8a8a8'
      }
    }),
    // ...
  ],
}
```

## Browser Support

Custom scrollbars are not supported in Firefox or in Edge, prior version 79.