import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './App'

function Home() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/login') // 🔹 редірект після виходу
  }

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h1>Контент для авторизованих</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
