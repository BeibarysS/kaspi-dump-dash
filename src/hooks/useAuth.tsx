import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { authApi } from '@/lib/api'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  userSubscription: any | null
  refreshSubscription: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userSubscription, setUserSubscription] = useState<any | null>(null)

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Refresh subscription when user logs in
        if (session?.user) {
          setTimeout(() => {
            refreshSubscription()
          }, 0)
        } else {
          setUserSubscription(null)
        }
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (session?.user) {
        refreshSubscription()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const refreshSubscription = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .rpc('get_user_subscription_status', { user_uuid: user.id })
      
      if (error) throw error
      setUserSubscription(data?.[0] || null)
    } catch (error) {
      console.error('Error fetching subscription:', error)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      // Register with backend (this creates the Supabase user)
      await authApi.register(email, password)
      
      // Then sign in with Supabase using the created credentials
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { error }
    } catch (error: any) {
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // Login with backend first to get JWT
      await authApi.login(email, password)
      
      // Then authenticate with Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { error }
    } catch (error: any) {
      return { error }
    }
  }

  const signOut = async () => {
    localStorage.removeItem('kaspi_bot_token')
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    userSubscription,
    refreshSubscription
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}