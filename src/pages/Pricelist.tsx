import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Lock,
  CreditCard,
  CheckCircle,
  Download,
  FileText,
  TrendingUp,
  Shield
} from "lucide-react"

const Pricelist = () => {
  const [hasPaid, setHasPaid] = useState(false)

  const features = [
    "Real-time competitor price data",
    "Automated price alerts",
    "Market trend analysis", 
    "Competitor product catalog",
    "Price history tracking",
    "Export functionality",
    "Premium support"
  ]

  const pricelistData = [
    {
      competitor: "TechnoStore KZ",
      product: "Samsung Galaxy S24 Ultra",
      theirPrice: "389,990 ₸",
      lastUpdated: "2 min ago",
      trend: "down"
    },
    {
      competitor: "iStore Almaty", 
      product: "iPhone 15 Pro Max",
      theirPrice: "595,990 ₸",
      lastUpdated: "5 min ago",
      trend: "up"
    },
    // More sample data would be here
  ]

  if (!hasPaid) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Premium Pricelist</h1>
            <p className="text-muted-foreground">
              Access competitor pricing data and market intelligence
            </p>
          </div>
        </div>

        {/* Payment Required */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md shadow-large">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Premium Access Required</CardTitle>
              <p className="text-muted-foreground">
                Unlock comprehensive competitor pricing data
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">25,000 ₸</div>
                <p className="text-sm text-muted-foreground">One-time payment</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">What you'll get:</h4>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full bg-gradient-primary hover:opacity-90"
                onClick={() => setHasPaid(true)}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Purchase Access
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                Secure payment processing
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Premium Pricelist</h1>
          <div className="flex items-center gap-2">
            <Badge className="bg-success text-success-foreground">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
            <p className="text-muted-foreground">
              Real-time competitor pricing data
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Competitors Tracked</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Products Monitored</p>
                <p className="text-2xl font-bold text-foreground">2,847</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price Updates Today</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-2xl font-bold text-foreground">2m</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricelist Data */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Competitor Pricing Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pricelistData.map((item, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{item.product}</h3>
                      <Badge variant="outline">{item.competitor}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last updated: {item.lastUpdated}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {item.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-destructive rotate-180" />
                      )}
                      <span className="text-xl font-bold text-foreground">{item.theirPrice}</span>
                    </div>
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

export default Pricelist