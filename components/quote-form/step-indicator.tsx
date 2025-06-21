interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  // Step titles
  const stepTitles = ["Zip Code", "Service", "Details", "Date", "Summary"]

  return (
    <div className="flex items-center justify-between mb-8 px-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div
            key={stepNumber}
            className={`flex flex-col items-center relative ${stepNumber < totalSteps ? "flex-1" : ""}`}
          >
            {/* Step circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium z-10
                ${
                  isActive
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-200/50 ring-4 ring-primary-100"
                    : isCompleted
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                }`}
            >
              {isCompleted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                stepNumber
              )}
            </div>

            {/* Step title */}
            <span
              className={`text-xs mt-2 font-medium transition-all duration-300 ${
                isActive ? "text-primary-700" : isCompleted ? "text-primary-600" : "text-gray-400"
              }`}
            >
              {stepTitles[index]}
            </span>

            {/* Connector line */}
            {stepNumber < totalSteps && (
              <div className="absolute top-5 left-1/2 w-full h-[2px] -z-10">
                <div className={`h-full ${stepNumber < currentStep ? "bg-primary-600" : "bg-gray-200"}`}></div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
