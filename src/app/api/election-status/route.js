// src/app/api/election-status/route.js
import { ethers } from 'ethers';
import { CONTRACT_ABI } from '../../../../lib/Contract';

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // your deployed contract address

export async function GET() {
  try {
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const started = await contract.electionStarted();
    return new Response(JSON.stringify({ started }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Could not fetch status' }), { status: 500 });
  }
}
