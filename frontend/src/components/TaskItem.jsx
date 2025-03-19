import { useState } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSave } from 'react-icons/fa'

function TaskItem({ task, onToggleStatus, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description || '')

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTitle(task.title)
    setEditedDescription(task.description || '')
  }

  const handleSave = () => {
    onUpdateTask(task.id, {
      ...task,
      title: editedTitle,
      description: editedDescription
    })
    setIsEditing(false)
  }

  return (
    <div className={`border rounded-lg p-4 mb-3 shadow-sm ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Título de la tarea"
          />
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            rows="3"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              <FaTimes className="mr-1" /> Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              <FaSave className="mr-1" /> Guardar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => onToggleStatus(task.id)}
                className={`p-1 rounded-full ${task.completed ? 'text-green-500 bg-green-50' : 'text-gray-400 bg-gray-50'}`}
              >
                <FaCheck />
              </button>
              <div className="flex-1">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Creada: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={handleEdit}
                className="p-1 text-blue-500 hover:text-blue-700"
                disabled={task.completed}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem