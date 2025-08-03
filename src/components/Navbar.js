// components/Navbar.js
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-indigo-700">Voting DApp</Link>
      <div className="space-x-4 text-black">
        <Link href="/candidates" className="hover:underline">Candidates</Link>
        <Link href="/vote" className="hover:underline">Vote</Link>
        <Link href="/result" className="hover:underline">Results</Link>
        <Link href="/admin" className="hover:underline">Admin</Link>
      </div>
    </nav>
  )
}
