import TaskChecklist from '../components/TaskChecklist'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <TaskChecklist />
      </div>
    </main>
  )
}
