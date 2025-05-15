import { useState, useEffect } from 'react';
import CalorieTracker from './CalorieTracker';
import MacroNutrients from './MacroNutrients';
import ProgressChart from './ProgressChart';
import MealsList from './MealsList';
import FoodEntryForm from './FoodEntryForm';
import WaterTracker from './WaterTracker';
import WeightTracker from './WeightTracker';

// New component imports
import { AlertCircle, Settings, ChevronRight, Bell, Calendar, Heart } from 'lucide-react';

function Dashboard() {
  // Enhanced demo/mock user data
  const [user, setUser] = useState({
    name: "",
    avatar: "/api/placeholder/40/40",
    weight: {
      current: 72, // kg
      goal: 68,    // kg
      history: [
        { date: '2025-05-06', weight: 72 },
        { date: '2025-05-07', weight: 71.8 },
        { date: '2025-05-08', weight: 71.6 },
        { date: '2025-05-09', weight: 71.4 },
        { date: '2025-05-10', weight: 71.2 },
        { date: '2025-05-11', weight: 71 },
        { date: '2025-05-12', weight: 70.8 },
      ]
    },
    preferences: {
      theme: 'light',
      notifications: true,
      units: 'metric' // or 'imperial'
    }
  });

  // Enhanced data state
  const [dashboardData, setDashboardData] = useState({
    dailyStats: {
      calories: {
        consumed: 1800,
        goal: 2200,
        remaining: 400,
      },
      macros: {
        carbs: { value: 200, goal: 250, unit: 'g' },
        protein: { value: 120, goal: 130, unit: 'g' },
        fat: { value: 60, goal: 73, unit: 'g' },
      },
      water: {
        consumed: 2, // in liters
        goal: 12,
      },
      steps: {
        count: 6540,
        goal: 10000
      }
    },
    weeklyProgress: [
      { day: 'Mon', weight: 72, calories: 2100 },
      { day: 'Tue', weight: 71.8, calories: 2050 },
      { day: 'Wed', weight: 71.6, calories: 1950 },
      { day: 'Thu', weight: 71.4, calories: 2000 },
      { day: 'Fri', weight: 71.2, calories: 1900 },
      { day: 'Sat', weight: 71, calories: 2200 },
      { day: 'Sun', weight: 70.8, calories: 1800 },
    ],
    recentMeals: [
      { id: 1, name: 'Breakfast - Oatmeal & Banana', calories: 350, time: '08:30', macros: { carbs: 60, protein: 10, fat: 5 } },
      { id: 2, name: 'Lunch - Grilled Chicken & Rice', calories: 600, time: '12:45', macros: { carbs: 70, protein: 40, fat: 15 } },
      { id: 3, name: 'Snack - Almonds', calories: 200, time: '15:30', macros: { carbs: 5, protein: 7, fat: 18 } },
      { id: 4, name: 'Dinner - Salmon & Vegetables', calories: 650, time: '19:15', macros: { carbs: 30, protein: 45, fat: 25 } },
    ],
    nutritionTips: [
      "Try to include protein with every meal to help maintain muscle mass.",
      "Stay hydrated! Drink water before meals to help with portion control.",
      "Include colorful vegetables in your meals for essential vitamins."
    ]
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);
  const [dateRange, setDateRange] = useState('week'); // 'day', 'week', 'month'
  const [notificationCount, setNotificationCount] = useState(2);

  // Function to handle adding a meal
  const handleAddMeal = (meal) => {
    const updatedMeals = [
      {
        id: dashboardData.recentMeals.length + 1,
        name: meal.name,
        calories: meal.calories,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        macros: meal.macros || { carbs: 0, protein: 0, fat: 0 }
      },
      ...dashboardData.recentMeals
    ];

    // Update consumed calories
    const updatedCalories = {
      ...dashboardData.dailyStats.calories,
      consumed: dashboardData.dailyStats.calories.consumed + meal.calories,
      remaining: dashboardData.dailyStats.calories.goal - (dashboardData.dailyStats.calories.consumed + meal.calories)
    };

    // Update macros
    const updatedMacros = {
      carbs: {
        ...dashboardData.dailyStats.macros.carbs,
        value: dashboardData.dailyStats.macros.carbs.value + (meal.macros?.carbs || 0)
      },
      protein: {
        ...dashboardData.dailyStats.macros.protein,
        value: dashboardData.dailyStats.macros.protein.value + (meal.macros?.protein || 0)
      },
      fat: {
        ...dashboardData.dailyStats.macros.fat,
        value: dashboardData.dailyStats.macros.fat.value + (meal.macros?.fat || 0)
      }
    };

    setDashboardData({
      ...dashboardData,
      recentMeals: updatedMeals,
      dailyStats: {
        ...dashboardData.dailyStats,
        calories: updatedCalories,
        macros: updatedMacros
      }
    });
  };

  // Function to handle adding water
  const handleAddWater = (amount) => {
    const newAmount = Math.min(dashboardData.dailyStats.water.consumed + amount, 5); // Cap at 5L for realistic tracking

    setDashboardData({
      ...dashboardData,
      dailyStats: {
        ...dashboardData.dailyStats,
        water: {
          ...dashboardData.dailyStats.water,
          consumed: newAmount
        }
      }
    });
  };

  // Function to update weight
  const handleWeightUpdate = (newWeight) => {
    const today = new Date().toISOString().split('T')[0];

    setUser({
      ...user,
      weight: {
        ...user.weight,
        current: newWeight,
        history: [
          { date: today, weight: newWeight },
          ...user.weight.history.filter(entry => entry.date !== today)
        ]
      }
    });
  };

  // Format date for display
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate progress percentage
  const weightLossProgress = () => {
    const initialWeight = user.weight.history[0].weight;
    const currentWeight = user.weight.current;
    const goalWeight = user.weight.goal;

    if (initialWeight === goalWeight) return 100;

    const totalLossNeeded = initialWeight - goalWeight;
    const lossAchieved = initialWeight - currentWeight;

    return Math.round((lossAchieved / totalLossNeeded) * 100);
  };

  // Daily tip randomizer
  const [dailyTip, setDailyTip] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dashboardData.nutritionTips.length);
    setDailyTip(dashboardData.nutritionTips[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NutriTrack</span>
            </div>
            <div className="flex items-center space-x-4">

              <div className="flex items-center">
              
                <span className="ml-2 font-medium text-gray-900">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Panel (toggle visibility) */}
      {showSettings && (
        <div className="bg-white shadow-md p-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <select
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={user.preferences.theme}
                  onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, theme: e.target.value } })}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                <select
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={user.preferences.units}
                  onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, units: e.target.value } })}
                >
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lb, in)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notifications</label>
                <div className="flex items-center">
                  <input
                    id="notifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={user.preferences.notifications}
                    onChange={(e) => setUser({ ...user, preferences: { ...user.preferences, notifications: e.target.checked } })}
                  />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">Enable notifications</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Daily Tip Alert */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-md shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-700">
                <span className="font-medium">Daily Tip:</span> {dailyTip}
              </p>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Daily Dashboard</h1>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <p>{currentDate}</p>
            </div>
          </div>
          
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Weight Loss</p>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-gray-900">{weightLossProgress()}%</span>
                <span className="ml-1 text-sm text-gray-500">complete</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${weightLossProgress()}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Today's Calories</p>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-gray-900">{Math.round((dashboardData.dailyStats.calories.consumed / dashboardData.dailyStats.calories.goal) * 100)}%</span>
                <span className="ml-1 text-sm text-gray-500">consumed</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (dashboardData.dailyStats.calories.consumed / dashboardData.dailyStats.calories.goal) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Water Intake</p>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-gray-900">{Math.round((dashboardData.dailyStats.water.consumed / dashboardData.dailyStats.water.goal) * 100)}%</span>
                <span className="ml-1 text-sm text-gray-500">consumed</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (dashboardData.dailyStats.water.consumed / dashboardData.dailyStats.water.goal) * 100)}%` }}
                ></div>
              </div>
            </div>
           
          </div>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Calories Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Calories</h3>
              <CalorieTracker
                consumed={dashboardData.dailyStats.calories.consumed}
                goal={dashboardData.dailyStats.calories.goal}
                remaining={dashboardData.dailyStats.calories.remaining}
              />
            </div>
          </div>

          {/* Macro Nutrients Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Macro Nutrients</h3>
              <MacroNutrients macros={dashboardData.dailyStats.macros} />
            </div>
          </div>

          {/* Water Tracking Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Intake</h3>
              <WaterTracker
                consumed={dashboardData.dailyStats.water.consumed}
                goal={dashboardData.dailyStats.water.goal}
                onAddWater={handleAddWater}
              />
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2 lg:col-span-2">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Progress Chart</h3>
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className={`px-3 py-1 text-sm font-medium rounded-l-md ${dateRange === 'weight'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={() => setDateRange('weight')}
                  >
                    Weight
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 text-sm font-medium rounded-r-md ${dateRange === 'calories'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={() => setDateRange('calories')}
                  >
                    Calories
                  </button>
                </div>
              </div>
              <ProgressChart
                weeklyData={dashboardData.weeklyProgress}
                dataType={dateRange === 'calories' ? 'calories' : 'weight'}
              />
            </div>
          </div>

          {/* Weight Tracker */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Tracker</h3>
              <WeightTracker
                current={user.weight.current}
                goal={user.weight.goal}
                onWeightUpdate={handleWeightUpdate}
                unit={user.preferences.units === 'metric' ? 'kg' : 'lb'}
              />
            </div>
          </div>

          {/* Recent Meals */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-2">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Meals</h3>
              <MealsList meals={dashboardData.recentMeals} />
            </div>
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex justify-end">
              <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all meals
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
            
          {/* Add Food Form */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Food</h3>
              <FoodEntryForm onAddMeal={handleAddMeal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
