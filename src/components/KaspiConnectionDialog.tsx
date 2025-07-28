import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  AlertCircle, 
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'

interface KaspiConnectionDialogProps {
  children: React.ReactNode
  onConnectionSaved?: () => void
}

export function KaspiConnectionDialog({ children, onConnectionSaved }: KaspiConnectionDialogProps) {
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSave = async () => {
    if (!login.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!user) {
      setError('You must be logged in to save Kaspi credentials')
      return
    }

    setLoading(true)
    setError('')

    try {
      // First, check if user already has Kaspi credentials
      const { data: existingData } = await supabase
        .from('kaspi_shops')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()

      if (existingData) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('kaspi_shops')
          .update({
            login: login.trim(),
            password: password.trim(),
          })
          .eq('user_id', user.id)

        if (updateError) throw updateError
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from('kaspi_shops')
          .insert({
            user_id: user.id,
            login: login.trim(),
            password: password.trim(),
          })

        if (insertError) throw insertError
      }

      toast({
        title: "Connection Saved!",
        description: "Your Kaspi.kz credentials have been saved successfully."
      })

      setOpen(false)
      setLogin('')
      setPassword('')
      onConnectionSaved?.()

    } catch (err: any) {
      console.error('Error saving Kaspi credentials:', err)
      setError(err.message || 'Failed to save credentials. Please try again.')
      toast({
        title: "Error",
        description: "Failed to save Kaspi credentials. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Connect to Kaspi.kz
          </DialogTitle>
          <DialogDescription>
            Enter your Kaspi.kz seller account credentials to enable automated price management.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="pt-6 space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="kaspi-login">Kaspi.kz Login</Label>
              <Input
                id="kaspi-login"
                type="text"
                placeholder="Enter your Kaspi login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kaspi-password">Kaspi.kz Password</Label>
              <div className="relative">
                <Input
                  id="kaspi-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Kaspi password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Your credentials are encrypted and stored securely. We only use them to manage your products and prices on Kaspi.kz.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                {loading ? 'Saving...' : 'Save Connection'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}