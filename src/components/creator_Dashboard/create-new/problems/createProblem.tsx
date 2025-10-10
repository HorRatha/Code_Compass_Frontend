"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useCreateProblemMutation } from "@/lib/services/creator-dashboard/problem/createProblemApi"
import { useModifyProblemMutation } from "@/lib/services/creator-dashboard/problem/modifyProblemsApi"

// Type Definitions
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

interface LabelProps {
  children: React.ReactNode
  htmlFor?: string
  className?: string
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm"
}

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

interface SelectTriggerProps {
  onClick?: () => void
  selectedValue?: string
  isOpen?: boolean
  children?: React.ReactNode
}

interface SelectValueProps {
  children?: React.ReactNode
  placeholder?: string
}

interface SelectContentProps {
  children: React.ReactNode
  onValueChange?: (value: string) => void
  onClose?: () => void
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  onValueChange?: (value: string) => void
  onClose?: () => void
}

interface NotificationProps {
  type: 'success' | 'error' | 'info'
  message: string
  isVisible: boolean
  onClose: () => void
}

interface FormData {
  title: string
  hints: string[]
  testCases: string
  expectedOutput: string
  definition: string
  difficulty: string
  tags: string
  coin: number
  star: string
  bestMemoryUsage: number
  bestTimeExecution: number
}

interface NotificationState {
  isVisible: boolean
  type: 'success' | 'error' | 'info'
  message: string
}

interface Hint {
  description: string
  is_locked?: boolean
}

interface TestCase {
  stdin: string
  expected_outputs: string
}

interface EditingProblem {
  id?: string
  title?: string
  hints?: Hint[] | string[]
  test_cases?: TestCase[]
  description?: string
  difficulty?: string
  tag_names?: string[]
  coin?: number
  star?: string
  best_memory_usage?: number
  best_time_execution?: number
}

interface CreateProblemFormProps {
  onSubmit?: (data: FormData) => void
  editingProblem?: EditingProblem
  onClose?: () => void
}

// Reusable Components
const Input = ({ className = "", type = "text", ...props }: InputProps) => (
  <input
    type={type}
    className={`flex h-12 w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md ${className}`}
    {...props}
  />
)

const Textarea = ({ className = "", ...props }: TextareaProps) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md resize-none ${className}`}
    {...props}
  />
)

const Label = ({ children, htmlFor, className = "" }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-semibold text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
)

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-input hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 rounded-lg text-sm",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Select Components
const Select = ({ children, value = "", onValueChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
    setIsOpen(false)
  }

  const childrenArray = React.Children.toArray(children)
  const triggerChild = childrenArray.find(child => 
    React.isValidElement(child) && (child as React.ReactElement).type === SelectTrigger
  )
  const contentChild = childrenArray.find(child => 
    React.isValidElement(child) && (child as React.ReactElement).type === SelectContent
  )

  return (
    <div className="relative">
      {triggerChild && React.cloneElement(triggerChild as React.ReactElement<SelectTriggerProps>, {
        onClick: () => setIsOpen(!isOpen),
        selectedValue,
        isOpen,
      })}
      {isOpen && contentChild && React.cloneElement(contentChild as React.ReactElement<SelectContentProps>, {
        onValueChange: handleValueChange,
        onClose: () => setIsOpen(false),
      })}
    </div>
  )
}

const SelectTrigger = ({ onClick, selectedValue, isOpen, children }: SelectTriggerProps) => (
  <button
    type="button"
    className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card/50 backdrop-blur-sm px-4 py-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
    onClick={onClick}
  >
    <span className={selectedValue ? "text-foreground" : "text-muted-foreground"}>{selectedValue || "Select..."}</span>
    <svg
      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
    {children}
  </button>
)

const SelectValue = ({ children, placeholder }: SelectValueProps) => (
  <span className="text-muted-foreground">{children || placeholder}</span>
)

const SelectContent = ({ children, onValueChange, onClose }: SelectContentProps) => {
  const childrenArray = React.Children.toArray(children)
  
  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-popover/95 backdrop-blur-md shadow-2xl animate-in">
      <div className="p-2">
        {childrenArray.map((child, index) => {
          if (React.isValidElement(child) && (child as React.ReactElement).type === SelectItem) {
            return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
              onValueChange,
              onClose,
              key: index
            })
          }
          return child
        })}
      </div>
    </div>
  )
}

const SelectItem = ({ value, children, onValueChange, onClose }: SelectItemProps) => (
  <div
    className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-foreground outline-none hover:bg-primary/20 hover:text-primary transition-colors duration-200"
    onClick={() => {
      if (onValueChange) {
        onValueChange(value)
      }
      if (onClose) {
        onClose()
      }
    }}
  >
    {children}
  </div>
)

// Notification Component
const Notification = ({ type, message, isVisible, onClose }: NotificationProps) => {
  if (!isVisible) return null

  const styles = {
    success: {
      bg: 'bg-green-500/95 dark:bg-green-600/95',
      border: 'border-green-600 dark:border-green-500',
      text: 'text-white',
      icon: (
        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      bg: 'bg-red-500/95 dark:bg-red-600/95',
      border: 'border-red-600 dark:border-red-500',
      text: 'text-white',
      icon: (
        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-500/95 dark:bg-blue-600/95',
      border: 'border-blue-600 dark:border-blue-500',
      text: 'text-white',
      icon: (
        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  const currentStyle = styles[type] || styles.info

  return (
    <div className="fixed top-6 right-6 z-[9999] max-w-md animate-in slide-in-from-top-5 duration-300">
      <div className={`${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} border-2 rounded-xl shadow-2xl backdrop-blur-sm`}>
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {currentStyle.icon}
          </div>
          <div className="flex-1 pt-0.5">
            <p className="font-semibold text-base leading-relaxed">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity rounded-lg p-1 hover:bg-white/20"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Component
function CreateProblemForm({ onSubmit, editingProblem, onClose }: CreateProblemFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    hints: [""],
    testCases: "",
    expectedOutput: "",
    definition: "",
    difficulty: "",
    tags: "",
    coin: 20,
    star: "ZERO",
    bestMemoryUsage: 0,
    bestTimeExecution: 0.1,
  })

  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    type: 'success',
    message: ''
  })

  const [createProblem, { isLoading: isCreating }] = useCreateProblemMutation()
  const [modifyProblem, { isLoading: isModifying }] = useModifyProblemMutation()

  const isLoading = isCreating || isModifying

  useEffect(() => {
    if (editingProblem) {
      console.log('=== EDITING PROBLEM ===')
      console.log('Problem data:', editingProblem)
      
      let hints: string[] = [""]
      if (editingProblem.hints && editingProblem.hints.length > 0) {
        hints = (editingProblem.hints as Array<Hint | string>).map((h: Hint | string) => 
          typeof h === 'string' ? h : h.description || ""
        )
      }
      
      setFormData({
        title: editingProblem.title || "",
        hints: hints,
        testCases: editingProblem.test_cases?.[0]?.stdin || "",
        expectedOutput: editingProblem.test_cases?.[0]?.expected_outputs || "",
        definition: editingProblem.description || "",
        difficulty: editingProblem.difficulty || "",
        tags: editingProblem.tag_names?.join(", ") || "",
        coin: editingProblem.coin || 20,
        star: editingProblem.star || "ZERO",
        bestMemoryUsage: editingProblem.best_memory_usage || 0,
        bestTimeExecution: editingProblem.best_time_execution || 0.1,
      })
    }
  }, [editingProblem])

  useEffect(() => {
    if (notification.isVisible) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification.isVisible])

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({
      isVisible: true,
      type,
      message
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...formData.hints]
    newHints[index] = value
    setFormData({ ...formData, hints: newHints })
  }

  const addHint = () => {
    if (formData.hints.length < 3) {
      setFormData({ ...formData, hints: [...formData.hints, ""] })
    }
  }

  const removeHint = (index: number) => {
    if (formData.hints.length > 1) {
      const newHints = [...formData.hints]
      newHints.splice(index, 1)
      setFormData({ ...formData, hints: newHints })
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      [field]: field === 'coin' ? parseInt(value) || 20 : parseFloat(value) || 0
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.definition.trim() || !formData.difficulty) {
      showNotification('error', "Title, Problem Definition, and Difficulty are required")
      return
    }

    const filteredHints = formData.hints.filter((hint) => hint.trim() !== "")

    // Normalize difficulty to uppercase and ensure it's a valid type
    const normalizedDifficulty = formData.difficulty.toUpperCase() as "EASY" | "MEDIUM" | "HARD"
    
    // Normalize star rating
    const normalizedStar = formData.star as "ZERO" | "ONE" | "TWO" | "THREE"

    const apiData = {
      title: formData.title,
      description: formData.definition,
      difficulty: normalizedDifficulty,
      star: normalizedStar,
      coin: formData.coin,
      best_memory_usage: formData.bestMemoryUsage,
      best_time_execution: formData.bestTimeExecution,
      test_cases:
        formData.testCases && formData.expectedOutput
          ? [
              {
                stdin: formData.testCases,
                expected_outputs: formData.expectedOutput,
              },
            ]
          : [],
      tag_names: formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
      hints: filteredHints.map((hint) => ({
        description: hint,
        is_locked: false,
      })),
    }

    console.log("=== DEBUG: Form Submission ===")
    console.log("Is Editing:", !!editingProblem)
    console.log("Problem ID:", editingProblem?.id)
    console.log("Transformed API data:", JSON.stringify(apiData, null, 2))

    try {
      let result

      if (editingProblem && editingProblem.id) {
        console.log("Calling modifyProblem with ID:", editingProblem.id)
        const problemId = parseInt(editingProblem.id)
        result = await modifyProblem({
          problemId: problemId,
          problemData: apiData
        }).unwrap()
        
        showNotification('success', `Problem #${editingProblem.id} updated successfully!`)
        console.log("Problem updated successfully:", result)
      } else {
        console.log("Calling createProblem")
        result = await createProblem(apiData).unwrap()
        
        showNotification('success', 'Problem created successfully!')
        console.log("Problem created successfully:", result)
        
        setFormData({
          title: "",
          hints: [""],
          testCases: "",
          expectedOutput: "",
          definition: "",
          difficulty: "",
          tags: "",
          coin: 20,
          star: "ZERO",
          bestMemoryUsage: 0,
          bestTimeExecution: 0.1,
        })
      }

      if (onSubmit) {
        onSubmit(formData)
      }

      if (onClose) {
        setTimeout(() => {
          onClose()
        }, 1500)
      }

    } catch (error: unknown) {
      console.error("Error submitting problem:", error)
      
      let errorMessage = "Failed to submit problem. Please try again."
      
      if (error && typeof error === 'object' && 'data' in error) {
        const errorData = error as { data?: { message?: string } }
        if (errorData.data?.message) {
          errorMessage = errorData.data.message
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      showNotification('error', errorMessage)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {editingProblem ? `Edit Problem #${editingProblem.id}` : "Create New Problem"}
        </h2>
        <p className="text-muted-foreground">
          {editingProblem ? "Update your coding challenge" : "Design an engaging coding challenge for learners"}
        </p>
      </div>

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title">Problem Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a descriptive problem title"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="definition">Problem Definition *</Label>
              <Textarea
                id="definition"
                value={formData.definition}
                onChange={handleInputChange}
                placeholder="Describe the problem clearly and concisely..."
                required
                rows={6}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="difficulty">Difficulty *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Hints (max 3)</Label>
              {formData.hints.map((hint, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={hint}
                    onChange={(e) => handleHintChange(index, e.target.value)}
                    placeholder={`Hint ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.hints.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeHint(index)}
                      className="px-3"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              {formData.hints.length < 3 && (
                <Button type="button" variant="outline" onClick={addHint} className="w-full bg-transparent">
                  + Add Hint
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="testCases">Input Cases</Label>
              <Textarea
                id="testCases"
                value={formData.testCases}
                onChange={handleInputChange}
                placeholder="Enter input cases..."
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="expectedOutput">Expected Output</Label>
              <Textarea
                id="expectedOutput"
                value={formData.expectedOutput}
                onChange={handleInputChange}
                placeholder="Enter expected output..."
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="coin">Coin Reward</Label>
            <Input
              id="coin"
              type="number"
              value={formData.coin}
              onChange={(e) => handleNumberInputChange(e, 'coin')}
              placeholder="Coin reward (default: 20)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="star">Star Rating</Label>
            <Select value={formData.star} onValueChange={(value) => setFormData({ ...formData, star: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select star rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ZERO">Zero Stars</SelectItem>
                <SelectItem value="ONE">One Star</SelectItem>
                <SelectItem value="TWO">Two Stars</SelectItem>
                <SelectItem value="THREE">Three Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bestMemoryUsage">Best Memory Usage (MB)</Label>
            <Input
              id="bestMemoryUsage"
              type="number"
              step="0.1"
              value={formData.bestMemoryUsage}
              onChange={(e) => handleNumberInputChange(e, 'bestMemoryUsage')}
              placeholder="Memory usage (default: 0)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bestTimeExecution">Best Time Execution (s)</Label>
            <Input
              id="bestTimeExecution"
              type="number"
              step="0.01"
              value={formData.bestTimeExecution}
              onChange={(e) => handleNumberInputChange(e, 'bestTimeExecution')}
              placeholder="Time execution (default: 0.1)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="Enter tags (comma separated)"
          />
        </div>

        <div className="pt-6 border-t border-border">
          <Button type="submit" className="w-full text-lg py-4" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>{editingProblem ? 'Updating Problem...' : 'Creating Problem...'}</span>
              </div>
            ) : editingProblem ? (
              `Update Problem #${editingProblem.id}`
            ) : (
              "Create Problem"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateProblemForm