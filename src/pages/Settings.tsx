import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Save,
  Shield,
  LogOut,
  Link,
  CheckCircle,
  Edit
} from "lucide-react"
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { KaspiConnectionDialog } from '@/components/KaspiConnectionDialog'

const Settings = () => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    timezone: "Asia/Almaty"
  })
  const [loading, setLoading] = useState(true)
  const [isKaspiConnected, setIsKaspiConnected] = useState(false)
  const [kaspiLogin, setKaspiLogin] = useState("")

  useEffect(() => {
    loadProfile()
    checkKaspiConnection()
  }, [user])

  const checkKaspiConnection = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('kaspi_shops')
        .select('login')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data) {
        setIsKaspiConnected(true);
        setKaspiLogin(data.login);
      }
    } catch (err) {
      console.error('Error checking Kaspi connection:', err);
    }
  };

  const loadProfile = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setFormData({
          company: data.company || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          timezone: data.timezone || "Asia/Almaty"
        })
      } else {
        // Create initial profile if it doesn't exist
        setFormData(prev => ({
          ...prev,
          email: user.email || ""
        }))
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          timezone: formData.timezone,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully."
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleKaspiConnectionSaved = () => {
    setIsKaspiConnected(true);
    checkKaspiConnection();
  };

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

      <div className="max-w-2xl space-y-6">
        {/* Kaspi Connection */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="w-5 h-5" />
              Kaspi подключение
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isKaspiConnected ? (
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50/50 border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Kaspi аккаунт подключен</p>
                    <p className="text-sm text-green-600">Логин: {kaspiLogin}</p>
                  </div>
                </div>
                <KaspiConnectionDialog onConnectionSaved={handleKaspiConnectionSaved} isEdit={true} currentLogin={kaspiLogin}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Изменить
                  </Button>
                </KaspiConnectionDialog>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50/50 border-yellow-200">
                <div className="flex items-center gap-3">
                  <Link className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Kaspi аккаунт не подключен</p>
                    <p className="text-sm text-yellow-600">Подключите ваш Kaspi аккаунт для работы с товарами</p>
                  </div>
                </div>
                <KaspiConnectionDialog onConnectionSaved={handleKaspiConnectionSaved}>
                  <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                    <Link className="w-4 h-4 mr-2" />
                    Подключить
                  </Button>
                </KaspiConnectionDialog>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Company Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Company Settings
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