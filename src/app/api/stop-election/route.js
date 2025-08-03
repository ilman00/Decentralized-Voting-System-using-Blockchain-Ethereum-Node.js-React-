import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../../../lib/Contract';

export async function POST() {
  try {
    // Set up a JSON-RPC provider (localhost Hardhat/Anvil)
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

    // Use the first account as the signer (for local dev)
    const signer = await provider.getSigner(0); // First account from local network

    // Connect to the contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Call the stopElection function
    const tx = await contract.stopElection();
    await tx.wait(); // wait for the transaction to be mined

    return NextResponse.json({ success: true, message: 'Election stopped' });
  } catch (error) {
    console.error('Failed to stop election:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
