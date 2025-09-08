import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, MessageCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { KASPI_PAYMENT_INFO, formatPrice } from "@/lib/subscription";

interface KaspiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: number;
}

export function KaspiPaymentModal({ isOpen, onClose, planName, planPrice }: KaspiPaymentModalProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: `${label} скопирован в буфер обмена`,
    });
  };

  const openTelegram = () => {
    window.open(`https://t.me/${KASPI_PAYMENT_INFO.telegramUsername.replace('@', '')}`, '_blank');
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Здравствуйте! Я оплатил план ${planName} на сумму ${formatPrice(planPrice)}. Прикрепляю скриншот оплаты.`);
    window.open(`https://wa.me/${KASPI_PAYMENT_INFO.whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Оплата через Kaspi</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <h3 className="font-semibold">План: {planName}</h3>
                <p className="text-2xl font-bold text-primary">{formatPrice(planPrice)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h4 className="font-medium">Данные для перевода:</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">Номер телефона:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{KASPI_PAYMENT_INFO.phoneNumber}</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(KASPI_PAYMENT_INFO.phoneNumber, 'Номер телефона')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">БИН:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{KASPI_PAYMENT_INFO.bin}</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard(KASPI_PAYMENT_INFO.bin, 'БИН')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Инструкция:</h4>
            <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>1. Переведите {formatPrice(planPrice)} на указанный номер через Kaspi</li>
              <li>2. Сделайте скриншот успешного перевода</li>
              <li>3. Отправьте скриншот администратору через Telegram или WhatsApp</li>
              <li>4. Ваш план будет активирован в течение 24 часов</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button onClick={openTelegram} className="flex-1" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Telegram
            </Button>
            <Button onClick={openWhatsApp} className="flex-1" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          <Button onClick={onClose} className="w-full">
            Понятно
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}