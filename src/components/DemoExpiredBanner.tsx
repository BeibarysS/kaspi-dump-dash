import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DemoExpiredBannerProps {
  onUpgradeClick: () => void;
}

export function DemoExpiredBanner({ onUpgradeClick }: DemoExpiredBannerProps) {
  return (
    <Alert className="border-warning bg-warning/10 mb-6">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-warning-foreground">
          Демо период истек. Оплатите через Kaspi для продолжения работы.
        </span>
        <Button 
          onClick={onUpgradeClick}
          size="sm"
          className="ml-4"
        >
          Выбрать план
        </Button>
      </AlertDescription>
    </Alert>
  );
}