'use client'

export default function ConstituencySelector({ district, type, onSelect }) {
  const dummyConstituencies = {
    Peshawar: {
      pk: ['PK-1', 'PK-2'],
      na: ['NA-1', 'NA-2']
    },
    Lahore: {
      pk: ['PK-10', 'PK-11'],
      na: ['NA-50', 'NA-51']
    },
    // Add more as needed
  }

  const list = dummyConstituencies[district]?.[type.toLowerCase()] || []

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Select {type.toUpperCase()}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {list.map(id => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded shadow"
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  )
}
