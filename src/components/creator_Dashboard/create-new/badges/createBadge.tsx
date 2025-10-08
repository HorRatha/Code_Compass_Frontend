"use client"

import { useState, useEffect, ChangeEvent, FormEvent} from "react"
import Image from "next/image"
import { useCreateBadgeMutation } from "@/lib/services/creator-dashboard/badge/createBadgeApi"

// Define proper interfaces
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
  variant?: "default" | "outline" | "ghost" | "danger"
  size?: "default" | "sm" | "lg"
}

interface AlertProps {
  children: React.ReactNode
  variant?: "default" | "success" | "error" | "warning"
  className?: string
}

interface NotificationProps {
  message: string
  onClose: () => void
}

interface FormData {
  name: string
  description: string
  icon_url: string
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
  onClick,
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform active:scale-95"

  const variants = {
    default: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
    outline: "border-2 border-input hover:border-primary hover:bg-primary/10 backdrop-blur-sm hover:text-primary text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    danger: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg",
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
      {...props}
    >
      {children}
    </button>
  )
}

const Alert = ({ children, variant = "default", className = "" }: AlertProps) => {
  const variants = {
    default: "bg-primary/10 border-primary/20 text-primary",
    success: "bg-chart-3/10 border-chart-3/20 text-chart-3",
    error: "bg-destructive/10 border-destructive/20 text-destructive",
    warning: "bg-chart-4/10 border-chart-4/20 text-chart-4",
  }

  return (
    <div className={`border rounded-xl p-4 text-sm backdrop-blur-sm ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

// Success notification component
const SuccessNotification = ({ message, onClose }: NotificationProps) => (
  <Alert variant="success" className="mb-6">
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
        className="text-chart-3 hover:text-chart-3/80 transition-colors"
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
  </Alert>
)

// Error notification component
const ErrorNotification = ({ message, onClose }: NotificationProps) => (
  <Alert variant="error" className="mb-6">
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
  </Alert>
)

function CreateBadgeForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    icon_url: "",
  })

  const [iconFile, setIconFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string>("")
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload")
  const [notification, setNotification] = useState<NotificationState | null>(null)
  const [imageError, setImageError] = useState(false)

  // Use the mutation hook
  const [createBadge, { isLoading }] = useCreateBadgeMutation()

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleIconUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setNotification({
          type: 'error',
          message: 'Please select an image file (JPG, PNG, GIF, SVG)'
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setNotification({
          type: 'error',
          message: 'File size should be less than 5MB'
        })
        return
      }

      setIconFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string || "")
      }
      reader.readAsDataURL(file)
    }
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon_url: "",
    })
    setIconFile(null)
    setIconPreview("")
    setImageError(false)

    // Reset file input
    const fileInput = document.getElementById("iconFile") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      let iconUrl = formData.icon_url

      // If using file upload, convert to base64 (temporary solution)
      if (uploadMethod === "upload" && iconFile) {
        iconUrl = await convertToBase64(iconFile)
      }

      // Validate we have an icon URL
      if (!iconUrl) {
        setNotification({
          type: 'error',
          message: 'Please provide an icon (either upload a file or enter a URL)'
        })
        return
      }

      // Validate form fields
      if (!formData.name.trim()) {
        setNotification({
          type: 'error',
          message: 'Please enter a badge name'
        })
        return
      }

      if (!formData.description.trim()) {
        setNotification({
          type: 'error',
          message: 'Please enter a badge description'
        })
        return
      }

      console.log("Submitting badge data:", {
        name: formData.name.trim(),
        description: formData.description.trim(),
        icon_url: iconUrl,
      })

      // Call the API
      const result = await createBadge({
        name: formData.name.trim(),
        description: formData.description.trim(),
        icon_url: iconUrl,
      }).unwrap()

      console.log("Badge created successfully:", result)

      // Show success notification with status
      setNotification({
        type: 'success',
        message: `Badge "${result.name}" created successfully! Status: ${result.status}`
      })

      // Reset form on success
      resetForm()
    } catch (err) {
      console.error("Failed to create badge:", err)
      
      const error = err as ApiError
      // Show error notification
      const errorMessage = error?.data?.message || error?.message || "Failed to create badge. Please try again."
      setNotification({
        type: 'error',
        message: errorMessage
      })
    }
  }

  const handleUploadMethodChange = (method: "upload" | "url") => {
    setUploadMethod(method)
    setImageError(false)
    // Clear the other method's data
    if (method === "upload") {
      setFormData({ ...formData, icon_url: "" })
    } else {
      setIconFile(null)
      setIconPreview("")
      const fileInput = document.getElementById("iconFile") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageError(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Create New Badge</h2>
        <p className="text-muted-foreground text-lg">Design and create your custom achievement badge</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Badge Name */}
            <div className="space-y-3">
              <Label htmlFor="badgeName">Badge Name *</Label>
              <Input
                id="badgeName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Expert Developer"
                required
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="badgeDescription">Description *</Label>
              <Textarea
                id="badgeDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this badge represents and how to earn it..."
                required
                maxLength={500}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{formData.description.length}/500 characters</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Icon Upload Method Toggle */}
            <div className="space-y-4">
              <Label htmlFor="uploadMethod">Icon Method *</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="upload"
                    checked={uploadMethod === "upload"}
                    onChange={(e) => handleUploadMethodChange(e.target.value as "upload" | "url")}
                    className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm font-medium">Upload File</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="url"
                    checked={uploadMethod === "url"}
                    onChange={(e) => handleUploadMethodChange(e.target.value as "upload" | "url")}
                    className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm font-medium">Enter URL</span>
                </label>
              </div>
            </div>

            {/* Icon Upload/URL Section */}
            {uploadMethod === "upload" ? (
              <div className="space-y-4">
                <Label htmlFor="iconFile">Upload Icon *</Label>
                <Input
                  id="iconFile"
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <p className="text-xs text-muted-foreground">Accepted formats: JPG, PNG, GIF, SVG (Max 5MB)</p>
                {iconPreview && (
                  <div className="bg-muted/30 rounded-xl p-4 border border-border">
                    <Label htmlFor="preview" className="block mb-3 font-semibold">Preview</Label>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={iconPreview}
                          alt="Badge icon preview"
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-xl border-2 border-border shadow-lg"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">{iconFile?.name}</p>
                        <p>Size: {iconFile ? (iconFile.size / 1024).toFixed(1) + " KB" : ""}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Label htmlFor="iconUrl">Icon URL *</Label>
                <Input
                  id="iconUrl"
                  value={formData.icon_url}
                  onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                  placeholder="https://example.com/badge-icon.png"
                  type="url"
                />
                {formData.icon_url && (
                  <div className="bg-muted/30 rounded-xl p-4 border border-border">
                    <Label htmlFor="urlPreview" className="block mb-3 font-semibold">Preview</Label>
                    <div className="relative w-20 h-20">
                      {!imageError ? (
                        <Image
                          src={formData.icon_url}
                          alt="Badge icon preview"
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-xl border-2 border-border shadow-lg"
                          onError={handleImageError}
                          onLoad={handleImageLoad}
                        />
                      ) : (
                        <div className="w-20 h-20 flex items-center justify-center rounded-xl border-2 border-border shadow-lg bg-muted text-muted-foreground">
                          <span className="text-xs text-center px-2">Invalid URL</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-border">
          <Button onClick={handleSubmit} className="w-full text-lg py-4" size="lg" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Badge...</span>
              </div>
            ) : (
              "Create Badge"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateBadgeForm