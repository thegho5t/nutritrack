function MacroNutrients({ macros }) {
  const { protein, carbs, fat } = macros;

  const totalGrams = protein.consumed + carbs.consumed + fat.consumed;

  const proteinPercent = Math.round((protein.consumed / totalGrams) * 100) || 0;
  const carbsPercent = Math.round((carbs.consumed / totalGrams) * 100) || 0;
  const fatPercent = Math.round((fat.consumed / totalGrams) * 100) || 0;

  const proteinProgress = Math.min(Math.round((protein.consumed / protein.goal) * 100), 100);
  const carbsProgress = Math.min(Math.round((carbs.consumed / carbs.goal) * 100), 100);
  const fatProgress = Math.min(Math.round((fat.consumed / fat.goal) * 100), 100);

  // Helper to calculate stroke dashoffset for segments
  const proteinOffset = 0;
  const carbsOffset = proteinPercent;
  const fatOffset = proteinPercent + carbsPercent;

  // Helper to position text labels in the middle of each segment (using polar coords)
  // Radius of circle = 15.9155 (from SVG path)
  // circumference = 2 * PI * radius = 100 approx, which matches strokeDasharray base
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;

  // Function to get text position (x,y) on the circle for a given segment percentage start and length
  function getLabelPosition(startPercent, segmentPercent) {
    // Find the midpoint angle of the segment
    // The stroke starts at the top (270deg rotation), so 0% = 12 o'clock = -90deg
    const startAngle = -90 + (startPercent / 100) * 360;
    const midAngle = startAngle + (segmentPercent / 2 / 100) * 360;

    // Convert degrees to radians for Math functions
    const rad = (midAngle * Math.PI) / 180;

    // Calculate label position - place slightly inside the circle (radius * 0.65)
    const labelRadius = radius * 0.65;
    const cx = 18 + labelRadius * Math.cos(rad);
    const cy = 18 + labelRadius * Math.sin(rad);

    return { cx, cy };
  }

  const proteinLabelPos = getLabelPosition(proteinOffset, proteinPercent);
  const carbsLabelPos = getLabelPosition(carbsOffset, carbsPercent);
  const fatLabelPos = getLabelPosition(fatOffset, fatPercent);

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Macronutrients</h2>

      {/* Pie chart */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40 sm:w-32 sm:h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            {/* Background circle */}
           
            {/* Protein segment */}
           
            {/* Protein label */}
            {proteinPercent > 5 && (
              <text
                x={proteinLabelPos.cx}
                y={proteinLabelPos.cy}
                fill="#15803d"
                fontSize="3.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {proteinPercent}%
              </text>
            )}

            {/* Carbs segment */}
          
            {/* Carbs label */}
            {carbsPercent > 5 && (
              <text
                x={carbsLabelPos.cx}
                y={carbsLabelPos.cy}
                fill="#2563eb"
                fontSize="3.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {carbsPercent}%
              </text>
            )}

            {/* Fat segment */}
          
            {/* Fat label */}
            {fatPercent > 5 && (
              <text
                x={fatLabelPos.cx}
                y={fatLabelPos.cy}
                fill="#b45309"
                fontSize="3.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {fatPercent}%
              </text>
            )}
          </svg>

          {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">{totalGrams}g</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Macro breakdown */}
<div className="space-y-3">
  {/* Protein */}
  <div>
    <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
      <div className="flex items-center mb-1 sm:mb-0">
        <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
        <span className="text-sm font-medium">Protein</span>
      </div>
      <span className="text-sm text-gray-600">
        {protein.consumed}g / {protein.goal}g (Total: {200}g)
      </span>
    </div>
    <div className="progress-bar bg-green-100 rounded h-2">
      <div
        className="progress-bar-fill bg-green-400 h-2 rounded"
        style={{
          width: `${proteinProgress}%`,
        }}
      ></div>
    </div>
  </div>

  {/* Carbs */}
  <div>
    <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
      <div className="flex items-center mb-1 sm:mb-0">
        <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
        <span className="text-sm font-medium">Carbs</span>
      </div>
      <span className="text-sm text-gray-600">
        {carbs.consumed}g / {carbs.goal}g (Total: {500}g)
      </span>
    </div>
    <div className="progress-bar bg-blue-100 rounded h-2">
      <div
        className="progress-bar-fill bg-blue-400 h-2 rounded"
        style={{
          width: `${carbsProgress}%`,
        }}
      ></div>
    </div>
  </div>

  {/* Fat */}
  <div>
    <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
      <div className="flex items-center mb-1 sm:mb-0">
        <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
        <span className="text-sm font-medium">Fat</span>
      </div>
      <span className="text-sm text-gray-600">
        {fat.consumed}g / {fat.goal}g (Total: {100}g)
      </span>
    </div>
    <div className="progress-bar bg-amber-100 rounded h-2">
      <div
        className="progress-bar-fill bg-amber-400 h-2 rounded"
        style={{
          width: `${fatProgress}%`,
        }}
      ></div>
    </div>
  </div>
</div>


      <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded text-center">
        <p>
          Protein: {proteinPercent}% • Carbs: {carbsPercent}% • Fat: {fatPercent}%
        </p>
      </div>
    </div>
  );
}

export default MacroNutrients;
