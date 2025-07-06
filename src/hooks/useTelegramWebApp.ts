import { useEffect } from 'react';

export const useTelegramWebApp = () => {
  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (app) {
      app.ready();
      app.expand();
    }
  }, []);

  return window.Telegram?.WebApp;
};

export const initializeTelegramWebApp = () => {
  const app = window.Telegram?.WebApp;
  if (app) {
    app.ready();
    app.expand();

    // Set theme colors
    const isDark = app.colorScheme === 'dark';
    app.setHeaderColor(isDark ? '#1f2937' : '#ffffff');
    app.setBackgroundColor(isDark ? '#111827' : '#f9fafb');

    // Enable closing confirmation
    app.enableClosingConfirmation();
  }
  return app;
};

export const showTelegramAlert = (message: string, callback?: () => void) => {
  const app = window.Telegram?.WebApp;
  if (app) {
    app.showAlert(message, callback);
  } else {
    alert(message);
    callback?.();
  }
};

export const showTelegramConfirm = (
  message: string,
  callback?: (confirmed: boolean) => void
) => {
  const app = window.Telegram?.WebApp;
  if (app) {
    app.showConfirm(message, callback);
  } else {
    const confirmed = confirm(message);
    callback?.(confirmed);
  }
};

export const hapticFeedback = (
  type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning'
) => {
  const app = window.Telegram?.WebApp;
  if (app) {
    if (type === 'success' || type === 'error' || type === 'warning') {
      app.HapticFeedback.notificationOccurred(type);
    } else {
      app.HapticFeedback.impactOccurred(type);
    }
  }
};
