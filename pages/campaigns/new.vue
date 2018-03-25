<template>
  <div>
    <Header />
    <h3>Create a Campaign</h3>
    <sui-form v-on:submit.stop.prevent="createCampaign" :error="!!errorMessage">
      <sui-form-field>
        <label>Minimum Contribution</label>
        <sui-input placeholder="wei" v-model="minimumContribution"></sui-input>
      </sui-form-field>
      <sui-message v-if="!!errorMessage" header="Oops!" :content="errorMessage"></sui-message>
      <sui-button primary :loading="loading">Create</sui-button>
    </sui-form>
  </div>
</template>

<script>

  import Header from '~/components/Header'
  import factory from '~/ethereum/factory'
  import web3 from '~/ethereum/web3'

  export default {

    components: {
      Header
    },

    data() {
      return {
        web3: web3,
        factory: factory,
        minimumContribution: '',
        loading: false,
        errorMessage: ''
      }
    },

    methods: {

      createCampaign: async function() {
        this.loading = true
        this.errorMessage = ''
        try {
          const accounts = await web3.eth.getAccounts()
          await factory.methods.createCampaign(this.minimumContribution).send({
            from: accounts[0]
          });
          this.$router.push('/')
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