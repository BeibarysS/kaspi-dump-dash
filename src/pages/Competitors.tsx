import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Plus,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

const Competitors = () => {
  const competitors = [
    {
      id: 1,
      name: "TechnoStore KZ",
      website: "technostore.kz",
      status: "active",
      productsTracked: 156,
      avgPriceDiff: "-3.2%",
      lastUpdate: "2 min ago",
      trustScore: 95,
      trend: "down"
    },
    {
      id: 2,
      name: "iStore Almaty",
      website: "istore.kz",
      status: "active", 
      productsTracked: 89,
      avgPriceDiff: "+1.8%",
      lastUpdate: "5 min ago",
      trustScore: 92,
      trend: "up"
    },
    {
      id: 3,
      name: "ElectroWorld",
      website: "electroworld.kz",
      status: "warning",
      productsTracked: 234,
      avgPriceDiff: "-5.7%",
      lastUpdate: "1 hour ago",
      trustScore: 87,
      trend: "down"
    },
    {
      id: 4,
      name: "DigitalMarket KZ",
      website: "digitalmarket.kz", 
      status: "error",
      productsTracked: 67,
      avgPriceDiff: "+0.5%",
      lastUpdate: "3 hours ago",
      trustScore: 78,
      trend: "up"
    }
  ]

  const competitorProducts = [
    {
      product: "Samsung Galaxy S24 Ultra",
      ourPrice: "₸399,990",
      competitors: [
        { name: "TechnoStore", price: "₸389,990", status: "lower" },
        { name: "iStore", price: "₸409,990", status: "higher" },
        { name: "ElectroWorld", price: "₸385,990", status: "lower" }
      ]
    },
    {
      product: "iPhone 15 Pro Max", 
      ourPrice: "₸599,990",
      competitors: [
        { name: "TechnoStore", price: "₸609,990", status: "higher" },
        { name: "iStore", price: "₸595,990", status: "lower" },
        { name: "ElectroWorld", price: "₸589,990", status: "lower" }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground"
      case "warning":
        return "bg-warning text-warning-foreground"
      case "error":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getPriceStatusColor = (status: string) => {
    switch (status) {
      case "lower":
        return "text-destructive"
      case "higher":
        return "text-success"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Competitors</h1>
          <p className="text-muted-foreground">
            Monitor competitor pricing and market positioning
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      {/* Competitor Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {competitors.map((competitor) => (
          <Card key={competitor.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {competitor.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">{competitor.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{competitor.website}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(competitor.status)}>
                  {competitor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Products</span>
                  <span className="font-medium">{competitor.productsTracked}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Price Diff</span>
                  <div className="flex items-center gap-1">
                    {competitor.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-success" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className="font-medium">{competitor.avgPriceDiff}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Trust Score</span>
                  <span className="font-medium">{competitor.trustScore}%</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Updated: {competitor.lastUpdate}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Comparison */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Price Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitorProducts.map((item, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">{item.product}</h3>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Our Price</p>
                    <p className="font-bold text-foreground">{item.ourPrice}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {item.competitors.map((comp, compIndex) => (
                    <div key={compIndex} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{comp.name}</p>
                        <div className="flex items-center gap-2">
                          {comp.status === "lower" ? (
                            <AlertTriangle className="w-3 h-3 text-destructive" />
                          ) : (
                            <CheckCircle className="w-3 h-3 text-success" />
                          )}
                          <span className={`text-sm ${getPriceStatusColor(comp.status)}`}>
                            {comp.status === "lower" ? "Lower" : "Higher"}
                          </span>
                        </div>
                      </div>
                      <p className="font-bold">{comp.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Competitors