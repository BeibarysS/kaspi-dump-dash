import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import { DemoCountdown } from "@/components/DemoCountdown";
import { DemoExpiredBanner } from "@/components/DemoExpiredBanner";
import { KaspiPaymentModal } from "@/components/KaspiPaymentModal";
import { calculateDemoExpiration, getDaysRemaining, isDemoExpired } from "@/lib/subscription";
import { ShoppingCart, TrendingUp, Users, AlertCircle, Calendar, Crown, CheckCircle, Link, Eye } from "lucide-react";

export default function Dashboard() {
  const { user, userSubscription } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [demoExpiration, setDemoExpiration] = useState<Date | null>(null);

  useEffect(() => {
    if (user) {
      setLoading(false);
      // Calculate demo expiration based on user creation date
      if (user.created_at) {
        const expiration = calculateDemoExpiration(new Date(user.created_at));
        setDemoExpiration(expiration);
      }
    }
  }, [user]);


  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  // Check access permissions
  const hasAccess = () => {
    if (userSubscription?.has_access) return true;
    if (demoExpiration && !isDemoExpired(demoExpiration)) return true;
    return false;
  };

  const isDemo = userSubscription?.status === 'trial' || (!userSubscription && demoExpiration);
  const isExpired = userSubscription?.has_access === false && demoExpiration && isDemoExpired(demoExpiration);
  const daysLeft = demoExpiration ? getDaysRemaining(demoExpiration) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground mt-2">
          Добро пожаловать в систему управления ценами для Kaspi.kz
        </p>
      </div>

      {/* Demo/Subscription Status */}
      {isExpired && <DemoExpiredBanner onUpgradeClick={handleUpgradeClick} />}
      {isDemo && daysLeft > 0 && <DemoCountdown daysRemaining={daysLeft} onUpgradeClick={handleUpgradeClick} />}

      {/* User Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Статус аккаунта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">План</p>
              <p className="font-medium">
                {userSubscription?.plan_name || (isDemo ? 'Демо доступ' : 'Нет плана')}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Статус</p>
              <Badge variant={hasAccess() ? "default" : "destructive"}>
                {hasAccess() ? 'Активен' : 'Истек'}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {isDemo ? 'Демо до' : 'Действует до'}
              </p>
              <p className="font-medium">
                {userSubscription?.subscription_end 
                  ? new Date(userSubscription.subscription_end).toLocaleDateString('ru-RU')
                  : demoExpiration?.toLocaleDateString('ru-RU') || '-'
                }
              </p>
            </div>
          </div>
          
          {!hasAccess() && (
            <Button onClick={handleUpgradeClick} className="w-full">
              Выбрать план
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Товары</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">0</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/products")}
                disabled={!hasAccess()}
              >
                Управление товарами
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Конкуренты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">0</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/pricelist")}
                disabled={!hasAccess()}
              >
                Анализ цен
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Статус системы</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant={hasAccess() ? "default" : "destructive"}>
                {hasAccess() ? 'Активно' : 'Неактивно'}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {hasAccess() ? 'Система работает' : 'Нужно продлить подписку'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {hasAccess() && (
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>
              Основные функции для управления вашим магазином
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Button 
              onClick={() => navigate("/products")} 
              className="h-20 flex-col gap-2"
            >
              <ShoppingCart className="w-6 h-6" />
              Управление товарами
            </Button>
            <Button 
              onClick={() => navigate("/pricelist")} 
              variant="outline"
              className="h-20 flex-col gap-2"
            >
              <TrendingUp className="w-6 h-6" />
              Анализ конкурентов
            </Button>
          </CardContent>
        </Card>
      )}

      <KaspiPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        planName="Pro"
        planPrice={19999}
      />
    </div>
  );
}