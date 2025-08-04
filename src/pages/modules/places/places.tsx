import PlacesTable from './components/places-table'
import PlaceFilters from './components/place-filters'

export default function Places() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Places</h1>
          <p className="text-gray-600">Manage and explore different places</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Place
        </button>
      </div>
      
      <PlaceFilters />
      <PlacesTable />
    </div>
  )
}