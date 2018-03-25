<template>
  <div class="left">
    <Header />
    <div>
      <h3>Open Campaigns</h3>
      <nuxt-link :to="'/campaigns/new'">
        <sui-button 
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        /> 
      </nuxt-link>
      <CampaignList :campaigns="campaigns"></CampaignList>
    </div>
  </div>
</template>


<script>
  import AppLogo from '~/components/AppLogo.vue'
  import Header from '~/components/Header.vue'
  import Factory from '~/ethereum/factory'
  import CampaignList from '~/components/CampaignList'

  export default {

    async asyncData ({params}) {
      const campaigns = await Factory.methods.getDeployedCampaigns().call();
      return {
        campaigns: campaigns
      }
    },
  
    components: {
      AppLogo,
      Header,
      CampaignList
    }
  }
</script>


<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
