const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Merkle Tree for the niceList
  const merkleTree = new MerkleTree(niceList);

  // Get proof that you're in the niceList
  const name = "Adam O'Callaghan";
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  // Post to server endpoint with name + proof
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof
  });

  console.log({ gift }); // what did you get?! :-)
}

main();