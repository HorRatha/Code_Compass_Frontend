import React, { useState, ReactNode } from "react"
import { Award, X, RefreshCw, AlertCircle } from "lucide-react"

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
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active: relative overflow-hidden"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl ",
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
interface AddBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageInfo: PackageInfo | null;
  onSubmit: (badgeName: string) => void;
  isLoading: boolean;
}

const AddBadgeModal = ({ isOpen, onClose, packageInfo, onSubmit, isLoading }: AddBadgeModalProps) => {
  const [badgeName, setBadgeName] = useState("")
  const [validationError, setValidationError] = useState("")

  if (!isOpen) return null

  const validateBadgeName = (name: string): string => {
    if (!name.trim()) {
      return "Badge name is required"
    }
    if (name.trim().length < 3) {
      return "Badge name must be at least 3 characters long"
    }
    if (name.trim().length > 50) {
      return "Badge name must be less than 50 characters"
    }
    if (!/^[a-zA-Z0-9\s\-_]+$/.test(name.trim())) {
      return "Badge name can only contain letters, numbers, spaces, hyphens, and underscores"
    }
    return ""
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBadgeName(value)
    setValidationError(validateBadgeName(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateBadgeName(badgeName)
    if (error) {
      setValidationError(error)
      return
    }
    if (badgeName.trim()) {
      onSubmit(badgeName.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in zoom-in-95 duration-200 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Add Badge to Package
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
              Badge Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={badgeName}
              onChange={handleInputChange}
              placeholder="e.g., Sky King Coder, Master Problem Solver"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                validationError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
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
              Enter a unique badge name (3-50 characters, letters, numbers, spaces, hyphens, underscores only)
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-2 border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Each badge can only be assigned to one package. Once assigned, this badge will be exclusive to this package.</span>
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
              disabled={isLoading || !badgeName.trim() || !!validationError}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Adding Badge...
                </>
              ) : (
                <>
                  <Award className="w-4 h-4 mr-2" />
                  Add Badge
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBadgeModal