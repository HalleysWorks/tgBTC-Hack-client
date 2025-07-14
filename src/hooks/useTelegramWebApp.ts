import { useEffect, useState, useRef } from 'react';
import TonConnect from '@tonconnect/sdk';

export const useTelegramWebApp = () => {
  // Initialize TonConnect instance without unsupported bridgeUrl in constructor
  const connectorRef = useRef<TonConnect>(
    new TonConnect({
      manifestUrl: window.location.origin + '/tonconnect-manifest.json',
    })
  );
  const [tonWallet, setTonWallet] = useState<any>(connectorRef.current.wallet);
  const [isConnecting, setIsConnecting] = useState(false);

  // Debug wallet connection
  console.log('useTelegramWebApp - wallet state:', tonWallet);

  // Subscribe to status changes and attempt to restore session
  useEffect(() => {
    const connector = connectorRef.current;
    // Listen for wallet connection/disconnection
    const unsubscribe = connector.onStatusChange(
      (wallet) => setTonWallet(wallet),
      (error) => console.error('[TON_CONNECT_SDK_ERROR]', error)
    );
    // Restore previous session if any
    connector
      .restoreConnection()
      .catch((err) => console.error('[TON_CONNECT_RESTORE_ERROR]', err));
    return unsubscribe;
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      hapticFeedback('light');
      // Choose bridge endpoint (use Netlify function proxy in production, local proxy in dev)
      let bridgeUrl;
      if (import.meta.env.DEV) {
        bridgeUrl = '/dewallet-bridge';
      } else if (window.location.hostname.endsWith('netlify.app')) {
        bridgeUrl = '/.netlify/functions/bridge-proxy';
      } else {
        bridgeUrl = 'https://bridge.dewallet.pro/bridge';
      }
      connectorRef.current.connect(
        [
          {
            bridgeUrl,
            universalLink: window.location.origin,
          },
        ],
        { openingDeadlineMS: 120000 }
      );
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      hapticFeedback('error');
      showTelegramAlert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      hapticFeedback('light');
      showTelegramConfirm(
        'Are you sure you want to disconnect your wallet?',
        async (confirmed) => {
          if (confirmed) {
            await connectorRef.current?.disconnect();
            hapticFeedback('success');
            showTelegramAlert('Wallet disconnected successfully!');
          }
        }
      );
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      hapticFeedback('error');
      showTelegramAlert('Failed to disconnect wallet.');
    }
  };

  const getWalletInfo = () => {
    if (!tonWallet) return null;
    return {
      address: tonWallet.account.address,
      chain: tonWallet.account.chain,
      walletName: tonWallet.device.appName,
      walletVersion: tonWallet.device.appVersion,
      platform: tonWallet.device.platform,
    };
  };

  return {
    telegramApp: window.Telegram?.WebApp,
    isConnecting,
    connectWallet,
    disconnectWallet,
    getWalletInfo,
  };
};

export const initializeTelegramWebApp = () => {
  const app = window.Telegram?.WebApp;
  if (app) {
    app.ready();
    app.expand();

    // Set theme colors to match magenta theme
    const isDark = app.colorScheme === 'dark';
    app.setHeaderColor(isDark ? '#1f2937' : '#ffffff');
    app.setBackgroundColor(isDark ? '#111827' : '#f9fafb');

    // Enable closing confirmation
    app.enableClosingConfirmation();

    // Set up main button for wallet connection if not connected
    app.MainButton.text = 'Connect Wallet';

    // Initially hide main button - it will be shown when needed
    app.MainButton.hide();
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
