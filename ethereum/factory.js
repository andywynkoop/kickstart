import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3908a0EB3C298A83D5DBF9F73A028b77591C8456'
);

export default instance;
