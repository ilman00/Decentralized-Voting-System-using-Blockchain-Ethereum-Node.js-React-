import {ethers} from "ethers"

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;


export const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "addSubAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "enum VotingSystem.SetType",
				"name": "set",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "district",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nic",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionStarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "enum VotingSystem.SetType",
				"name": "set",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "bio",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nic",
				"type": "string"
			}
		],
		"name": "hasNICVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "enum VotingSystem.SetType",
				"name": "_set",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_district",
				"type": "string"
			}
		],
		"name": "registerCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "removeSubAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stopElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "subAdmins",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "superAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "votersByNIC",
		"outputs": [
			{
				"internalType": "string",
				"name": "nic",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "hasVoted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


function getContract(providerOrSigner) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
}

// Add sub-admin
export async function addSubAdmin(signer, adminAddress) {
  const contract = getContract(signer);
  const tx = await contract.addSubAdmin(adminAddress);
  await tx.wait();
  return tx.hash;
}

// Remove sub-admin
export async function removeSubAdmin(signer, adminAddress) {
  const contract = getContract(signer);
  const tx = await contract.removeSubAdmin(adminAddress);
  await tx.wait();
  return tx.hash;
}

// Start election
export async function startElection(signer) {
  const contract = getContract(signer);
  const tx = await contract.startElection();
  await tx.wait();
  return tx.hash;
}

// Stop election
export async function stopElection(signer) {
  const contract = getContract(signer);
  const tx = await contract.stopElection();
  await tx.wait();
  return tx.hash;
}

// Register candidate
export async function registerCandidate(signer, name, setType, district) {
  const contract = getContract(signer);
  const tx = await contract.registerCandidate(name, setType, district);
  await tx.wait();
  return tx.hash;
}

// Cast vote
export async function castVote(signer, nic, candidateId) {
  const contract = getContract(signer);
  const tx = await contract.castVote(nic, candidateId);
  await tx.wait();
  return tx.hash;
}

// Get number of candidates
export async function getCandidateCount(provider) {
  const contract = getContract(provider);
  return await contract.getCandidateCount();
}

// Get candidate by ID
export async function getCandidate(provider, id) {
  const contract = getContract(provider);
  const result = await contract.getCandidate(id);
  return {
    name: result.name,
    set: result.set === 0 ? "NA" : "PA",
    district: result.district,
    voteCount: result.voteCount.toNumber()
  };
}

// Check if NIC has voted
export async function hasNICVoted(provider, nic) {
  const contract = getContract(provider);
  return await contract.hasNICVoted(nic);
}

