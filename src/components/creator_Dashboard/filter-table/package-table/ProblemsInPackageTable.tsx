import React from "react"
import { Code, Hash } from "lucide-react"

// Define the Problem interface
interface Problem {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

// Difficulty Badge Component
const DifficultyBadge = ({ difficulty }: { difficulty: "EASY" | "MEDIUM" | "HARD" }) => {
  const difficultyConfig = {
    EASY: {
      className: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700",
      text: "Easy"
    },
    MEDIUM: {
      className: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700",
      text: "Medium"
    },
    HARD: {
      className: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700",
      text: "Hard"
    }
  }

  const config = difficultyConfig[difficulty] || difficultyConfig.MEDIUM

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold border ${config.className}`}>
      {config.text}
    </span>
  )
}

interface ProblemsInPackageTableProps {
  problems: Problem[]
  maxHeight?: string
}

export default function ProblemsInPackageTable({ problems, maxHeight = "400px" }: ProblemsInPackageTableProps) {
  if (!problems || problems.length === 0) {
    return (
      <div className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 p-8 text-center">
        <Code className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-gray-400">No problems in this package</p>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      {/* Fixed Header */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead>
            <tr>
              <th className="h-12 px-4 text-left align-middle font-bold text-gray-700 dark:text-gray-200 w-20">
                ID
              </th>
              <th className="h-12 px-4 text-left align-middle font-bold text-gray-700 dark:text-gray-200">
                Title
              </th>
              <th className="h-12 px-4 text-left align-middle font-bold text-gray-700 dark:text-gray-200 w-32">
                Difficulty
              </th>
              <th className="h-12 px-4 text-left align-middle font-bold text-gray-700 dark:text-gray-200">
                Tags
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Scrollable Body */}
      <div 
        className="overflow-y-auto overflow-x-hidden"
        style={{ maxHeight }}
      >
        <table className="w-full">
          <tbody>
            {problems.map((problem, index) => (
              <tr 
                key={problem.id}
                className={`border-b border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  index === problems.length - 1 ? 'border-0' : ''
                }`}
              >
                <td className="p-4 align-middle w-20">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {problem.id}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {problem.title}
                    </span>
                  </div>
                </td>
                <td className="p-4 align-middle w-32">
                  <DifficultyBadge difficulty={problem.difficulty} />
                </td>
                <td className="p-4 align-middle">
                  <div className="flex flex-wrap gap-1.5">
                    {problem.tags && problem.tags.length > 0 ? (
                      problem.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500 italic">No tags</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fixed Footer */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">
            Total Problems: <span className="text-blue-600 dark:text-blue-400 font-bold">{problems.length}</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Easy: {problems.filter(p => p.difficulty === 'EASY').length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Medium: {problems.filter(p => p.difficulty === 'MEDIUM').length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Hard: {problems.filter(p => p.difficulty === 'HARD').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}