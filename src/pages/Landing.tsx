import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingDown, 
  BarChart3, 
  Shield, 
  Zap, 
  Check,
  Crown,
  Star
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate()

  const plans = [
    {
      name: "Starter",
      price: "₸19,990",
      period: "month",
      badge: null,
      features: [
        "Up to 500 products",
        "Daily price monitoring",
        "Basic analytics",
        "Email support",
        "1 Kaspi shop connection"
      ]
    },
    {
      name: "Professional", 
      price: "₸29,990",
      period: "month",
      badge: "Most Popular",
      features: [
        "Up to 2,000 products",
        "Real-time price monitoring",
        "Advanced analytics & reports",
        "Priority email support",
        "3 Kaspi shop connections",
        "API access",
        "Custom alerts"
      ]
    },
    {
      name: "Enterprise",
      price: "₸49,990", 
      period: "month",
      badge: "Best Value",
      features: [
        "Unlimited products",
        "Real-time monitoring",
        "Premium analytics suite",
        "24/7 phone & email support",
        "Unlimited shop connections",
        "Full API access",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                <TrendingDown className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">KaspiBot</h1>
                <p className="text-xs text-muted-foreground">Price Management</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => navigate('/pricing')}
                variant="outline"
              >
                Тарифы
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Automate Your <span className="text-primary">Kaspi.kz</span> Price Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Monitor competitor prices, optimize your pricing strategy, and increase your sales on Kazakhstan's leading marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 text-lg px-8 py-3"
            >
              Попробовать бесплатно
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/pricing')}
              className="text-lg px-8 py-3"
            >
              Посмотреть тарифы
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose KaspiBot?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-soft">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Real-time Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track competitor prices 24/7 and get instant alerts when prices change in your market.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Automated Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set smart pricing rules and let KaspiBot automatically adjust your prices to stay competitive.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get detailed insights into market trends, competitor strategies, and your pricing performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Start your 14-day free trial. No credit card required.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={plan.name} className={`shadow-soft relative ${index === 1 ? 'border-primary shadow-large' : ''}`}>
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {index === 0 && <Star className="w-8 h-8 text-primary" />}
                    {index === 1 && <Crown className="w-8 h-8 text-primary" />}
                    {index === 2 && <Shield className="w-8 h-8 text-primary" />}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                    <span className="text-sm text-muted-foreground font-normal">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full"
                    variant={index === 1 ? "default" : "outline"}
                    onClick={() => navigate('/pricing')}
                  >
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingDown className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">KaspiBot</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 KaspiBot. All rights reserved. Optimize your Kaspi.kz business today.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing