import { useTodos } from '../context/TodoContext'
import { useFilter } from '../hooks/useFilter'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import TodoItem from './TodoItem'

const TodoList: React.FC = () => {
  const { todos } = useTodos()
  const { filteredTodos } = useFilter()
  const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop()

  return (
    <div className="bg-card shadow-lg rounded-lg p-6">
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-muted-foreground">No tasks found</p>
        ) : (
          filteredTodos.map((todo, index) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <TodoItem todo={todo} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList