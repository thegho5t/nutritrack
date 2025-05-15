import { useState } from 'react';
import { FiDroplet, FiRotateCcw } from 'react-icons/fi';

function WaterTracker({ goal = 8 }) {
  const [consumed, setConsumed] = useState(0);

  const handleAddWater = () => {
    if (consumed < goal) {
      setConsumed(prev => Math.min(prev + 1, goal));
    }
  };

  const handleResetWater = () => {
    setConsumed(0);
  };

  const visualGoal = Math.ceil(goal);

  const glasses = Array.from({ length: visualGoal }, (_, i) => ({
    id: i + 1,
    filled: i + 1 <= consumed
  }));

  return (
    <div className="p-4 rounded-xl shadow-md bg-white max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Water Intake</h2>

      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Consumed</p>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-accent-600">{consumed}</p>
            <p className="text-lg text-gray-500 ml-1">/ {goal} cups</p>
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <button
            onClick={handleAddWater}
            className="flex items-center px-3 py-1.5 bg-accent-100 hover:bg-accent-200 text-accent-700 rounded-lg transition-colors"
          >
            <FiDroplet className="mr-1" />
            <span>Add Water</span>
          </button>
          <button
            onClick={handleResetWater}
            className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <FiRotateCcw className="mr-1" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Water glasses visualization */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        {glasses.map(glass => (
          <div
            key={glass.id}
            className={`aspect-[1/1.5] rounded-b-lg border-2 ${
              glass.filled
                ? 'border-accent-500 bg-accent-100'
                : 'border-gray-200 bg-white'
            } flex items-end transition-all duration-300 cursor-pointer hover:border-accent-400`}
            onClick={handleAddWater}
          >
            <div
              className={`w-full bg-accent-500 rounded-b-lg transition-all duration-500 ease-out ${
                glass.filled ? 'h-full' : 'h-0'
              }`}
            ></div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>{Math.round((consumed / goal) * 100)}% of daily goal</p>
      </div>
    </div>
  );
}

export default WaterTracker;
