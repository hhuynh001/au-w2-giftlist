const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

const MERKLE_ROOT = root;

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const { name, proof } = body;

  // verify proof against the Merkle Root
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT); 
  console.log(isInTheList); // true, if is in the list!

  // TODO: prove that a name is in the list 
  // const isInTheList = false;
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
