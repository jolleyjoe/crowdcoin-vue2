import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x62F05CbF69CA16EF5c3217A5A3f091Fb72f6E463'
);

export default instance;