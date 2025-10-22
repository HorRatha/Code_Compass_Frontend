import React, { useEffect } from "react"
import { Edit, Trash2, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import { useGetMyProblemsQuery, Problem } from "@/lib/services/creator-dashboard/problem/displayAllProblemsApi"
import { useModifyProblemMutation } from "@/lib/services/creator-dashboard/problem/modifyProblemsApi"
import { useDeleteProblemMutation } from "@/lib/services/creator-dashboard/problem/deletedProblemsApi"

interface ProblemsTableProps {
  showVerified?: boolean;
  showAll?: boolean;
  onEdit?: (problem: Problem) => void;
  onDelete?: (problem: Problem) => void;
}

interface NotificationState {
  type: string;
  message: string;
}

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
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
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
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

const Table = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className="w-full overflow-auto rounded-xl border border-border">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
)

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-muted/50 [&_tr]:border-b [&_tr]:border-border">{children}</thead>
)

const TableBody = ({ children }: { children: React.ReactNode }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>

const TableRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <tr className={`border-b border-border transition-colors hover:bg-muted/30 ${className}`}>{children}</tr>
)

const TableHead = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th
    className={`h-14 px-6 text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
  >
    {children}
  </th>
)

const TableCell = ({ children, className = "", colSpan }: { children: React.ReactNode; className?: string; colSpan?: number }) => (
  <td className={`p-6 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} colSpan={colSpan}>{children}</td>
)

// Notification Component
const Notification = ({ type, message, onClose }: { type: string; message: string; onClose: () => void }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-200"
  }

  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 ${colors[type as keyof typeof colors]}`}>
      {icons[type as keyof typeof icons]}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        ×
      </button>
    </div>
  )
}

function getDifficultyColor(difficulty: string | undefined): string {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700"
    case "hard":
      return "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
    default:
      return "bg-gray-600 text-white border-2 border-gray-600 uppercase tracking-wider font-semibold"
  }
}

function getStatusColor(status: string | undefined): string {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-2 border-green-300 dark:border-green-700"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-2 border-yellow-300 dark:border-yellow-700"
    case "REJECTED":
      return "bg-[#EF4444] text-white border-2 border-[#EF4444] uppercase tracking-wider"
    default:
      return "bg-gray-500 text-white border-2 border-gray-500 uppercase tracking-wider"
  }
}

export default function ProblemsTable({ 
  showVerified = true, 
  showAll = false,
  onEdit, 
  onDelete 
}: ProblemsTableProps) {
  const [notification, setNotification] = React.useState<NotificationState | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5
  
  // Fetch problems from API
  const { 
    data: allProblems = [], 
    isLoading, 
    error,
    refetch
  } = useGetMyProblemsQuery()

  // Use the API hooks with proper imports
  const [modifyProblem, modifyState] = useModifyProblemMutation()
  const [deleteProblem, deleteState] = useDeleteProblemMutation()

  // Manual filtering based on showVerified and showAll props
  const problems = React.useMemo(() => {
    if (!allProblems || !Array.isArray(allProblems)) return []
    
    if (showAll) {
      return allProblems
    }
    
    if (showVerified) {
      return allProblems.filter(problem => 
        problem.status === 'APPROVED' || problem.status === 'PENDING'
      )
    } else {
      return allProblems.filter(problem => problem.status === 'PENDING')
    }
  }, [allProblems, showVerified, showAll])

  // Pagination calculations
  const totalPages = Math.ceil((problems?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProblems = problems.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [showVerified, showAll])

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

  // Handle API response notifications - removed to prevent infinite loop
  // Notifications are now handled manually via handleRefresh and other actions

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message })
  }

  const closeNotification = () => {
    setNotification(null)
  }

  const handleRefresh = () => {
    refetch()
    showNotification('info', 'Refreshing problems...')
  }

  const handleEdit = async (problem: Problem) => {
    console.log('=== EDIT BUTTON CLICKED ===')
    console.log('Problem to edit:', problem)
    console.log('Problem ID:', problem.id)
    console.log('onEdit callback exists:', !!onEdit)
    
    try {
      if (onEdit) {
        await onEdit(problem)
        showNotification('info', `Opening editor for: ${problem.title} (ID: ${problem.id})`)
      } else {
        showNotification('info', 'Edit functionality - please implement onEdit prop')
      }
    } catch (error) {
      console.error('Edit error:', error)
      showNotification('error', 'Failed to initiate edit process')
    }
  }

  const handleDelete = async (problem: Problem) => {
    console.log('=== DELETE ATTEMPT START ===')
    console.log('Problem to delete:', problem)
    console.log('Delete function type:', typeof deleteProblem)
    
    try {
      if (!window.confirm(`Are you sure you want to delete "${problem.title}"?`)) {
        console.log('Delete cancelled by user')
        return
      }

      console.log('User confirmed deletion, proceeding...')
      console.log('Calling deleteProblem with:', { problemId: problem.id })
      
      showNotification('info', `Attempting to delete "${problem.title}"...`)
      
      const deletePromise = deleteProblem({ problemId: problem.id })
      console.log('Delete promise created:', deletePromise)
      
      const result = await deletePromise.unwrap()
      
      console.log('=== DELETE SUCCESS ===')
      console.log('Delete result:', result)
      
      showNotification('success', `Problem "${problem.title}" deleted successfully!`)
      
      refetch()
      
      if (onDelete) {
        onDelete(problem)
      }
      
    } catch (error: unknown) {
      console.log('=== DELETE ERROR DETAILS ===')
      console.log('Raw error:', error)
      console.log('Error type:', typeof error)
      
      let errorMessage = 'Failed to delete problem'
      
      if (typeof error === 'string') {
        errorMessage = error
      } else if ((error as { status?: number })?.status) {
        errorMessage = `Delete failed with status ${(error as { status: number }).status}`
        if ((error as { data?: { message?: string } })?.data?.message) {
          errorMessage += `: ${(error as { data: { message: string } }).data.message}`
        }
      } else if ((error as { message?: string })?.message) {
        errorMessage = `Delete failed: ${(error as { message: string }).message}`
      } else if (error && Object.keys(error as object).length === 0) {
        errorMessage = 'Delete API call failed - empty error response. Check network tab for details.'
      }
      
      console.log('Final error message:', errorMessage)
      showNotification('error', errorMessage)
    }
  }

  console.log('ProblemsTable render:', {
    showVerified,
    totalProblems: allProblems?.length,
    filteredProblems: problems?.length,
    hasModifyHook: typeof modifyProblem === 'function',
    hasDeleteHook: typeof deleteProblem === 'function',
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {showVerified ? 'All Problems' : 'Pending Problems'}
          </h3>
        </div>
        
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span className="text-gray-600 dark:text-gray-300">
            Loading {showAll ? 'all' : showVerified ? 'all' : 'pending'} problems...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    const getErrorMessage = (err: unknown): string => {
      if (typeof err === 'string') return err
      if ((err as { message?: string })?.message) return (err as { message: string }).message
      if ((err as { data?: { message?: string } })?.data?.message) return (err as { data: { message: string } }).data.message
      if ((err as { error?: string })?.error) return (err as { error: string }).error
      if ((err as { status?: number })?.status) return `HTTP ${(err as { status: number }).status} Error`
      return 'Unknown error occurred'
    }
    
    const errorMessage = getErrorMessage(error)
    
    if ((error as { status?: number })?.status === 401) {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {showVerified ? 'All Problems' : 'Pending Problems'}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
                  <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
                  <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-red-500 dark:text-red-400 text-lg font-semibold">
                        Authentication Required
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Your session has expired. Please log in again to view your problems.
                      </div>
                      <Button
                        onClick={() => window.location.href = '/login'}
                        className="mt-2"
                      >
                        Go to Login
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {showAll ? 'All Problems' : showVerified ? 'All Problems' : 'Pending Problems'} (Error)
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
                <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
                <TableHead className="font-semibold text-gray-900 dark:text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-red-500 dark:text-red-400">
                  Error loading problems: {errorMessage}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {showAll ? 'All Problems' : showVerified ? 'All Problems' : 'Pending Problems'} ({problems?.length || 0})
          {/* {showAll}  ({problems?.length || 0}) */}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, problems?.length || 0)} of {problems?.length || 0}
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
              <TableHead className="font-semibold text-gray-900 dark:text-white">ID</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Title</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Difficulty</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white">Tags</TableHead>
              <TableHead className="font-semibold text-gray-900 dark:text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => (
                <TableRow
                  key={problem.id}
                  className="hover:bg-gray-100/30 dark:hover:bg-gray-800/30 transition-all duration-200 group"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">{problem.id}</TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    <div>
                      <div>{problem.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {problem.coin} coins • {problem.star} stars
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {problem.difficulty ? (
                      <Badge className={`${getDifficultyColor(problem.difficulty)} shadow-md`}>
                        {problem.difficulty}
                      </Badge>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(problem.status)} shadow-md`}>
                      {problem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {problem.tag_names?.length > 0 ? (
                        problem.tag_names.slice(0, 3).map((tag, index) => (
                          <Badge 
                            key={index}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">-</span>
                      )}
                      {problem.tag_names?.length > 3 && (
                        <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          +{problem.tag_names.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 group-hover: p-2"
                        onClick={() => handleEdit(problem)}
                        disabled={modifyState.isLoading}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 group-hover: p-2"
                        onClick={() => handleDelete(problem)}
                        disabled={deleteState.isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No {showAll ? 'problems' : showVerified ? 'problems' : 'pending problems'} found
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