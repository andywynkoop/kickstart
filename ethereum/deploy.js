const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'wait shoot pipe welcome eternal envelope wrong ghost employ scorpion edge elbow',
  'https://rinkeby.infura.io/VJPAOzuzywk4EZErDCNZ'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: 1000000, from: accounts[0] });

  console.log('Contract deployed to ', result.options.address);
};

deploy(); //only set it up this way to allow for async-await syntax
