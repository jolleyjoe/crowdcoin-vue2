<template>
  <div>
    <Header />
    <h3>Campaign</h3>
    <sui-grid>
      <sui-grid-row>
        <sui-grid-column :width="10">
          <sui-card-group :items-per-row="2">
            <sui-card v-for="item in items" :key="item.address" :style="item.style" class="raised">
              <sui-card-content>
                <sui-card-header>{{item.header}}</sui-card-header>
                <sui-card-description>{{item.description}}</sui-card-description>
              </sui-card-content>
            </sui-card>
          </sui-card-group>
        </sui-grid-column>
        <sui-grid-column :width="6">
          <Contribute :address="this.address" />
        </sui-grid-column>
      </sui-grid-row>
      <sui-grid-row>
        <sui-grid-column>
          <nuxt-link :to="'/campaigns/' + this.address + '/requests'">
            <sui-button primary>View Requests</sui-button>
          </nuxt-link>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
  import Header from '~/components/Header'
  import web3 from '~/ethereum/web3'
  import factory from '~/ethereum/factory'
  import Campaign from '~/ethereum/campaign'
  import Contribute from '~/components/Contribute'

  export default {

    components: {
      Header,
      Contribute
    },

    async asyncData ({ params }) {
      const campaign = Campaign(params.address)
      const summary  = await campaign.methods.getSummary().call();
      const summary_data = {
        address: params.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
      }
      return {
        address: summary_data.address,
        items: [
          {
            header: summary_data.manager,
            meta: 'Address of Manager',
            description: 'The manager created this campaign',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: summary_data.minimumContribution,
            meta: 'Mininum Contribution (wei)',
            description: 'You must contribute this amount of wei to become an approver',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: summary_data.requestsCount,
            meta: 'The Number of Requests',
            description: 'A request tries to withdraw money from the contract, must be approved by > 50% of approvers',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: summary_data.approversCount,
            meta: 'Number of Approvers',
            description: 'Number of people who have already donated to this campaign',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: web3.utils.fromWei(summary_data.balance, 'ether'),
            meta: 'Campaign Balance (Ether)',
            description: 'The current campaign pool',
            style: { overflowWrap: 'break-word' }
          }
        ]
      }
    },




  }

</script>