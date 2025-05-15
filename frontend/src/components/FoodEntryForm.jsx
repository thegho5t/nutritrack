import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

function FoodEntryForm({ onAddMeal }) {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For numeric fields, ensure we're getting numbers
    if (['calories', 'protein', 'carbs', 'fat'].includes(name)) {
      // Allow empty string or valid numbers
      if (value === '' || (!isNaN(value) && value >= 0)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Meal name is required';
    }
    
    if (!formData.calories || isNaN(formData.calories)) {
      newErrors.calories = 'Valid calories are required';
    }
    
    ['protein', 'carbs', 'fat'].forEach(field => {
      if (!formData[field] || isNaN(formData[field])) {
        newErrors[field] = `Valid ${field} value is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Create new meal object
    const newMeal = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }),
      calories: parseInt(formData.calories, 10),
      protein: parseInt(formData.protein, 10),
      carbs: parseInt(formData.carbs, 10),
      fat: parseInt(formData.fat, 10)
    };
    
    // Call the onAddMeal function from props
    onAddMeal(newMeal);
    
    // Reset form
    setFormData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Meal</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="meal-name" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Meal Name
          </label>
          <input
            type="text"
            id="meal-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Breakfast, Lunch, Snack, etc."
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label 
              htmlFor="calories" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Calories
            </label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${errors.calories ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              placeholder="kcal"
            />
            {errors.calories && (
              <p className="mt-1 text-xs text-red-600">{errors.calories}</p>
            )}
          </div>
          
          <div>
            <label 
              htmlFor="protein" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Protein (g)
            </label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${errors.protein ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              placeholder="grams"
            />
            {errors.protein && (
              <p className="mt-1 text-xs text-red-600">{errors.protein}</p>
            )}
          </div>
          
          <div>
            <label 
              htmlFor="carbs" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Carbs (g)
            </label>
            <input
              type="number"
              id="carbs"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${errors.carbs ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              placeholder="grams"
            />
            {errors.carbs && (
              <p className="mt-1 text-xs text-red-600">{errors.carbs}</p>
            )}
          </div>
          
          <div>
            <label 
              htmlFor="fat" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Fat (g)
            </label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${errors.fat ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
              placeholder="grams"
            />
            {errors.fat && (
              <p className="mt-1 text-xs text-red-600">{errors.fat}</p>
            )}
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FiPlusCircle className="mr-2" />
          Add Meal
        </button>
      </form>
    </div>
  );
}

export default FoodEntryForm;