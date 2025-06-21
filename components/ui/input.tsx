import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  textAlign?: "left" | "center" | "right"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, textAlign = "left", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-xl font-medium text-gray-900",
          "placeholder:text-gray-500 placeholder:text-lg",
          "focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500",
          "hover:border-primary-400 transition-colors duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          textAlign === "center" && "text-center placeholder:text-center",
          textAlign === "right" && "text-right placeholder:text-right",
          "md:h-14 md:text-xl md:placeholder:text-lg",
          className,
        )}
        autoComplete={type === "tel" ? "tel" : "on"}
        inputMode={type === "tel" ? "tel" : undefined}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
