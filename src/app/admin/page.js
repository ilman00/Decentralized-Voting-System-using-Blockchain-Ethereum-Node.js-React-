'use client'
import { useRouter } from 'next/navigation'

const adminActions = [
    {
        label: 'Add PK in District',
        icon: '🏛️',
        route: '/admin/add-pk',
    },
    {
        label: 'Add NA in District',
        icon: '🏛️',
        route: '/admin/add-na',
    },
    {
        label: 'Add Candidate',
        icon: '🧑‍💼',
        route: '/admin/add-candidate',
    },
    {
        label: 'Add Voter',
        icon: '🆔',
        route: '/admin/add-voter',
    },
    {
        label: 'See All Voters Data',
        icon: '🆔',
        route: '/admin/voters',
    },
    {
        label: 'Start/Stop The Election',
        icon: '🆔',
        route: '/admin/election',
    },
]

export default function AdminHome() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-16">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-2">Admin Dashboard</h1>
                <p className="text-gray-300 text-lg">Manage the core elements of the voting system</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {adminActions.map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => router.push(action.route)}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/10 p-6 rounded-2xl text-white text-lg font-semibold flex flex-col items-center justify-center shadow-lg transition"
                    >
                        <div className="text-4xl mb-4">{action.icon}</div>
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
