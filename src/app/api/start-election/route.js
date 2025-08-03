// app/api/start-election/route.js
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../../../lib/Contract'

export async function POST() {
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
  const wallet = new ethers.Wallet(process.env.SUPER_ADMIN_PRIVATE_KEY, provider)
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet)

  try {
    const tx = await contract.startElection()
    await tx.wait()
    return NextResponse.json({ success: true, status: "ongoing" ,tx: tx.hash , message: "Election is started"})
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
