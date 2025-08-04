export default function StatsCards() {
  const stats = [
    { name: 'Total Places', value: '248', change: '+12%', changeType: 'positive' },
    { name: 'Reviews', value: '1,429', change: '+3%', changeType: 'positive' },
    { name: 'Avg Rating', value: '4.2', change: '+0.1', changeType: 'positive' },
    { name: 'Active Users', value: '89', change: '-2%', changeType: 'negative' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}