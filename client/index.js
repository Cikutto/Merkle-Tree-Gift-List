const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  
  const tree = new MerkleTree(niceList)
  console.log(tree.getRoot())

  // TODO: how do we prove to the server we're on the nice list? 
  const root = tree.getRoot();
  const niceListNames = process.argv.slice(2);
  const name = niceListNames.join(" ");
  const index = niceList.findIndex(n => n === name);
  const proof = tree.getProof(index);
  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof,
    root
  });
  
  console.log({ gift });
}


main();