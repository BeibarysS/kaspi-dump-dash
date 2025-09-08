// Subscription and demo logic
export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9999, // KZT
    features: [
      'До 50 товаров',
      'Обновление цен каждые 6 часов',
      'Базовая аналитика',
      'Email поддержка'
    ],
    maxProducts: 50,
    updateFrequency: '6 часов'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19999, // KZT
    features: [
      'До 200 товаров',
      'Обновление цен каждые 2 часа',
      'Расширенная аналитика',
      'Приоритетная поддержка',
      'API доступ'
    ],
    maxProducts: 200,
    updateFrequency: '2 часа',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 39999, // KZT
    features: [
      'Неограниченное количество товаров',
      'Обновление цен каждый час',
      'Полная аналитика и отчеты',
      'Персональный менеджер',
      'API доступ',
      'Кастомные интеграции'
    ],
    maxProducts: 9999,
    updateFrequency: '1 час'
  }
];

export const DEMO_DURATION_DAYS = 3;

export const calculateDemoExpiration = (registrationDate: Date): Date => {
  const expiration = new Date(registrationDate);
  expiration.setDate(expiration.getDate() + DEMO_DURATION_DAYS);
  return expiration;
};

export const getDaysRemaining = (expirationDate: Date): number => {
  const now = new Date();
  const diffTime = expirationDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

export const isDemoExpired = (expirationDate: Date): boolean => {
  return getDaysRemaining(expirationDate) <= 0;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('kk-KZ', {
    style: 'currency',
    currency: 'KZT',
    minimumFractionDigits: 0,
  }).format(price);
};

export const KASPI_PAYMENT_INFO = {
  phoneNumber: '+7 777 123 4567', // Replace with actual admin phone
  bin: '123456789012', // Replace with actual BIN
  telegramUsername: '@kaspibot_admin', // Replace with actual Telegram
  whatsappNumber: '+77771234567' // Replace with actual WhatsApp
};