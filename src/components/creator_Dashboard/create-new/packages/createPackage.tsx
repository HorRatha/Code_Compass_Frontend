"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent, ReactNode } from "react"
import { useCreatePackageMutation } from "@/lib/services/creator-dashboard/package/createPackageApi"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = ({ className = "", type = "text", ...props }: InputProps) => (
  <input
    type={type}
    className={`flex h-12 w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md ${className}`}
    {...props}
  />
)

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

const Textarea = ({ className = "", ...props }: TextareaProps) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md resize-none ${className}`}
    {...props}
  />
)

interface LabelProps {
  children: ReactNode
  htmlFor?: string
  className?: string
}

const Label = ({ children, htmlFor, className = "" }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-semibold text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm"
}

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform "

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-input hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 rounded-lg text-sm",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Select Components
interface SelectProps {
  children: ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

interface SelectContextProps {
  selectedValue: string
  onValueChange: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextProps | undefined>(undefined)

const Select = ({ children, value = "", onValueChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  const contextValue: SelectContextProps = {
    selectedValue,
    onValueChange: handleValueChange,
    isOpen,
    setIsOpen,
  }

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps {
  children?: ReactNode
}

const SelectTrigger = ({ }: SelectTriggerProps) => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("SelectTrigger must be used within a Select component")
  }

  const { selectedValue, isOpen, setIsOpen } = context

  return (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className={selectedValue ? "text-foreground" : "text-muted-foreground"}>
        {selectedValue || "Select difficulty level..."}
      </span>
      <svg
        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

interface SelectValueProps {
  children?: ReactNode
  placeholder?: string
}

const SelectValue = ({ children, placeholder }: SelectValueProps) => (
  <span className="text-muted-foreground">{children || placeholder}</span>
)

interface SelectContentProps {
  children: ReactNode
}

const SelectContent = ({ children }: SelectContentProps) => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("SelectContent must be used within a Select component")
  }

  const { isOpen } = context

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-popover/95 backdrop-blur-md shadow-2xl animate-in">
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}

interface SelectItemProps {
  value: string
  children: ReactNode
}

const SelectItem = ({ value, children }: SelectItemProps) => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("SelectItem must be used within a Select component")
  }

  const { onValueChange } = context

  return (
    <div
      className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-foreground outline-none hover:bg-primary/20 hover:text-primary transition-colors duration-200"
      onClick={() => onValueChange(value)}
    >
      {children}
    </div>
  )
}

// Notification Components
interface NotificationProps {
  message: string
  onClose: () => void
}

// Success notification component
const SuccessNotification = ({ message, onClose }: NotificationProps) => (
  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-sm backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-green-600 hover:text-green-800 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
)

// Error notification component
const ErrorNotification = ({ message, onClose }: NotificationProps) => (
  <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-destructive hover:text-destructive/80 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
)

interface FormData {
  name: string
  description: string
  problems: string
  badges: string
  difficulty: string
}

interface NotificationState {
  type: 'success' | 'error'
  message: string
}

interface ApiError {
  data?: {
    message?: string
  }
  message?: string
}

interface PackageResult {
  name: string
  status: string
}

interface CreatePackageFormProps {
  onSuccess?: (result: PackageResult) => void
}

function CreatePackageForm({ onSuccess }: CreatePackageFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    problems: "",
    badges: "",
    difficulty: "",
  })

  const [notification, setNotification] = useState<NotificationState | null>(null)

  const [createPackage, { isLoading }] = useCreatePackageMutation()

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.description.trim()) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields.'
      })
      return
    }

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
      }

      const result = await createPackage(payload).unwrap()

      // Show success notification with status
      setNotification({
        type: 'success',
        message: `Package "${result.name}" created successfully! Status: ${result.status}`
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        problems: "",
        badges: "",
        difficulty: "",
      })

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result)
      }
    } catch (err) {
      console.error("Failed to create package:", err)
      
      const error = err as ApiError
      // Show error notification
      const errorMessage = error?.data?.message || error?.message || "Failed to create package. Please try again."
      setNotification({
        type: 'error',
        message: errorMessage
      })
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id.replace('package', '').toLowerCase()]: value
    }))
  }

  const handleDifficultyChange = (value: string) => {
    setFormData(prev => ({ ...prev, difficulty: value }))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Create New Package</h2>
        <p className="text-muted-foreground text-lg">Fill in the details below to create a new learning package</p>
      </div>

      {/* Notifications */}
      {notification?.type === 'success' && (
        <SuccessNotification
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {notification?.type === 'error' && (
        <ErrorNotification
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="glass rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="packageName">Package Name *</Label>
            <Input
              id="packageName"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter a descriptive package name"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="packageDescription">Package Description *</Label>
            <Textarea
              id="packageDescription"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what this package covers, its objectives, and target audience"
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="packageBadges">Badges (Optional)</Label>
              <Textarea
                id="packageBadges"
                value={formData.badges}
                onChange={handleInputChange}
                placeholder="List any badges or achievements that can be earned from this package"
                className="min-h-[100px]"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="packageDifficulty">Difficulty Level (Optional)</Label>
              <Select value={formData.difficulty} onValueChange={handleDifficultyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">🟢 Beginner - Perfect for newcomers</SelectItem>
                  <SelectItem value="Intermediate">🟡 Intermediate - Some experience required</SelectItem>
                  <SelectItem value="Advanced">🔴 Advanced - For experienced learners</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <Button
            onClick={handleSubmit}
            className="w-full text-lg py-4"
            disabled={isLoading || !formData.name.trim() || !formData.description.trim()}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating Package...</span>
              </div>
            ) : (
              "Create Package"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePackageForm