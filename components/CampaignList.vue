<template>
  <sui-card-group :items-per-row="1">
    <sui-card v-for="item in campaigns" :key="item">
      <sui-card-content>
        <sui-card-header>{{item}}</sui-card-header>
        <sui-card-description>
          <nuxt-link :to="'/campaigns/' + item">
            View Campaign
          </nuxt-link>
        </sui-card-description>
      </sui-card-content>
    </sui-card>
  </sui-card-group>
</template>

<script>
  export default {
    props: [
      'campaigns'
    ]
  }
</script>
