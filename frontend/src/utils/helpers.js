export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateWeightLossProgress = (initialWeight, currentWeight, goalWeight) => {
  if (initialWeight === goalWeight) return 100;

  const totalLossNeeded = initialWeight - goalWeight;
  const lossAchieved = initialWeight - currentWeight;

  return Math.round((lossAchieved / totalLossNeeded) * 100);
};

export const calculatePercentage = (value, total) => {
  return Math.min(100, Math.round((value / total) * 100));
};

export const addAnimations = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }

      .animate-slideIn {
        animation: slideIn 0.4s ease-out;
      }
    `;
    document.head.appendChild(style);
  }
};
