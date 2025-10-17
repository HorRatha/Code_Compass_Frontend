import React, { useEffect, useState, ReactNode } from "react"
import { Edit, Trash2, RefreshCw, CheckCircle, Clock, AlertCircle, Shield, Award, X } from "lucide-react"
import Image from "next/image"
import { useGetAllBadgesByAuthorQuery } from "@/lib/services/creator-dashboard/badge/displayAllBadgesApi"
import { useDeleteBadgeMutation } from "@/lib/services/creator-dashboard/badge/deleteBadgesApi"
import { useModifyBadgeMutation } from "@/lib/services/creator-dashboard/badge/modifyBadgeApi"

// Define Badge interface
interface BadgeItem {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  created_at: string;
  is_deleted: boolean;
  is_verified: boolean;
  author: string;
  status: "PENDING" | "APPROVED";
}

interface BadgesTableProps {
  onEdit?: (item: BadgeItem) => void;
  onDelete?: (item: BadgeItem) => void;
}

interface NotificationState {
  type: string;
  message: string;
}

interface DeleteModalState {
  isOpen: boolean;
  badge: BadgeItem | null;
}

interface EditModalState {
  isOpen: boolean;
  badge: BadgeItem | null;
}

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
}

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableBodyProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

interface NotificationComponentProps {
  type: string;
  message: string;
  onClose: () => void;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  badgeName: string;
  isDeleting: boolean;
}

interface EditModalProps {
  isOpen: boolean;
  badge: BadgeItem | null;
  onSave: (id: number, data: { name: string; description: string; icon_url: string }) => void;
  onCancel: () => void;
  isUpdating: boolean;
}

interface StatusBadgeProps {
  status: "APPROVED" | "PENDING";
}

interface VerificationBadgeProps {
  isVerified: boolean;
}

interface BadgeIconProps {
  iconUrl: string;
  name: string;
}

interface ApiError {
  data?: {
    message?: string;
  };
  message?: string;
}

// Component implementations
const Badge = ({ children, className = "" }: BadgeProps) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${className}`}
  >
    {children}
  </span>
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
      {...props}
    >
      {children}
    </button>
  )
}

const Table = ({ children, className = "" }: TableProps) => (
  <div className="w-full overflow-auto rounded-xl border border-border">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
)

const TableHeader = ({ children }: TableHeaderProps) => (
  <thead className="bg-muted/50 [&_tr]:border-b [&_tr]:border-border">{children}</thead>
)

const TableBody = ({ children }: TableBodyProps) => (
  <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
)

const TableRow = ({ children, className = "" }: TableRowProps) => (
  <tr className={`border-b border-border transition-colors hover:bg-muted/30 ${className}`}>{children}</tr>
)

const TableHead = ({ children, className = "" }: TableHeadProps) => (
  <th
    className={`h-14 px-6 text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
  >
    {children}
  </th>
)

const TableCell = ({ children, className = "", colSpan }: TableCellProps) => (
  <td className={`p-6 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} colSpan={colSpan}>
    {children}
  </td>
)

// Notification component
const Notification = ({ type, message, onClose }: NotificationComponentProps) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
               type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
               <Clock className="w-5 h-5" />

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 transition-all duration-300 transform animate-in slide-in-from-right`}>
      {icon}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded p-1 text-xl leading-none">
        ×
      </button>
    </div>
  )
}

// Edit Modal Component
const EditModal = ({ isOpen, badge, onSave, onCancel, isUpdating }: EditModalProps) => {
  const [formData, setFormData] = useState({
    name: badge?.name || '',
    description: badge?.description || '',
    icon_url: badge?.icon_url || ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (badge) {
      setFormData({
        name: badge.name,
        description: badge.description,
        icon_url: badge.icon_url
      })
      setErrors({})
    }
  }, [badge])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Badge name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Badge name must be at least 3 characters'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }
    
    if (!formData.icon_url.trim()) {
      newErrors.icon_url = 'Icon URL is required'
    } else if (!formData.icon_url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      newErrors.icon_url = 'Please enter a valid image URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm() && badge) {
      onSave(badge.id, formData)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen || !badge) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-6 transform transition-all max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Edit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Badge
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            disabled={isUpdating}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Badge Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
              placeholder="Enter badge name"
              disabled={isUpdating}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.description 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors resize-none`}
              placeholder="Enter badge description"
              disabled={isUpdating}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon URL *
            </label>
            <input
              type="url"
              value={formData.icon_url}
              onChange={(e) => handleChange('icon_url', e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.icon_url 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
              placeholder="https://example.com/image.png"
              disabled={isUpdating}
            />
            {errors.icon_url && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.icon_url}
              </p>
            )}
            {formData.icon_url && !errors.icon_url && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
               <Image
  src={formData.icon_url || '/fallback.png'}
  alt="Preview"
  width={64}   // required
  height={64}  // required
  className="w-16 h-16 rounded-lg object-cover"
  onError={(e) => {
    (e.target as HTMLImageElement).style.display = 'none';
  }}
/>

              </div>
            )}
          </div>
          
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isUpdating}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              type="submit"
              disabled={isUpdating}
              className="min-w-[120px] bg-[#CCF301] border-[#CCF301] text-[#0b131c] hover:bg-[#CCF301] hover:opacity-90"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Confirmation Modal Component
const ConfirmationModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  badgeName, 
  isDeleting 
}: ConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Delete Badge
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">&quot;{badgeName}&quot;</span>? This action cannot be undone.
        </p>
        
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="min-w-[100px]"
          >
            {isDeleting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Status badge component
const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    APPROVED: {
      className: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      icon: <CheckCircle className="w-3 h-3 mr-1" />
    },
    PENDING: {
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      icon: <Clock className="w-3 h-3 mr-1" />
    }
  }

  const config = statusConfig[status] || statusConfig.PENDING

  return (
    <Badge className={config.className}>
      {config.icon}
      {status}
    </Badge>
  )
}

// Verification badge component
const VerificationBadge = ({ isVerified }: VerificationBadgeProps) => {
  if (!isVerified) return null
  
  return (
    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 ml-2">
      <Shield className="w-3 h-3 mr-1" />
      Verified
    </Badge>
  )
}

// Badge icon component
const BadgeIcon = ({ iconUrl, name }: BadgeIconProps) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative">
      {!imageError ? (
        <Image
          src={iconUrl}
          alt={name}
          width={40}
          height={40}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <Award className="w-6 h-6" />
        </div>
      )}
    </div>
  )
}

export default function BadgesTable({ onEdit, onDelete }: BadgesTableProps) {
  const { data: badges, error, isLoading, refetch } = useGetAllBadgesByAuthorQuery()
  const [deleteBadge, { isLoading: isDeleting }] = useDeleteBadgeMutation()
  const [modifyBadge, { isLoading: isModifying }] = useModifyBadgeMutation()
  const [notification, setNotification] = useState<NotificationState | null>(null)
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    badge: null
  })
  const [editModal, setEditModal] = useState<EditModalState>({
    isOpen: false,
    badge: null
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Pagination calculations
  const totalPages = Math.ceil((badges?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBadges = badges?.slice(startIndex, endIndex) || []

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-6 mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2"
        >
          Previous
        </Button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500 dark:text-gray-400">
                {page}
              </span>
            )
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(page as number)}
              className={`min-w-[2.5rem] px-3 py-2 ${
                currentPage === page 
                  ? 'bg-[#CCF301] border-[#CCF301] text-[#0b131c] hover:bg-[#CCF301] hover:opacity-90 font-bold' 
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-[#0b131c] dark:text-gray-300'
              }`}
            >
              {page}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2"
        >
          Next
        </Button>
      </div>
    )
  }

  // Show notification for 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleRefresh = () => {
    refetch()
    setNotification({
      type: 'info',
      message: 'Refreshing badges...'
    })
  }

  const handleEditClick = (badge: BadgeItem) => {
    setEditModal({
      isOpen: true,
      badge: badge
    })
  }

  const handleEditSave = async (id: number, data: { name: string; description: string; icon_url: string }) => {
    try {
      await modifyBadge({ id, data }).unwrap()
      
      setNotification({
        type: 'success',
        message: 'Badge updated successfully!'
      })
      
      setEditModal({ isOpen: false, badge: null })
      
      if (onEdit && editModal.badge) {
        onEdit({ ...editModal.badge, ...data })
      }
      
      setTimeout(() => {
        refetch()
      }, 500)
      
    } catch (err) {
      const error = err as ApiError
      const errorMessage = error?.data?.message || 
                          error?.message || 
                          'Failed to update badge. Please try again.'
      
      setNotification({
        type: 'error',
        message: errorMessage
      })
      
      console.error('Update badge error:', err)
    }
  }

  const handleEditCancel = () => {
    setEditModal({ isOpen: false, badge: null })
  }

  const handleDeleteClick = (badge: BadgeItem) => {
    setDeleteModal({
      isOpen: true,
      badge: badge
    })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.badge) return

    try {
      await deleteBadge(deleteModal.badge.id).unwrap()
      
      setNotification({
        type: 'success',
        message: `Badge "${deleteModal.badge.name}" has been deleted successfully!`
      })
      
      setDeleteModal({ isOpen: false, badge: null })
      
      if (onDelete) {
        onDelete(deleteModal.badge)
      }
      
      setTimeout(() => {
        refetch()
      }, 500)
      
    } catch (err) {
      const error = err as ApiError
      const errorMessage = error?.data?.message || 
                          error?.message || 
                          'Failed to delete badge. Please try again.'
      
      setNotification({
        type: 'error',
        message: errorMessage
      })
      
      console.error('Delete badge error:', err)
      
      setDeleteModal({ isOpen: false, badge: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, badge: null })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        <span className="text-gray-600 dark:text-gray-300">Loading badges...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      
      <EditModal
        isOpen={editModal.isOpen}
        badge={editModal.badge}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
        isUpdating={isModifying}
      />
      
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        badgeName={deleteModal.badge?.name || ''}
        isDeleting={isDeleting}
      />
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Badges ({badges?.length || 0})
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, badges?.length || 0)} of {badges?.length || 0}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
              <TableHead className="font-semibold text-gray-900 dark:text-white">Badge</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Description</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white hidden sm:table-cell">Status</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white hidden md:table-cell text-right">
                Created
              </TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBadges && paginatedBadges.length > 0 ? (
              paginatedBadges.map((badge) => (
                <TableRow
                  key={badge.id}
                  className="transition-all duration-200 group hover:bg-gray-100/30 dark:hover:bg-gray-800/30"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <BadgeIcon iconUrl={badge.icon_url} name={badge.name} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white flex items-center">
                          {badge.name}
                          <VerificationBadge isVerified={badge.is_verified} />
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          by {badge.author}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs text-gray-600 dark:text-gray-300">
                    <div className="truncate" title={badge.description}>
                      {badge.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusBadge status={badge.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right text-gray-600 dark:text-gray-300">
                    {formatDate(badge.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 p-2"
                        onClick={() => handleEditClick(badge)}
                        title="Edit badge"
                        disabled={isModifying || isDeleting}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 p-2"
                        onClick={() => handleDeleteClick(badge)}
                        title="Delete badge"
                        disabled={isDeleting || isModifying}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {error ? 'Failed to load badges' : 'No badges found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {renderPagination()}
    </div>
  )
}