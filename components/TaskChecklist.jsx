import { useEffect, useState } from 'react'

const STORAGE_KEY = 'task_checklist_tasks_v1'

export default function TaskChecklist() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTasks(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load tasks', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (e) {
      console.error('Failed to save tasks', e)
    }
  }, [tasks])

  function addTask() {
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, completed: false }
    ])
    setText('')
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">Task Checklist</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') addTask() }}
          placeholder="Add a new task"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.length === 0 && (
          <li className="text-gray-500 text-center">No tasks yet</li>
        )}

        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4"
              />
              <span className={`break-words ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.text}
              </span>
            </label>

            <button
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
              className="text-red-500 hover:text-red-700 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
