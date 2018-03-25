<template>
  <sui-form v-on:submit.stop.prevent="contribute">
    <sui-form-field>
      <label>Amount to Contribute</label>
      <sui-input v-model="value" placeholder="Ether"> </sui-input> 
    </sui-form-field>
    <sui-message v-if="!!errorMessage" header="Oops!" :content="errorMessage"></sui-message>
    <sui-button primary :loading="loading">Contribute!</sui-button>
  </sui-form>
</template>

<script>

  import Campaign from '~/ethereum/campaign'
  import web3 from '~/ethereum/web3'
  import router from 'vue-router'

  export default {
    props: ['address'],

    data() {
      return {
        value: '',
        loading: false,
        errorMessage: ''
      }
    },
    
    methods: {

      contribute: async function() {
        const campaign = Campaign(this.address)
        const accounts = await web3.eth.getAccounts()
        this.errorMessage = ''
        this.loading = true
        try {
          await campaign.methods.contribute().send({
            value: web3.utils.toWei(this.value, 'ether'),
            from: accounts[0]
          })
          router.replace('/campaigns/' + this.address)
          this.loading = false
        } catch (err) {
          this.errorMessage = err.message
          this.loading = false
        } finally {
          this.loading = false
        }
      }

    }

  }

</script>