import { useFilter } from '../hooks/useFilter'

const FilterBar: React.FC = () => {
  const { filters, setFilters } = useFilter()

  return (
    <div className="bg-card shadow-lg rounded-lg p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'active' | 'completed' })}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        />
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value as '' | 'high' | 'medium' | 'low' })}
          className="p-2 border rounded"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filters.dateFilter}
          onChange={(e) => setFilters({ ...filters, dateFilter: e.target.value as '' | 'today' | 'week' | 'month' })}
          className="p-2 border rounded"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="p-2 border rounded col-span-1 md:col-span-4"
        />
      </div>
    </div>
  )
}

export default FilterBar