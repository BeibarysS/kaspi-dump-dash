import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SUBSCRIPTION_PLANS } from "@/lib/subscription";
import { Calendar, Shield, Users } from "lucide-react";

// Admin emails that can access this panel
const ADMIN_EMAILS = ['admin@kaspibot.kz', 'admin@gmail.com']; // Replace with actual admin emails

interface UserSubscription {
  id: string;
  email: string;
  created_at: string;
  subscription_status: string;
  plan_name: string;
  subscription_end: string | null;
  trial_end_date: string | null;
}

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  // Check if user is admin
  const isAdmin = user && ADMIN_EMAILS.includes(user.email || '');

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          id,
          user_id,
          status,
          subscription_end,
          trial_end_date,
          plan_id,
          profiles!inner(email),
          subscription_plans(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedUsers = data.map((item: any) => ({
        id: item.user_id,
        email: item.profiles.email,
        created_at: item.profiles.created_at,
        subscription_status: item.status,
        plan_name: item.subscription_plans?.name || 'No Plan',
        subscription_end: item.subscription_end,
        trial_end_date: item.trial_end_date,
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пользователей",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserPlan = async () => {
    if (!selectedUser || !selectedPlan || !expirationDate) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    try {
      // Find the plan
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan);
      if (!plan) throw new Error('Plan not found');

      // Update user subscription
      const { error } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: selectedUser,
          plan_id: plan.id,
          status: 'active',
          subscription_start: new Date().toISOString(),
          subscription_end: new Date(expirationDate).toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "План пользователя обновлен",
      });

      // Reset form and reload users
      setSelectedUser('');
      setSelectedPlan('');
      setExpirationDate('');
      loadUsers();
    } catch (error) {
      console.error('Error updating user plan:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить план пользователя",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Активен</Badge>;
      case 'trial':
        return <Badge variant="secondary">Демо</Badge>;
      case 'expired':
        return <Badge variant="destructive">Истек</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Админ панель</h1>
            <p className="text-muted-foreground">Управление пользователями и подписками</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Management Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Управление планами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="user-select">Пользователь</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="plan-select">План</Label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите план" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBSCRIPTION_PLANS.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expiration">Дата истечения</Label>
                <Input
                  id="expiration"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <Button onClick={updateUserPlan} className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Обновить план
              </Button>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Всего пользователей:</span>
                  <span className="font-semibold">{users.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Активные подписки:</span>
                  <span className="font-semibold">
                    {users.filter(u => u.subscription_status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Демо пользователи:</span>
                  <span className="font-semibold">
                    {users.filter(u => u.subscription_status === 'trial').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Все пользователи</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Загрузка...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>План</TableHead>
                    <TableHead>Истекает</TableHead>
                    <TableHead>Демо до</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{getStatusBadge(user.subscription_status)}</TableCell>
                      <TableCell>{user.plan_name}</TableCell>
                      <TableCell>
                        {user.subscription_end 
                          ? new Date(user.subscription_end).toLocaleDateString('ru-RU')
                          : '-'
                        }
                      </TableCell>
                      <TableCell>
                        {user.trial_end_date 
                          ? new Date(user.trial_end_date).toLocaleDateString('ru-RU')
                          : '-'
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}