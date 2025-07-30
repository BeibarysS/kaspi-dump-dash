import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KaspiConnectionDialog } from "@/components/KaspiConnectionDialog"
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  AlertTriangle,
  Eye,
  Link,
  CheckCircle
} from "lucide-react"
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isKaspiConnected, setIsKaspiConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkKaspiConnection = async () => {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('kaspi_shops')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle()

        if (!error && data) {
          setIsKaspiConnected(true)
        }
      } catch (err) {
        console.error('Error checking Kaspi connection:', err)
      } finally {
        setLoading(false)
      }
    }

    checkKaspiConnection()
  }, [user])

  const handleConnectionSaved = () => {
    setIsKaspiConnected(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your pricing strategy and marketplace performance
          </p>
        </div>
        <div className="flex gap-3">
          {!loading && (
            isKaspiConnected ? (
              <Button variant="outline" className="text-success border-success hover:bg-success/10">
                <CheckCircle className="w-4 h-4 mr-2" />
                Kaspi Connected
              </Button>
            ) : (
              <KaspiConnectionDialog onConnectionSaved={handleConnectionSaved}>
                <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                  <Link className="w-4 h-4 mr-2" />
                  Connect Kaspi
                </Button>
              </KaspiConnectionDialog>
            )
          )}
          <Button variant="outline" onClick={() => navigate("/products")}>
            <Eye className="w-4 h-4 mr-2" />
            View All Products
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Dashboard