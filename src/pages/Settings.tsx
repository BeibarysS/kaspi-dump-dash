import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Save,
  Shield,
  LogOut
} from "lucide-react"
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

const Settings = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    company: "KaspiSeller Pro",
    email: "seller@kaspi.kz",
    phone: "+7 777 123 4567",
    timezone: "Asia/Almaty"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
    })
  }

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    })
    navigate('/landing')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure your kaspiBot preferences
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={handleSignOut}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <Button 
            onClick={handleSaveChanges}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-soft"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-2xl">
        {/* Account Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  id="company" 
                  placeholder="Your Company" 
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+7 777 123 4567" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input 
                  id="timezone" 
                  placeholder="Asia/Almaty" 
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings