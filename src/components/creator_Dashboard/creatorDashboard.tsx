"use client"

import React, { useState, useMemo, ReactNode } from "react"
import { Plus, Code, Award, Package, Sparkles, Filter } from "lucide-react"
import CreateBadgeForm from "./create-new/badges/createBadge"
import CreatePackageForm from "./create-new/packages/createPackage"
import CreateProblemForm from "./create-new/problems/createProblem"
import AllItemsTable from "./filter-table/AllItemsTable"
import { useGetMyProblemsQuery } from "@/lib/services/creator-dashboard/problem/displayAllProblemsApi"
import { useGetAllBadgesByAuthorQuery } from "@/lib/services/creator-dashboard/badge/displayAllBadgesApi"
import { useGetAllPackagesByAuthorQuery } from "@/lib/services/creator-dashboard/package/displayAllPackageApi"

// Define filter type
type FilterType = "all" | "problem" | "badge" | "package"

// Define base API response types that match what your hooks return
interface BaseApiItem {
  id: string | number;
  name?: string;
  title?: string;
  description?: string;
}

interface ApiProblem extends BaseApiItem {
  title: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
  hints?: string[];
  testCases?: string;
  expectedOutput?: string;
  coin?: number;
  star?: string;
  bestMemoryUsage?: number;
  bestTimeExecution?: number;
}

interface ApiBadge extends BaseApiItem {
  name: string;
  description?: string;
  imageUrl?: string;
  criteria?: string;
}

interface ApiPackage extends BaseApiItem {
  name: string;
  description?: string;
  price?: number;
  problems?: string[];
  badges?: string[];
}

// Define a compatible EditingProblem type based on what CreateProblemForm expects
interface EditingProblem {
  id?: string;
  title?: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
  hints?: string[];
  testCases?: string;
  expectedOutput?: string;
  coin?: number;
  star?: string;
  bestMemoryUsage?: number;
  bestTimeExecution?: number;
}

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogTriggerProps {
  children: ReactNode;
  onClick?: () => void;
}

interface DialogContentProps {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  onValueChange?: (value: string) => void;
  onClose?: () => void;
}

// Define types that match what AllItemsTable expects (with id as number)
interface Problem {
  id: number;
  title: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
  hints?: string[];
  testCases?: string;
  expectedOutput?: string;
  coin?: number;
  star?: string;
  bestMemoryUsage?: number;
  bestTimeExecution?: number;
}

interface Badge {
  id: number;
  name: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  criteria?: string;
}

interface Package {
  id: number;
  name: string;
  title?: string;
  description?: string;
  price?: number;
  problems?: string[];
  badges?: string[];
}

// Extended types for internal use with type discrimination
interface TableProblem extends Problem {
  type: 'problem';
}

interface TableBadge extends Badge {
  type: 'badge';
  title: string; // Make title required for TableBadge
}

interface TablePackage extends Package {
  type: 'package';
  title: string; // Make title required for TablePackage
}

type TableItem = TableProblem | TableBadge | TablePackage;

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
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants: Record<ButtonProps["variant"] & string, string> = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  }

  const sizes: Record<ButtonProps["size"] & string, string> = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant || "default"]} ${sizes[size || "default"]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "", onClick }: CardProps) => (
  <div
    className={`rounded-2xl border border-border bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

// const SelectValue = ({ children, placeholder }: { children?: React.ReactNode; placeholder?: string }) => (
//   <span className="text-muted-foreground">
//     {children || placeholder}
//   </span>
// )

// const SelectContent = ({
//   children,
//   onValueChange,
//   onClose,
// }: { children: React.ReactNode; onValueChange?: (value: string) => void; onClose?: () => void }) => (
//   <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover/95 backdrop-blur-md shadow-xl">
//     <div className="p-1">
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
//             onValueChange, onClose
//           })
//         }
//         return child
//       })}
//     </div>
//   </div>
// )

// const SelectItem = ({
//   value,
//   children,
//   onValueChange,
//   onClose,
// }: SelectItemProps) => (
//   <div
//     className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
//     onClick={() => {
//       onValueChange?.(value)
//       onClose?.()
//     }}
//   >
//     {children}
//   </div>
// )

const CardHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-2 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-bold leading-none tracking-tight text-card-foreground ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
)

const CardContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

const Dialog = ({ children, open, onOpenChange }: DialogProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === DialogTrigger) {
            return React.cloneElement(child as React.ReactElement<DialogTriggerProps>, {
              onClick: () => handleOpenChange(true),
            })
          } else if (child.type === DialogContent) {
            return isOpen
              ? React.cloneElement(child as React.ReactElement<DialogContentProps>, {
                  onClose: () => handleOpenChange(false),
                })
              : null
          }
        }
        return child
      })}
    </>
  )
}

const DialogTrigger = ({ children, onClick }: DialogTriggerProps) => <div onClick={onClick}>{children}</div>

const DialogContent = ({ children, onClose, className = "" }: DialogContentProps) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
    onClick={onClose}
  >
    <div
      className={`bg-background/95 backdrop-blur-lg rounded-xl shadow-2xl max-w-lg w-full border ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  </div>
)

// Helper function to convert string IDs to numbers safely
const convertIdToNumber = (id: string | number): number => {
  if (typeof id === 'number') return id;
  const num = parseInt(id, 10);
  return isNaN(num) ? 0 : num;
}

export default function CreatorDashboard() {
  const { data: problems = [], isLoading: isLoadingProblems } = useGetMyProblemsQuery()
  const { data: badges = [], isLoading: isLoadingBadges } = useGetAllBadgesByAuthorQuery()
  const { data: packages = [], isLoading: isLoadingPackages } = useGetAllPackagesByAuthorQuery()

  const allItems = useMemo(() => {
    const problemItems: TableItem[] = (problems as unknown[]).map((p: unknown) => { 
      const problem = p as ApiProblem;
      return {
        ...problem,
        id: convertIdToNumber(problem.id),
        type: 'problem' as const,
        title: problem.title || problem.name || 'Untitled Problem'
      }
    })
    
    const badgeItems: TableItem[] = (badges as unknown[]).map((b: unknown) => { 
      const badge = b as ApiBadge;
      return {
        ...badge,
        id: convertIdToNumber(badge.id),
        type: 'badge' as const,
        name: badge.name || 'Untitled Badge',
        title: badge.name || 'Untitled Badge'
      }
    })
    
    const packageItems: TableItem[] = (packages as unknown[]).map((pkg: unknown) => { 
      const packageItem = pkg as ApiPackage;
      return {
        ...packageItem,
        id: convertIdToNumber(packageItem.id),
        type: 'package' as const,
        name: packageItem.name || 'Untitled Package',
        title: packageItem.name || 'Untitled Package'
      }
    })
    
    return [...problemItems, ...badgeItems, ...packageItems]
  }, [problems, badges, packages])

  const [filter, setFilter] = useState<FilterType>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProblem, setEditingProblem] = useState<EditingProblem | undefined>(undefined)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // const [isBadgeDialogOpen, setIsBadgeDialogOpen] = useState(false)
  // const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false)

  const itemsPerPage = 5

  const filteredItems = useMemo(() => {
    if (filter === "all") return allItems
    return allItems.filter((item) => item.type === filter)
  }, [allItems, filter])

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  // Convert TableItem back to the expected types for AllItemsTable
  const convertToExpectedType = (item: TableItem): Problem | Badge | Package => {
    // Remove the 'type' property and return the base object
    const { type, ...baseItem } = item;
    return baseItem as Problem | Badge | Package;
  }

  // Create handlers that match what AllItemsTable expects
  const openEditDialog = (item: Problem | Badge | Package) => {
    // Check if it's a problem item and has the required properties
    if ('title' in item && 'difficulty' in item) {
      const problemItem = item as Problem;
      const editingProblem: EditingProblem = {
        id: problemItem.id?.toString(),
        title: problemItem.title,
        description: problemItem.description,
        difficulty: problemItem.difficulty,
        tags: problemItem.tags,
      };
      setEditingProblem(editingProblem);
      setIsEditDialogOpen(true);
    }
    // Handle other item types if needed
  }

  const handleDelete = (item: Problem | Badge | Package) => {
    console.log('Delete item:', item)
    // Add your delete logic here
  }

  // Handler for when forms are submitted successfully
  const handleProblemSubmit = (formData: unknown) => {
    console.log("Problem created/updated:", formData)
    setIsCreateDialogOpen(false)
    // You might want to refetch problems here
  }

  const handleEditProblemSubmit = (formData: unknown) => {
    console.log("Problem updated:", formData)
    setIsEditDialogOpen(false)
    setEditingProblem(undefined)
    // You might want to refetch problems here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-slate-900 dark:to-black text-gray-900 dark:text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 float">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Creator Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto px-4 leading-relaxed">
            Craft amazing coding problems, design achievement badges, and create comprehensive learning packages with
            our modern creator tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-semibold text-white/90">Active</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white/80 text-sm font-medium tracking-wide uppercase">Total Problems</p>
                <p className="text-5xl font-bold text-white tracking-tight">
                  {isLoadingProblems ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {problems.length}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-semibold text-white/90">Active</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white/80 text-sm font-medium tracking-wide uppercase">Total Badges</p>
                <p className="text-5xl font-bold text-white tracking-tight">
                  {isLoadingBadges ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {badges.length}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full w-2/3 animate-pulse" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-semibold text-white/90">Active</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white/80 text-sm font-medium tracking-wide uppercase">Total Packages</p>
                <p className="text-5xl font-bold text-white tracking-tight">
                  {isLoadingPackages ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {packages.length}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full w-4/5 animate-pulse" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Top Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-blue-300 dark:hover:border-blue-600 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create New Problem</CardTitle>
                  <CardDescription>Craft engaging coding challenges for learners</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:shadow-lg" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Problem
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <CreateProblemForm onSubmit={handleProblemSubmit} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-yellow-300 dark:hover:border-yellow-600 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Create New Badge</CardTitle>
                  <CardDescription>Design beautiful achievement badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:shadow-lg" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Badge
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <CreateBadgeForm />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Card className="cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-purple-300 dark:hover:border-purple-600 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Create New Package</CardTitle>
                  <CardDescription>Bundle problems and badges together</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:shadow-lg" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Package
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <CreatePackageForm />
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <CreateProblemForm 
              onSubmit={handleEditProblemSubmit} 
              editingProblem={editingProblem} 
            />
          </DialogContent>
        </Dialog>

        <div className="flex flex-wrap gap-3 justify-start items-start">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Filter className="w-4 h-4 mr-2" />
            All
          </Button>
          <Button
            variant={filter === "problem" ? "default" : "outline"}
            onClick={() => setFilter("problem")}
            className={
              filter === "problem" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Code className="w-4 h-4 mr-2" />
            Problems
          </Button>
          <Button
            variant={filter === "badge" ? "default" : "outline"}
            onClick={() => setFilter("badge")}
            className={
              filter === "badge" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Award className="w-4 h-4 mr-2" />
            Badges
          </Button>
          <Button
            variant={filter === "package" ? "default" : "outline"}
            onClick={() => setFilter("package")}
            className={
              filter === "package" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary"
            }
          >
            <Package className="w-4 h-4 mr-2" />
            Packages
          </Button>
        </div>

        <Card className="shadow-2xl border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-2xl border-b border-gray-200/50 dark:border-gray-700/50">
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              {filter === "all" && "All Items"}
              {filter === "problem" && "Problems"}
              {filter === "badge" && "Badges"}
              {filter === "package" && "Packages"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Manage your created content and track performance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <AllItemsTable 
              items={paginatedItems.map(item => convertToExpectedType(item))} 
              filter={filter} 
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}