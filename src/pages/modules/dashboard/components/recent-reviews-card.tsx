export default function RecentReviewsCard() {
  const recentReviews = [
    { user: 'John Doe', place: 'Central Park', rating: 5, comment: 'Amazing place for morning walks!' },
    { user: 'Jane Smith', place: 'Times Square', rating: 4, comment: 'Bustling and energetic atmosphere.' },
    { user: 'Mike Johnson', place: 'Brooklyn Bridge', rating: 5, comment: 'Breathtaking views of the city.' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reviews</h3>
      <div className="space-y-4">
        {recentReviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{review.user}</p>
                <p className="text-xs text-gray-500">{review.place}</p>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-900">{review.rating}</span>
                <span className="text-yellow-400">★</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}