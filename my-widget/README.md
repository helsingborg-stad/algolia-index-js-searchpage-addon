# my-widget

Custom widget for instant search

---

[![MIT](https://img.shields.io/npm/l/@Helsingborg stad/instantsearch-widget-my-widget)](./LICENSE) [![NPM version](http://img.shields.io/npm/v/@Helsingborg stad/instantsearch-widget-my-widget.svg)](https://npmjs.org/package/@Helsingborg stad/instantsearch-widget-my-widget)

## Install

```bash
npm install @Helsingborg stad/instantsearch-widget-my-widget
# or
yarn add @Helsingborg stad/instantsearch-widget-my-widget
```

## Widget

### Usage

```js
import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch/lite';
import { myWidget } from '@Helsingborg stad/instantsearch-widget-my-widget';

const searchClient = algoliasearch('appId', 'apiKey');

const search = instantsearch({
  indexName: 'indexName',
  searchClient,
});

search.addWidgets([
  myWidget({
    // widget parameters
  }),
]);

search.start();
```

### Options

| Option | Type | Required | Default | Description |
| :-- | :-- | :-- | :-- | --- |
| [`container`](#container) | `string` or `HTMLElement` | true | - | The element to insert the widget into. |
| [`option1`](#option1) | `...` | true | - | REPLACE WITH THE DESCRIPTION FOR THIS OPTION |

#### container

> `string | Element` | **required**

The element to insert the widget into.

This can be either a valid CSS Selector:

```js
myWidget({
  container: '#my-widget',
  // ...
});
```

or an `HTMLElement`:

```js
myWidget({
  container: document.querySelector('#my-widget'),
  // ...
});
```

#### option1

> `...` | **required**

REPLACE WITH THE DESCRIPTION FOR THIS OPTION

```js
myWidget({
  option1: 'value',
  // ...
});
```

## Connector

### Usage

```js
import { connectMyWidget } from '@Helsingborg stad/instantsearch-widget-my-widget';

// 1. Create a render function
const renderMyWidget = (renderOptions, isFirstRender) => {
  // Rendering logic
};

// 2. Create the custom widget
const customMyWidget = connectMyWidget(
  renderMyWidget
);

// 3. Instantiate
search.addWidgets([
  customMyWidget({
    // instance params
  }),
]);
```

### Options

#### option1

> `...`

REPLACE WITH THE DESCRIPTION FOR THIS RENDERING ITEM

```js
const renderMyWidget = (renderOptions, isFirstRender) => {
  // show how to use this render option
};

const customMyWidget = connectMyWidget(
  renderMyWidget,
);

search.addWidgets([
  customMyWidget({
    // ...
  }),
]);
```

#### widgetParams

> `object`

All original widget options forwarded to the render function.

```js
const renderMyWidget = (renderOptions, isFirstRender) => {
  const { widgetParams } = renderOptions;
  widgetParams.container.innerHTML = '...';
};

const customMyWidget = connectMyWidget(
  renderMyWidget,
);

search.addWidgets([
  customMyWidget({
    container: document.querySelector('#my-widget'),
    // ...
  }),
]);
```

## Contributing

To start contributing to code, you need to:

1. [Fork the project](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
2. [Clone the repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)
3. Install the dependencies: `yarn`
4. Run the development mode: `yarn start`

Please read [our contribution process](./CONTRIBUTING.md) to learn more.

---

_This project was generated with [create-instantsearch-app](https://github.com/algolia/create-instantsearch-app) by [Algolia](https://algolia.com)._
