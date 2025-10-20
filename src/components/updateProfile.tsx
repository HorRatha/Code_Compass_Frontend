"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, X, Loader2, Check, AlertCircle, Upload } from "lucide-react"
import Image from "next/image"
import { UpdateUserProfileRequest, useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/lib/services/leaderboard/userProfileApi"
import { useUploadMediaFileMutation } from "@/lib/services/media/mediaApi"
import { getSession } from "next-auth/react"

export default function EditProfilePage() {
  const router = useRouter()
  const { data: userData, isLoading, error } = useGetUserProfileQuery()
  const [updateProfile] = useUpdateUserProfileMutation()
  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaFileMutation()

  const [isDarkMode, setIsDarkMode] = useState(true)
  const [formData, setFormData] = useState({
    gender: "",
    dob: "",
    bio: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    image_url: "",
  })

  const [imagePreview, setImagePreview] = useState<string>("")
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [showCropModal, setShowCropModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cropData, setCropData] = useState({ x: 0, y: 0, scale: 1 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const cropImageRef = useRef<HTMLImageElement>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(isDark)
    }

    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDarkMode)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', checkDarkMode)
    }
  }, [])

  useEffect(() => {
    if (userData) {
      setFormData({
        gender: userData.gender || "",
        dob: userData.dob || "",
        bio: (userData as any).bio || "",
        location: userData.location || "",
        website: userData.website || "",
        github: userData.github || "",
        linkedin: userData.linkedin || "",
        image_url: userData.image_url || "",
      })
      setImagePreview(userData.image_url || "")
    }
  }, [userData])

  // Auto-save functionality
  const autoSave = async (fieldName: string, value: string) => {
    if (!userData?.username) return

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    setAutoSaveStatus("saving")

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const updateBody: UpdateUserProfileRequest = {
          [fieldName]: value
        }

        await updateProfile({
          username: userData.username,
          body: updateBody,
        }).unwrap()

        setAutoSaveStatus("saved")
        setTimeout(() => setAutoSaveStatus("idle"), 2000)
      } catch (error) {
        console.error("Auto-save error:", error)
        setAutoSaveStatus("idle")
      }
    }, 1000) // Save after 1 second of no typing
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    autoSave(name, value)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
      setShowCropModal(true)
      setCropData({ x: 0, y: 0, scale: 1 })
    }
    reader.readAsDataURL(file)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY * -0.001
    setCropData(prev => ({
      ...prev,
      scale: Math.min(Math.max(1, prev.scale + delta), 3)
    }))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - cropData.x, y: e.clientY - cropData.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setCropData(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getCroppedImage = async (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const image = cropImageRef.current

      if (!ctx || !image) return

      const size = 400
      canvas.width = size
      canvas.height = size

      // Make the canvas circular
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      const containerSize = 300
      const scale = cropData.scale

      const sourceSize = containerSize / scale
      const sourceX = (image.naturalWidth / 2) - (sourceSize / 2) - (cropData.x / scale)
      const sourceY = (image.naturalHeight / 2) - (sourceSize / 2) - (cropData.y / scale)

      // Center the image in the circular canvas
      const offset = (size - size) / 2
      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        offset,
        offset,
        size,
        size
      )

      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
      }, 'image/png', 1) // Use PNG to preserve transparency
    })
  }

  const handleCropConfirm = async () => {
    if (!selectedFile) return

    try {
      setAutoSaveStatus("saving")
      const croppedBlob = await getCroppedImage()
      const croppedFile = new File([croppedBlob], selectedFile.name, { type: 'image/png' })

      const session = await getSession()
      const token = session?.accessToken

      const formData = new FormData()
      formData.append("file", croppedFile)

      const headers: HeadersInit = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("https://code-compass.devith.it.com/api/v1/medias/upload", {
        method: "POST",
        headers,
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()
      if (!result.uri) {
        throw new Error("Upload response missing uri")
      }

      setFormData((prev) => ({ ...prev, image_url: result.uri }))
      setImagePreview(result.uri)
      setShowCropModal(false)

      if (userData?.username) {
        await updateProfile({
          username: userData.username,
          body: { image_url: result.uri },
        }).unwrap()
      }

      setAutoSaveStatus("saved")
      setTimeout(() => setAutoSaveStatus("idle"), 2000)
    } catch (error) {
      console.error("Upload error:", error)
      setAutoSaveStatus("idle")
    }
  }

  const handleRemoveImage = async () => {
    setFormData((prev) => ({ ...prev, image_url: "" }))
    setImagePreview("")
    
    if (userData?.username) {
      try {
        await updateProfile({
          username: userData.username,
          body: { image_url: "" },
        }).unwrap()
      } catch (error) {
        console.error("Remove image error:", error)
      }
    }
  }

  const theme = {
    bg: isDarkMode ? 'bg-gradient-to-br from-black via-slate-900 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    card: isDarkMode ? 'bg-slate-800/50 backdrop-blur-sm border-slate-700/50' : 'bg-white/80 backdrop-blur-sm border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    input: isDarkMode ? 'bg-slate-900/50 border-slate-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
    inputFocus: isDarkMode ? 'focus:border-[#CCF301] focus:ring-[#CCF301]/20' : 'focus:border-[#0b131c] focus:ring-[#0b131c]/20',
    button: isDarkMode ? 'bg-[#CCF301] hover:bg-[#b8e600] text-black' : 'bg-[#0b131c] hover:bg-[#162333] text-white',
    accent: isDarkMode ? '#CCF301' : '#0b131c',
    shadow: isDarkMode ? 'shadow-xl shadow-black/20' : 'shadow-xl shadow-gray-200/50',
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4`} 
               style={{ borderColor: `${theme.accent} transparent ${theme.accent} ${theme.accent}` }}></div>
          <p className={theme.textSecondary}>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} flex items-center justify-center p-4`}>
        <div className={`${theme.card} border rounded-2xl p-8 max-w-md text-center`}>
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Unable to Load Profile</h2>
          <p className={`${theme.textSecondary} mb-6`}>Please try again later</p>
          <button
            onClick={() => router.push("/userpage")}
            className={`${theme.button} font-semibold py-3 px-6 rounded-xl transition-all`}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`min-h-screen ${theme.bg} ${theme.text} py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/userpage")}
                className={`${theme.textSecondary} hover:${theme.text} transition-colors`}
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Edit Profile</h1>
                <p className={`${theme.textSecondary} text-sm mt-1`}>Changes save automatically</p>
              </div>
            </div>

            {/* Auto-save indicator */}
            <div className="flex items-center gap-2">
              {autoSaveStatus === "saving" && (
                <>
                  <Loader2 size={16} className="animate-spin" style={{ color: theme.accent }} />
                  <span className={`text-sm ${theme.textSecondary}`}>Saving...</span>
                </>
              )}
              {autoSaveStatus === "saved" && (
                <>
                  <Check size={16} style={{ color: theme.accent }} />
                  <span className={`text-sm ${theme.textSecondary}`}>Saved</span>
                </>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className={`${theme.card} border rounded-2xl p-8 mb-6 ${theme.shadow}`}>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="relative w-32 h-32">
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-105`}
                       style={{ 
                         background: `linear-gradient(135deg, ${theme.accent}, transparent)`,
                         padding: '3px'
                       }}>
                    <div className={`w-full h-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview || "/placeholder.svg"}
                            alt="Profile"
                            fill
                            className="object-cover"
                            style={{ borderRadius: '50%' }}
                          />
                        </div>
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                          <Camera size={40} className={theme.textSecondary} />
                        </div>
                      )}
                    </div>
                  </div>

                  <label
                    htmlFor="image-upload"
                    className={`absolute bottom-0 right-0 ${theme.button} rounded-full p-3 cursor-pointer transition-all duration-300 hover:scale-110 ${theme.shadow}`}
                  >
                    <Camera size={18} />
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h3 className={`font-semibold text-lg mb-1 ${theme.text}`}>Profile Picture</h3>
                <p className={`text-sm ${theme.textSecondary}`}>
                  Upload a photo to personalize your profile
                </p>
                <p className={`text-xs ${theme.textSecondary} mt-1`}>
                  Max 5MB • JPG, PNG, GIF
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className={`${theme.card} border rounded-2xl p-8 ${theme.shadow} space-y-6`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender */}
              <div>
                <label htmlFor="gender" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full ${theme.input} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.inputFocus} transition-all`}
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full ${theme.input} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.inputFocus} transition-all`}
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className={`w-full ${theme.input} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.inputFocus} transition-all resize-none`}
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full ${theme.input} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.inputFocus} transition-all`}
                placeholder="City, Country"
              />
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={`w-full ${theme.input} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.inputFocus} transition-all`}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub */}
              <div>
                <label htmlFor="github" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                  GitHub
                </label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className={`w-full ${theme.input} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.inputFocus} transition-all`}
                  placeholder="username"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label htmlFor="linkedin" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className={`w-full ${theme.input} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${theme.inputFocus} transition-all`}
                  placeholder="in/yourprofile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${theme.card} border rounded-2xl p-6 max-w-md w-full ${theme.shadow}`}>
            <h3 className="text-xl font-bold mb-4">Crop Your Photo</h3>
            
            <div 
              className="relative w-[300px] h-[300px] mx-auto mb-6 rounded-full overflow-hidden cursor-move border-4"
              style={{ borderColor: theme.accent }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <Image
                ref={cropImageRef}
                src={imagePreview}
                alt="Crop preview"
                className="absolute"
                style={{
                  transform: `translate(${cropData.x}px, ${cropData.y}px) scale(${cropData.scale})`,
                  transformOrigin: 'center',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
                draggable={false}
              />
            </div>

            <p className={`text-sm ${theme.textSecondary} text-center mb-6`}>
              Scroll to zoom • Drag to reposition
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCropModal(false)
                  setImagePreview(formData.image_url)
                }}
                className={`flex-1 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} ${theme.text} font-semibold py-3 px-6 rounded-xl transition-all`}
              >
                Cancel
              </button>
              <button
                onClick={handleCropConfirm}
                disabled={autoSaveStatus === "saving"}
                className={`flex-1 ${theme.button} font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {autoSaveStatus === "saving" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}