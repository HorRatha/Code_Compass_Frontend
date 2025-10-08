import ProblemsTable from "./problem-table/ProblemsTable"
import BadgesTable from "./badge-table/BadgesTable"
import PackagesTable from "./package-table/PackagesTable"

// Based on your previous code, the interfaces are likely:
interface Problem {
  id: number;
  title: string;
  // ... other problem properties
}

interface Badge {
  id: number;
  name: string;
  // ... other badge properties
}

interface Package {
  id: number;
  name: string;
  // ... other package properties
}

// Union type for all possible items
type Item = Problem | Badge | Package;

interface AllItemsTableProps {
  items: Item[];
  filter: "all" | "problem" | "badge" | "package";
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function AllItemsTable({ filter, onEdit, onDelete }: AllItemsTableProps) {
  // The child components likely use their own data fetching hooks
  // So we don't need to pass items to them

  if (filter === "problem") {
    return <ProblemsTable onEdit={onEdit} onDelete={onDelete} />
  }

  if (filter === "badge") {
    return <BadgesTable onEdit={onEdit} onDelete={onDelete} />
  }

  if (filter === "package") {
    return <PackagesTable onEdit={onEdit} onDelete={onDelete} />
  }

  // All items table
  return (
    <div className="space-y-6">
      <ProblemsTable onEdit={onEdit} onDelete={onDelete} />
      <BadgesTable onEdit={onEdit} onDelete={onDelete} />
      <PackagesTable onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}