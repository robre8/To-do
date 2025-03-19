import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskItem from './components/TaskItem'
import { FaPlus, FaSpinner } from 'react-icons/fa'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [filter, setFilter] = useState('all')
  
  const API_URL = 'http://localhost:8080/api/tasks'

  useEffect(() => {
    fetchTasks()
}, [filter])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      let url = API_URL
      if (filter !== 'all') {
        url = `${API_URL}/status?completed=${filter === 'completed'}`
      }
      const response = await axios.get(url)
      setTasks(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Error al cargar las tareas. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    try {
      const response = await axios.post(API_URL, {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false
      })
      setTasks([...tasks, response.data])
      setNewTaskTitle('')
      setNewTaskDescription('')
      setError(null)
    } catch (err) {
      console.error('Error creating task:', err)
      setError('Error al crear la tarea. Por favor, intenta de nuevo.')
    }
  }

  const handleToggleStatus = async (taskId) => {
    try {
      const response = await axios.patch(`${API_URL}/${taskId}/toggle`)
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ))
      setError(null)
    } catch (err) {
      console.error('Error toggling task status:', err)
      setError('Error al actualizar el estado de la tarea. Por favor, intenta de nuevo.')
    }
  }

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}`, updatedTask)
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ))
      setError(null)
    } catch (err) {
      console.error('Error updating task:', err)
      setError('Error al actualizar la tarea. Por favor, intenta de nuevo.')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`)
      setTasks(tasks.filter(task => task.id !== taskId))
      setError(null)
    } catch (err) {
      console.error('Error deleting task:', err)
      setError('Error al eliminar la tarea. Por favor, intenta de nuevo.')
    }
  }

  const filteredTasks = tasks

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Gestor de Tareas</h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Nueva Tarea</h2>
          <form onSubmit={handleCreateTask}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Título de la tarea"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Descripción (opcional)"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center justify-center"
              disabled={!newTaskTitle.trim()}
            >
              <FaPlus className="mr-2" /> Añadir Tarea
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Mis Tareas</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 text-sm rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Activas
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 text-sm rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Completadas
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <FaSpinner className="animate-spin text-blue-500 text-2xl" />
            </div>
          ) : filteredTasks.length > 0 ? (
            <div>
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleStatus={handleToggleStatus}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">
              No hay tareas {filter !== 'all' && filter === 'active' ? 'activas' : filter === 'completed' ? 'completadas' : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App