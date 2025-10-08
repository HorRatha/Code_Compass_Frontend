import React, { useState, ReactNode } from "react"
import { Plus, X, RefreshCw, AlertCircle, Clock } from "lucide-react"

// Properly typed Button props
interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95 relative overflow-hidden"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-border hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 rounded-lg text-sm",
    lg: "h-12 px-8 text-lg",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// Package Info interface
interface PackageInfo {
  name: string;
  id?: number;
}

// Modal props interface
interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageInfo: PackageInfo | null;
  onSubmit: (problemIds: number[]) => void;
  isLoading: boolean;
}

const AddProblemModal = ({ isOpen, onClose, packageInfo, onSubmit, isLoading }: AddProblemModalProps) => {
  const [problemIds, setProblemIds] = useState("")
  const [validationError, setValidationError] = useState("")

  if (!isOpen) return null

  const validateProblemIds = (input: string): string => {
    if (!input.trim()) {
      return "Problem IDs are required"
    }
    
    const ids = input.split(',').map(id => id.trim())
    const invalidIds = ids.filter(id => {
      const num = parseInt(id)
      return isNaN(num) || num <= 0
    })
    
    if (invalidIds.length > 0) {
      return `Invalid problem IDs: ${invalidIds.join(', ')}. Please use positive numbers only.`
    }
    
    if (ids.length > 50) {
      return "Maximum 50 problems can be added at once"
    }
    
    return ""
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setProblemIds(value)
    setValidationError(validateProblemIds(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateProblemIds(problemIds)
    if (error) {
      setValidationError(error)
      return
    }
    
    const ids = problemIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    if (ids.length > 0) {
      onSubmit(ids)
    }
  }

  const getProblemCount = (): number => {
    return problemIds.split(',').filter(id => id.trim()).length || 0
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in zoom-in-95 duration-200 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-500" />
              Add Problems to Package
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Package: <span className="font-medium">{packageInfo?.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Problem IDs <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={problemIds}
              onChange={handleInputChange}
              placeholder="e.g., 1, 2, 3, 4, 5"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                validationError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all`}
              disabled={isLoading}
              required
            />
            {validationError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {validationError}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Enter problem IDs separated by commas. Maximum 50 problems per batch.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Problems will be added to this package and the package status may change to PENDING for review.</span>
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !problemIds.trim() || !!validationError}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Adding Problems...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add {getProblemCount()} Problems
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProblemModal