/*   old version (v1.1) modify to v1.4 
const Fabric_Client = require('fabric-client');
var path = require('path');

var fabric_client = new Fabric_Client();

// setup the fabric network
var channel = fabric_client.newChannel('mychannel');
var peer = fabric_client.newPeer('grpc://localhost:17051');
channel.addPeer(peer);
var order = fabric_client.newOrderer('grpc://localhost:17050')
channel.addOrderer(order);

//get location of user1 ca info
var store_path = path.join(__dirname, '../wallet', 'user1'); 
//console.log('Store path:'+store_path);
*/

'use strict'
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

// capture network variables from config.json
const configPath = path.join(process.cwd(),'/config.json');
console.log('configPath:'+configPath);
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var connection_file = config.connection_file;
var userName = config.userName;
var gatewayDiscovery = config.gatewayDiscovery;

// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
console.log('ccpPath:'+ccpPath);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

//get blockchain info
exports.getBlockchain = async function() {
  try {
    var response={};
    var returnBlockchain = [];

    /*  v1.1
    var state_store = await Fabric_Client.newDefaultKeyValueStore({
      path: store_path
    });

    fabric_client.setStateStore(state_store);
    var crypto_suite = Fabric_Client.newCryptoSuite();
    // use the same location for the state store (where the users' certificate are kept)
    // and the crypto store (where the users' keys are kept)
    var crypto_store = Fabric_Client.newCryptoKeyStore({
      path: store_path
    });
    crypto_suite.setCryptoKeyStore(crypto_store);
    fabric_client.setCryptoSuite(crypto_suite);

    // get the enrolled user from persistence, this user will sign all requests
    user_from_store = await fabric_client.getUserContext('user1', true);

    if (user_from_store && user_from_store.isEnrolled()) {
      //console.log('Successfully loaded user1 from persistence');
      //未使用member_user
      member_user = user_from_store;
    } else {
      throw new Error('Failed to get user1.... run registerUser.js');
    }
    */
   const walletPath=path.join(process.cwd(),'/wallet');
   const wallet = new FileSystemWallet(walletPath);
   console.log(`Wallet path: ${walletPath}`);

   // Check to see if we've already enrolled the user.
   const userExists = await wallet.exists(userName);
   if (!userExists) {
       console.log('An identity for the user ' + userName + ' does not exist in the wallet');
       console.log('Run the registerUser.js application before retrying');
       response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
       return response;            
   }

   // Create a new gateway for connecting to our peer node.
   const gateway = new Gateway();
   await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

   // Get the network (channel) our contract is deployed to.
   const network = await gateway.getNetwork('mychannel');
   const channel=network.getChannel();

    var blockchainInfo = await channel.queryInfo();
    var height = blockchainInfo.height.low;

    for (var i = 0; i < height; i++) {

      var returnBlock = {};
      var block = await channel.queryBlock(i);

      returnBlock.number = block.header.number;
      returnBlock.data_hash = block.header.data_hash;

      var transactions = [];
      var ns_rwsets = [];
      if (block.data.data && block.data.data.length) {
        returnBlock.num_transactions = block.data.data.length;

        for (var j = 0; j < returnBlock.num_transactions; j++) {
          var transaction = {};

          transaction.id = block.data.data[j].payload.header.channel_header.tx_id;
          transaction.timestamp = block.data.data[j].payload.header.channel_header.timestamp;

          if (block.data.data[j].payload.data.actions && block.data.data[j].payload.data.actions.length) {
            var actions_length = block.data.data[j].payload.data.actions.length;
            for (var k = 0; k < actions_length; k++) {

              if (block.data.data[j].payload.data.actions[k].payload.action.proposal_response_payload.extension.results.ns_rwset && block.data.data[j].payload.data.actions[k].payload.action.proposal_response_payload.extension.results.ns_rwset.length) {
                var ns_rwset_length = block.data.data[j].payload.data.actions[k].payload.action.proposal_response_payload.extension.results.ns_rwset.length;

                for (var l = 0; l < ns_rwset_length; l++) {
                  var ns_rwset = block.data.data[j].payload.data.actions[k].payload.action.proposal_response_payload.extension.results.ns_rwset[l].rwset;
                  ns_rwsets.push(ns_rwset);
                }
              }
            }
          }

          transaction.ns_rwsets = ns_rwsets;
          transactions.push(transaction);

        }
      }

      returnBlock.transactions = transactions;
      returnBlockchain.push(returnBlock);


    }
    //console.log('returnBlockchain');
    //console.log(returnBlockchain);
    ////modify res.send to return response与其他方法统一返回response，类似于queryAllCars
    // res.send({
    //   'result': 'Success',
    //   'returnBlockchain': returnBlockchain
    // });
    response=JSON.stringify(returnBlockchain);
    return response;

  } catch (error) {
    console.error(`Failed to get blockchain: ${error}`);
    console.log(error.stack);
    // res.send({
    //   'error': error.message
    // });
    response.error=error.message;
    return response;
  }
}
