import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  category: string
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  recurrence?: 'daily' | 'weekly' | 'monthly'
  subtasks?: { id: string; title: string; completed: boolean }[]
  timeSpent: number
  notes: string
}

interface TodoContextType {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id' | 'completed' | 'timeSpent'>) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  batchDelete: (ids: string[]) => void
  batchComplete: (ids: string[]) => void
  exportTodos: () => void
  importTodos: (todos: Todo[]) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (todo: Omit<Todo, 'id' | 'completed' | 'timeSpent'>) => {
    setTodos([...todos, { ...todo, id: uuidv4(), completed: false, timeSpent: 0 }])
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updates } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const batchDelete = (ids: string[]) => {
    setTodos(todos.filter(todo => !ids.includes(todo.id)))
  }

  const batchComplete = (ids: string[]) => {
    setTodos(todos.map(todo => 
      ids.includes(todo.id) ? { ...todo, completed: true } : todo
    ))
  }

  const exportTodos = () => {
    const dataStr = JSON.stringify(todos)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = 'todos.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importTodos = (importedTodos: Todo[]) => {
    setTodos(importedTodos)
  }

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      batchDelete,
      batchComplete,
      exportTodos,
      importTodos
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}