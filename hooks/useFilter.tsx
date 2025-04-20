import { useState, useMemo } from 'react'
import { useTodos } from '../context/TodoContext'
import { isSameDay, isSameWeek, isSameMonth } from 'date-fns'

export const useFilter = () => {
  const { todos } = useTodos()
  const [filters, setFilters] = useState({
    status: 'all' as 'all' | 'active' | 'completed',
    category: '',
    priority: '' as '' | 'high' | 'medium' | 'low',
    dateFilter: '' as '' | 'today' | 'week' | 'month',
    search: ''
  })

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // Status filter
      if (filters.status === 'active' && todo.completed) return false
      if (filters.status === 'completed' && !todo.completed) return false

      // Category filter
      if (filters.category && todo.category !== filters.category) return false

      // Priority filter
      if (filters.priority && todo.priority !== filters.priority) return false

      // Date filter
      if (filters.dateFilter) {
        const todoDate = new Date(todo.dueDate)
        const now = new Date()
        if (filters.dateFilter === 'today' && !isSameDay(todoDate, now)) return false
        if (filters.dateFilter === 'week' && !isSameWeek(todoDate, now)) return false
        if (filters.dateFilter === 'month' && !isSameMonth(todoDate, now)) return false
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower)
        )
      }

      return true
    })
  }, [todos, filters])

  return { filteredTodos, filters, setFilters }
}