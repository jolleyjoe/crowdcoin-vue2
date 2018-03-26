const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
// const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json');

const infuraAPI = 'https://rinkeby.infura.io/[your infura API key]';
const mnemonic = 'lobster wage seek field salon walk alert curtain advance crack athlete case';

const provider = new HDWalletProvider(mnemonic, infuraAPI);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
  result.setProvider(provider);

  console.log('Contract deployed to ', result.options.address);
};
deploy();
