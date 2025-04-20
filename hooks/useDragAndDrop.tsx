import { useTodos } from '../context/TodoContext'

export const useDragAndDrop = () => {
  const { todos, setTodos } = useTodos()

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))
    const newTodos = [...todos]
    const [draggedTodo] = newTodos.splice(dragIndex, 1)
    newTodos.splice(dropIndex, 0, draggedTodo)
    setTodos(newTodos)
  }

  return { handleDragStart, handleDragOver, handleDrop }
}