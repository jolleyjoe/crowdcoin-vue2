# Crowdcoin

[Nuxtjs/Vuejs 2](https://nuxtjs.org/) version of [Steven Grider's kickstart application](https://github.com/StephenGrider/EthereumCasts/tree/master/kickstart)

## Build Setup
``` bash
# install dependencies
$ npm install # Or yarn install
# serve with hot reload at localhost:3000
$ npm run dev
# build for production and launch server
$ npm run build
$ npm start
# generate static project
$ npm run generate
```

## Notes
You will need to include your own addresses/infura API keys in the correct places in the `ethereum` folder

---

## Frontend Libs

### Semantic-ui-vue
The vue equivalent of semantic-ui-react is [semantic-ui-vue](https://semantic-ui-vue.github.io/). 
To include a plugin in Nuxt, you must create a dedicated file in the plugins directory: See the `plugins/semantic-ui-vue` file.

### Semantic-ui-css
The `nuxt.config.js` file is where you can import links i.e. `semantic-ui-css` from the CDN.

---

## The Layout
In the `layouts/default.vue` file, you can set your semantic-ui container and set your `nuxt` application root in there : 
```html
<template>
  <div is="sui-container" textAlign="left">
    <nuxt />
  </div>
</template>
```

---

## Pages
The `pages` folder contents are mapped to your app's routes: 
e.g. `pages/index.vue` will be the `/` route, `pages/campaigns/new` will be the `/campaigns/new` route.


Undescored folder names signify a dynamic route param e.g. `pages/campaigns/_address/index.vue` will be accessed via `/campaigns/0x6b4.................`. 


An underscored folder can also have children e.g. `pages/campaigns/_address/requests/index.vue` will be all the requests for a particular campaign address at `/pages/campaigns/0x6b4................./requests`.

---

## Components
This is just standard VueJS stuff. Create components and use them in your main 'pages'.


