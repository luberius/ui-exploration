export default function TopPlacesCard() {
  const topPlaces = [
    { name: 'Central Park', rating: 4.8, reviews: 324 },
    { name: 'Times Square', rating: 4.2, reviews: 289 },
    { name: 'Brooklyn Bridge', rating: 4.6, reviews: 156 },
    { name: 'Statue of Liberty', rating: 4.9, reviews: 412 },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Places</h3>
      <div className="space-y-4">
        {topPlaces.map((place, index) => (
          <div key={place.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">{place.name}</p>
                <p className="text-xs text-gray-500">{place.reviews} reviews</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-900">{place.rating}</span>
              <span className="text-yellow-400">★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}