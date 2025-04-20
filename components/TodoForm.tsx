import { useState } from 'react'
import { useTodos } from '../context/TodoContext'

const TodoForm: React.FC = () => {
  const { addTodo } = useTodos()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    recurrence: '' as '' | 'daily' | 'weekly' | 'monthly',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTodo({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate,
      recurrence: formData.recurrence || undefined,
      notes: formData.notes
    })
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      recurrence: '',
      notes: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card shadow-lg rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="p-2 border rounded col-span-2"
        />
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
          className="p-2 border rounded"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="p-2 border rounded"
        />
        <select
          value={formData.recurrence}
          onChange={(e) => setFormData({ ...formData, recurrence: e.target.value as '' | 'daily' | 'weekly' | 'monthly' })}
          className="p-2 border rounded"
        >
          <option value="">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="p-2 border rounded col-span-2"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
      >
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm