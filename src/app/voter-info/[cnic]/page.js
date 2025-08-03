import dbConnect from '@/lib/dbConnect'
import Voter from '@/models/Voter'

export const dynamic = 'force-dynamic'


export default async function VoterInfoPage({params}) {
  const {cnic} = await params

  await dbConnect()
  const voter = await Voter.findOne({ cnic }).lean()

  if (!voter) {
    return (
      <div className="p-6 text-center text-red-600 text-xl">
        No voter found with CNIC: {cnic}
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Voter Information</h1>

      <div className="space-y-2 text-gray-800">
        <p><strong>Name:</strong> {voter.name}</p>
        <p><strong>CNIC:</strong> {voter.cnic}</p>
        <p><strong>Father Name:</strong> {voter.fatherName}</p>
        <p><strong>Gender:</strong> {voter.gender}</p>
        <p><strong>District:</strong> {voter.district}</p>
        <p><strong>NA Constituency:</strong> {voter.constituencies?.na}</p>
        <p><strong>PK Constituency:</strong> {voter.constituencies?.pk}</p>
        <p><strong>Voted:</strong></p>
        <ul className="ml-4 list-disc">
          <li>NA: {voter.voted?.na ? '✅ Voted' : '❌ Not Voted'}</li>
          <li>PK: {voter.voted?.pk ? '✅ Voted' : '❌ Not Voted'}</li>
        </ul>
      </div>
    </div>
  )
}
