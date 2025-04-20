import { useTodos } from '../context/TodoContext'
import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const StatsDashboard: React.FC = () => {
  const { todos } = useTodos()

  const stats = useMemo(() => {
    const completed = todos.filter(t => t.completed).length
    const byPriority = todos.reduce((acc, todo) => {
      acc[todo.priority] = (acc[todo.priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      completionRate: todos.length ? (completed / todos.length) * 100 : 0,
      priorityData: Object.entries(byPriority).map(([name, value]) => ({ name, value }))
    }
  }, [todos])

  return (
    <div className="mt-8 bg-card shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Task Statistics</h2>
      <div className="space-y-4">
        <p>Completion Rate: {stats.completionRate.toFixed(1)}%</p>
        <BarChart width={500} height={300} data={stats.priorityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#2563eb" />
        </BarChart>
      </div>
    </div>
  )
}

export default StatsDashboard