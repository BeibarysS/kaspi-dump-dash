import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface DemoCountdownProps {
  daysRemaining: number;
  onUpgradeClick: () => void;
}

export function DemoCountdown({ daysRemaining, onUpgradeClick }: DemoCountdownProps) {
  return (
    <Alert className="border-primary bg-primary/10 mb-6">
      <Clock className="h-4 w-4 text-primary" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          Демо: осталось {daysRemaining} {daysRemaining === 1 ? 'день' : 'дня'}
        </span>
        <Button 
          onClick={onUpgradeClick}
          size="sm"
          variant="outline"
          className="ml-4"
        >
          Продлить
        </Button>
      </AlertDescription>
    </Alert>
  );
}