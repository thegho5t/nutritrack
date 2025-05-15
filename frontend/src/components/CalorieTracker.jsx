import { FiTarget } from 'react-icons/fi';

function CalorieTracker({ consumed, goal, remaining }) {
  // Calculate percentage of goal consumed
  const percentConsumed = Math.min(Math.round((consumed / goal) * 100), 100);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Calories</h2>
        <div className="flex items-center text-sm text-gray-600">
          <FiTarget className="mr-1" />
          <span>Goal: {goal}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-sm text-gray-500 mb-1">Consumed</p>
          <p className="text-3xl font-bold text-primary-600">{consumed}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Remaining</p>
          <p className="text-2xl font-semibold text-gray-700">{remaining}</p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="progress-bar mt-4">
        <div 
          className="progress-bar-fill bg-primary-500"
          style={{ 
            '--progress-width': `${percentConsumed}%`,
            width: `${percentConsumed}%` 
          }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span>{goal / 2}</span>
        <span>{goal}</span>
      </div>
      
      <div className="text-center mt-4">
        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
          {percentConsumed}% of daily goal
        </span>
      </div>
    </div>
  );
}

export default CalorieTracker;