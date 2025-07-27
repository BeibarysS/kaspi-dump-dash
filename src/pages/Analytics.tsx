import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Calendar
} from "lucide-react"

const Analytics = () => {
  const performanceMetrics = [
    {
      title: "Total Revenue",
      value: "₸12,450,000",
      change: "+15.3%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Units Sold",
      value: "3,247",
      change: "+8.7%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Average Order Value",
      value: "₸38,340",
      change: "+5.2%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Conversion Rate",
      value: "3.8%",
      change: "-0.3%",
      trend: "down",
      period: "vs last month"
    }
  ]

  const topProducts = [
    {
      name: "Samsung Galaxy S24 Ultra",
      revenue: "₸2,890,000",
      units: 87,
      margin: "18.5%",
      trend: "up"
    },
    {
      name: "iPhone 15 Pro Max",
      revenue: "₸2,340,000",
      units: 45,
      margin: "22.8%",
      trend: "up"
    },
    {
      name: "MacBook Air M3",
      revenue: "₸1,890,000",
      units: 42,
      margin: "15.2%",
      trend: "down"
    },
    {
      name: "AirPods Pro 2",
      revenue: "₸1,450,000",
      units: 234,
      margin: "25.3%",
      trend: "up"
    }
  ]

  const priceOptimization = [
    {
      product: "Smart TV Samsung 55\"",
      currentPrice: "₸299,990",
      suggestedPrice: "₸289,990",
      potentialIncrease: "+12%",
      confidence: "High"
    },
    {
      product: "Gaming Laptop ASUS",
      currentPrice: "₸449,990",
      suggestedPrice: "₸459,990",
      potentialIncrease: "+8%",
      confidence: "Medium"
    },
    {
      product: "Wireless Mouse Logitech",
      currentPrice: "₸15,990",
      suggestedPrice: "₸14,990",
      potentialIncrease: "+15%",
      confidence: "High"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Performance insights and optimization recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              {metric.title.includes("Revenue") && <DollarSign className="w-4 h-4 text-muted-foreground" />}
              {metric.title.includes("Units") && <ShoppingCart className="w-4 h-4 text-muted-foreground" />}
              {metric.title.includes("Average") && <BarChart3 className="w-4 h-4 text-muted-foreground" />}
              {metric.title.includes("Conversion") && <TrendingUp className="w-4 h-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center text-xs">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-success mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive mr-1" />
                )}
                <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>
                  {metric.change}
                </span>
                <span className="text-muted-foreground ml-1">{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Products */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.units} units • {product.margin} margin
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{product.revenue}</div>
                    <div className="flex items-center justify-end">
                      {product.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Optimization Suggestions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Price Optimization Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priceOptimization.map((suggestion, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-foreground">{suggestion.product}</div>
                    <Badge variant={suggestion.confidence === "High" ? "default" : "secondary"}>
                      {suggestion.confidence}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-medium">{suggestion.currentPrice}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Suggested</p>
                      <p className="font-medium">{suggestion.suggestedPrice}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-success font-medium">
                      {suggestion.potentialIncrease} potential sales increase
                    </span>
                    <Button size="sm" variant="outline">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics