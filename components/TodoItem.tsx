import { useState } from 'react'
import { Todo, useTodos } from '../context/TodoContext'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Timer } from 'lucide-react'

interface TodoItemProps {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo, toggleTodo } = useTodos()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const handleTimeTracking = () => {
    if (!timer) {
      const interval = setInterval(() => {
        updateTodo(todo.id, { timeSpent: todo.timeSpent + 1 })
      }, 1000)
      setTimer(interval)
    } else {
      clearInterval(timer)
      setTimer(null)
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5"
        />
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={todo.title}
              onChange={(e) => updateTodo(todo.id, { title: e.target.value })}
              className="w-full p-2 border rounded"
            />
          ) : (
            <h3 className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
              {todo.title}
            </h3>
          )}
          <p className="text-sm text-muted-foreground">{todo.description}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={handleTimeTracking}>
            <Timer className="h-5 w-5" />
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-2">
          <p>Due: {format(new Date(todo.dueDate), 'PPP')}</p>
          <p>Priority: {todo.priority}</p>
          <p>Category: {todo.category}</p>
          <p>Time Spent: {Math.floor(todo.timeSpent / 60)}m {todo.timeSpent % 60}s</p>
          {todo.subtasks && (
            <div>
              <h4>Subtasks:</h4>
              {todo.subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => {
                      const updatedSubtasks = todo.subtasks?.map(st => 
                        st.id === subtask.id ? { ...st, completed: !st.completed } : st
                      )
                      updateTodo(todo.id, { subtasks: updatedSubtasks })
                    }}
                  />
                  <span>{subtask.title}</span>
                </div>
              ))}
            </div>
          )}
          {todo.notes && <p>Notes: {todo.notes}</p>}
        </div>
      )}
    </div>
  )
}

export default TodoItem