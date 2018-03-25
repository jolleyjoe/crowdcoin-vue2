<template>
  <sui-menu style="margin-top:10px;">
    <sui-menu-item>
      <nuxt-link to="/">CrowdCoin</nuxt-link>
    </sui-menu-item>
    <sui-menu-menu position="right">
      <sui-menu-item>
        Campaigns
      </sui-menu-item>
      <sui-menu-item> 
        <nuxt-link :to="'/campaigns/new'">
          <i class="plus icon"></i>
        </nuxt-link>
      </sui-menu-item>
    </sui-menu-menu>
  </sui-menu>
</template>