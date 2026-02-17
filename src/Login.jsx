import { useEffect } from "react"
import { supabase } from "./supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/")
      }
    })
  }, [navigate])

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/"
      }
    })
  }

  return (
    <main className="card">
        <h1>Вхід до системи</h1>
        <p>Авторизуйтесь для продовження</p>
        <button className="google-btn" aria-label="Увійти через Google" onClick={login}>
        <svg className="google-icon" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.98 2.38 30.4 0 24 0 14.6 0 6.32 5.48 2.44 13.44l8.04 6.24C12.4 13.48 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.6-.14-3.14-.4-4.64H24v9h12.5c-.54 2.92-2.18 5.4-4.66 7.08l7.2 5.6C43.92 37.22 46.1 31.44 46.1 24.5z"/>
            <path fill="#FBBC05" d="M10.48 28.68a14.5 14.5 0 0 1 0-9.36l-8.04-6.24A24 24 0 0 0 0 24c0 3.84.92 7.46 2.44 10.92l8.04-6.24z"/>
            <path fill="#34A853" d="M24 48c6.4 0 11.98-2.12 15.98-5.76l-7.2-5.6c-2 1.34-4.56 2.14-8.78 2.14-6.26 0-11.6-3.98-13.52-9.68l-8.04 6.24C6.32 42.52 14.6 48 24 48z"/>
        </svg>
        Увійти через Google
        </button>
    </main>
  )
}
