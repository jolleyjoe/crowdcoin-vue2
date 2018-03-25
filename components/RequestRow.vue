<template>
  <sui-table-row>
    <sui-table-cell>{{id}}</sui-table-cell>
    <sui-table-cell>{{request.description}}</sui-table-cell>
    <sui-table-cell>{{request.amount}}</sui-table-cell>
    <sui-table-cell>{{request.recipient}}</sui-table-cell>
    <sui-table-cell>{{request.approvalCount}}/{{approversCount}}</sui-table-cell>
    <sui-table-cell>
        <sui-button v-if="!request.complete" basic color="green" v-on:click="onApprove()" :loading="approveLoading">Approve</sui-button>
    </sui-table-cell>
    <sui-table-cell>
      <sui-button v-if="!request.complete" basic color="teal" v-on:click="onFinalize()" :loading="finalizeLoading">Finalize</sui-button>
    </sui-table-cell>
  </sui-table-row>
</template>


<script>

  import web3 from '~/ethereum/web3'
  import Campaign from '~/ethereum/campaign' 

  export default {

    props: [
      'request',
      'index',
      'id',
      'approversCount',
      'address'
    ],

    data() {
      return {
        web3: web3,
        Campaign: Campaign,
        approveLoading: false,
        finalizeLoading: false
      }
    },

    methods: {

      onApprove: async function() {
        this.approveLoading = true;
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.address)
        try {
          await campaign.methods.approveRequest(this.id).send({
            from: accounts[0]
          });
          this.approveLoading = false
          this.$router.replace('/campaigns/' + this.address + '/requests')
        } catch (err) {
          console.log(err.message)
          this.approveLoading = false
        } finally {
          this.approveLoading = false
        }
      },

      onFinalize: async function() {
        this.finalizeLoading = true;
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.address)
        try {
          await campaign.methods.finalizeRequest(this.id).send({
            from: accounts[0]
          });
          this.finalizeLoading = false
          this.$router.replace('/campaigns/' + this.address + '/requests')
        } catch (err) {
          this.finalizeLoading = false
        } finally {
          this.finalizeLoading = false
        }
      }


    }

  }


</script>