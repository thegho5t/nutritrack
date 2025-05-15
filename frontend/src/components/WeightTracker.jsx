import { FiTrendingDown } from 'react-icons/fi';

function WeightTracker({ current, goal }) {
  // Calculate progress
  const difference = current - goal;
  const isReached = difference <= 0;
  
  // Calculate percentage to display on the progress circle
  const totalProgress = isReached ? 100 : 100 - Math.min(Math.round((difference / (current - goal + 5)) * 100), 100);
  
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Weight Progress</h2>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Progress circle */}
          <svg className="w-32 h-32" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={isReached ? "#10b981" : "#3b82f6"}
              strokeWidth="3"
              strokeDasharray={`${totalProgress}, 100`}
              className="rotate-[270deg] origin-center transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">{current} kg</p>
              <p className="text-xs text-gray-500">Current</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Current</p>
          <p className="text-lg font-semibold text-gray-800">{current} kg</p>
        </div>
        
        <div className="flex items-center text-accent-600">
          <FiTrendingDown className="mr-1" />
          <span className="text-sm font-medium">
            {difference > 0 ? `${difference} kg to go` : 'Goal reached!'}
          </span>
        </div>
        
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Goal</p>
          <p className="text-lg font-semibold text-gray-800">{goal} kg</p>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <span 
          className={`inline-block px-3 py-1 rounded-full text-sm ${
            isReached 
              ? 'bg-success-100 text-success-800' 
              : 'bg-accent-100 text-accent-800'
          }`}
        >
          {isReached ? 'Goal achieved! 🎉' : `${totalProgress}% to goal`}
        </span>
      </div>
    </div>
  );
}

export default WeightTracker;