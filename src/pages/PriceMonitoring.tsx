import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  RefreshCw, 
  TrendingDown, 
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from "lucide-react"

const PriceMonitoring = () => {
  const monitoringRules = [
    {
      id: 1,
      productName: "Samsung Galaxy S24 Ultra",
      rule: "Match lowest competitor",
      currentPrice: "399,990 ₸",
      targetPrice: "389,990 ₸",
      competitor: "TechnoStore KZ",
      status: "active",
      lastCheck: "2 min ago",
      action: "pending"
    },
    {
      id: 2,
      productName: "iPhone 15 Pro Max",
      rule: "Stay 5% above competitor",
      currentPrice: "599,990 ₸",
      targetPrice: "609,990 ₸",
      competitor: "iStore Almaty",
      status: "paused",
      lastCheck: "1 hour ago",
      action: "none"
    },
    {
      id: 3,
      productName: "MacBook Air M3",
      rule: "Never go below 15% margin",
      currentPrice: "449,990 ₸",
      targetPrice: "439,990 ₸",
      competitor: "Apple Store KZ",
      status: "active",
      lastCheck: "5 min ago",
      action: "recommended"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground"
      case "paused":
        return "bg-warning text-warning-foreground"
      case "error":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "pending":
        return "bg-warning text-warning-foreground"
      case "recommended":
        return "bg-primary text-primary-foreground"
      case "none":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "pending":
        return <Clock className="w-3 h-3" />
      case "recommended":
        return <Target className="w-3 h-3" />
      case "none":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Price Monitoring</h1>
          <p className="text-muted-foreground">
            Automated price tracking and adjustment rules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh All
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <TrendingDown className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Actions</p>
                <p className="text-2xl font-bold text-foreground">7</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price Changes Today</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <TrendingDown className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Rules */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Active Monitoring Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monitoringRules.map((rule) => (
              <div key={rule.id} className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{rule.productName}</h3>
                      <Badge className={getStatusColor(rule.status)}>
                        {rule.status}
                      </Badge>
                      <Badge variant="outline" className={getActionColor(rule.action)}>
                        {getActionIcon(rule.action)}
                        <span className="ml-1">{rule.action}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Rule</p>
                        <p className="font-medium">{rule.rule}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Price</p>
                        <p className="font-medium">{rule.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Target Price</p>
                        <p className="font-medium">{rule.targetPrice}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Competitor</p>
                        <p className="font-medium">{rule.competitor}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      Last checked: {rule.lastCheck}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {rule.action === "pending" && (
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                        Apply Change
                      </Button>
                    )}
                    {rule.action === "recommended" && (
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PriceMonitoring