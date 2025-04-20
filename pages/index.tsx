import Head from 'next/head'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import FilterBar from '../components/FilterBar'
import ThemeToggle from '../components/ThemeToggle'
import { useAuth } from '../context/AuthContext'
import Login from '../components/Login'
import StatsDashboard from '../components/StatsDashboard'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Advanced Todo Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className="container mx-auto p-4 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Todo App</h1>
          <ThemeToggle />
        </header>

        {!isAuthenticated ? (
          <Login />
        ) : (
          <>
            <TodoForm />
            <FilterBar />
            <TodoList />
            <StatsDashboard />
          </>
        )}
      </main>
    </div>
  )
}