import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { KaspiPaymentModal } from "@/components/KaspiPaymentModal";
import { SUBSCRIPTION_PLANS, formatPrice } from "@/lib/subscription";

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);

  const handlePayClick = (plan: any) => {
    setSelectedPlan({ name: plan.name, price: plan.price });
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Выберите ваш план</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Автоматизируйте управление ценами на Kaspi и опережайте конкурентов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Популярный
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handlePayClick(plan)}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Оплатить через Kaspi
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Начните с бесплатного демо</h2>
          <p className="text-muted-foreground mb-6">
            Каждый новый пользователь получает 3 дня бесплатного доступа ко всем функциям
          </p>
          <Button size="lg" onClick={() => window.location.href = '/auth'}>
            Попробовать бесплатно
          </Button>
        </div>
      </div>

      <KaspiPaymentModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        planName={selectedPlan?.name || ''}
        planPrice={selectedPlan?.price || 0}
      />
    </div>
  );
}