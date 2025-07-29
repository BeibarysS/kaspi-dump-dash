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
  const stats = [
    {
      title: "Total Products",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Package
    },
    {
      title: "Average Profit Margin",
      value: "18.5%",
      change: "+2.3%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Price Changes Today",
      value: "89",
      change: "-5%",
      trend: "down",
      icon: TrendingDown
    },
    {
      title: "Active Alerts",
      value: "23",
      change: "+8",
      trend: "up",
      icon: AlertTriangle
    }
  ]

  const recentActivity = [
    {
      product: "Smartphone Galaxy S24",
      action: "Price reduced",
      oldPrice: "299,990 ₸",
      newPrice: "279,990 ₸",
      time: "2 hours ago",
      status: "success"
    },
    {
      product: "Laptop ASUS VivoBook",
      action: "Competitor undercut",
      oldPrice: "189,990 ₸",
      newPrice: "185,990 ₸",
      time: "4 hours ago",
      status: "warning"
    },
    {
      product: "Wireless Headphones",
      action: "Price increased",
      oldPrice: "25,990 ₸",
      newPrice: "27,990 ₸",
      time: "6 hours ago",
      status: "info"
    }
  ]

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-success mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Price Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-foreground">{activity.product}</div>
                    <Badge variant={activity.status === "success" ? "default" : activity.status === "warning" ? "destructive" : "secondary"}>
                      {activity.action}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {activity.oldPrice} → {activity.newPrice}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard