const { ethers } = require("ethers")
const CONTRACT_ABI = require("./abi.json")  // save your contract ABI as a separate file
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

// Connect to the blockchain
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

async function addCandidateToBlockchain({ name, voteType }) {
  const tx = await contract.addCandidate(name, voteType)
  await tx.wait()
  console.log("Candidate added on blockchain")
}

module.exports = {
  addCandidateToBlockchain
}
