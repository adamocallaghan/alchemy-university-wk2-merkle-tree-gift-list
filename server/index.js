const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// Merkle Tree for the niceList
const merkleTree = new MerkleTree(niceList);
// Root for the merkleTree
const root = merkleTree.getRoot();
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = root;
console.log(MERKLE_ROOT); // just checking

app.post('/gift', (req, res) => {
  // Get and destructure name + proof from the request body
  const body = req.body;
  const { name, proof } = body;

  // Verify proof based on passed in params + the MERKLE_ROOT from above
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  // If you've been nice... :-)
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :("); // If you've been naughty... :-)
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
