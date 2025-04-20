import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../context/AuthContext'
import { TodoProvider } from '../context/TodoContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TodoProvider>
          <Component {...pageProps} />
        </TodoProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp