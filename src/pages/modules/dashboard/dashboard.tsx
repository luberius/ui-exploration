import StatsCards from './components/stats-cards'
import TopPlacesCard from './components/top-places-card'
import RecentReviewsCard from './components/recent-reviews-card'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your UI playground dashboard</p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPlacesCard />
        <RecentReviewsCard />
      </div>
    </div>
  )
}