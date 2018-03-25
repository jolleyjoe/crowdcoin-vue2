<template>
  <div>
    <Header />
    <h3>Requests</h3>
    <nuxt-link :to="'/campaigns/' + this.address + '/requests/new'">
      <sui-button primary floated="right" style="margin-bottom: 10px">Add Request</sui-button>
    </nuxt-link>

    <sui-table>
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>ID</sui-table-header-cell>
          <sui-table-header-cell>Description</sui-table-header-cell>
          <sui-table-header-cell>Amount</sui-table-header-cell>
          <sui-table-header-cell>Recipient</sui-table-header-cell>
          <sui-table-header-cell>Approval Count</sui-table-header-cell>
          <sui-table-header-cell>Approve</sui-table-header-cell>
          <sui-table-header-cell>Finalize</sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <RequestRow 
          v-for="(request, index) in requests" 
          v-bind:request="request"
          v-bind:index="index"
          v-bind:key="index"
          v-bind:id="index"
          v-bind:approversCount="approversCount"
          v-bind:address="address"
        ></RequestRow>
      </sui-table-body>
    </sui-table>

  </div>
</template>

<script>
  import Header from '~/components/Header'
  import Campaign from '~/ethereum/campaign'
  import RequestRow from '~/components/RequestRow'

  export default {

    components: {
      Header,
      RequestRow
    },

    async asyncData ({ params }) {
      const address = params.address
      const campaign = Campaign(address)

      const requestsCount = await campaign.methods.getRequestsCount().call();
      const approversCount = await campaign.methods.approversCount().call();

      const requests = await Promise.all(
        Array(parseInt(requestsCount))
          .fill()
          .map( (element, index) => {
            return campaign.methods.requests(index).call(); 
          })
      );
      return { address, requests, requestsCount, approversCount }
    }



  }

</script>