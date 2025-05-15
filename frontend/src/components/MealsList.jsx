import { useState, useEffect } from 'react';
import { FiClock, FiTrash2, FiPlus } from 'react-icons/fi';


function MealsList({ meals: initialMeals }) {
  const [meals, setMeals] = useState(initialMeals);

  // Sync with parent updates (e.g., adding a new meal)
  useEffect(() => {
    setMeals(initialMeals);
  }, [initialMeals]);

  const handleDelete = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Today's Meals</h2>
        <button className="text-xs text-primary-600 hover:text-primary-800">
          View All
        </button>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No meals recorded today</p>
          <p className="text-sm mt-1">Add your first meal using the form</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calories
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Protein
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Carbs
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Fat
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {meals.map((meal) => (
                <tr key={meal.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{meal.name}</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <FiClock className="mr-1" size={12} />
                        {meal.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                    <span className="font-medium text-gray-900">{meal.calories}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm hidden sm:table-cell">
                    <span className="text-gray-700">{meal.protein}g</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm hidden sm:table-cell">
                    <span className="text-gray-700">{meal.carbs}g</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm hidden sm:table-cell">
                    <span className="text-gray-700">{meal.fat}g</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                    <button
                      className="text-gray-400 hover:text-error-500 transition-colors"
                      onClick={() => handleDelete(meal.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

        <div className="flex justify-between items-center mb-4">
  
 
</div>


      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold">
            {meals.reduce((total, meal) => total + meal.calories, 0)} cal
          </span>
        </div>
      </div>
    </div>
  );
}

export default MealsList;
