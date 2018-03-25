<template>
  <div>
    <Header />
    <h3>Create a Request</h3>
    <sui-form v-on:submit.stop.prevent="createRequest" :error="!!errorMessage">
      <sui-form-field>
        <label>Description</label>
        <sui-input v-model="description" />
      </sui-form-field>
      <sui-form-field>
        <label>Value in Ether</label>
        <sui-input v-model="value" />
      </sui-form-field>
      <sui-form-field>
        <label>Recipient</label>
        <sui-input v-model="recipient" />
      </sui-form-field>
      <sui-button :loading="loading" primary>Create</sui-button>
      <sui-message v-if="!!errorMessage" error header="Oops!" :content="errorMessage"></sui-message>
    </sui-form>
  </div>
</template>

<script>

  import Header from '~/components/Header'
  import Campaign from '~/ethereum/campaign'
  import web3 from '~/ethereum/web3'

  export default {

    components: {
      Header
    },

    async asyncData ({ params }) {
      const address = params.address
      return { address }
    },

    data() {
      return {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: '',
        web3: web3,
        Campaign: Campaign
      }
    },

    methods: {


      createRequest: async function() {
        this.loading = true
        this.errorMessage = ''

        const campaign = Campaign(this.address)
        const { description, value, recipient } = this
        const accounts = await web3.eth.getAccounts()

        try {
          await campaign.methods.createRequest(
            description,
            web3.utils.toWei(value, 'ether'),
            recipient
          ).send({
            from: accounts[0]
          });
          this.$router.push('/campaigns/' + this.address + '/requests')
        } catch (err) {
          this.loading = false
          this.errorMessage = err.message
        } finally {
          this.loading = false
        }
      }


    }

  }

</script>