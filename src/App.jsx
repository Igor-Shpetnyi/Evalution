import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

import Login from './Login'
import Home from './Home'

// Ініціалізація Supabase
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// ----------------------
// ProtectedRoute
// ----------------------
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    // поточна сесія
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    // слухач змін авторизації
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) return <p>Loading...</p>

  return session ? children : <Navigate to="/login" />
}

// ----------------------
// GuestRoute
// ----------------------
function GuestRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) return <p>Loading...</p>

  return session ? <Navigate to="/" /> : children
}


// ----------------------
// App
// ----------------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
