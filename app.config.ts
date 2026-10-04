import type { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * Walkers Expo yapılandırması.
 *
 * Üç derleme varyantı aynı telefona yan yana kurulabilir; her birinin
 * bundle id'si, adı ve deep link şeması farklıdır. Varyant APP_VARIANT
 * ortam değişkeninden okunur: yerelde boşsa "development", EAS'ta
 * eas.json profilleri ayarlar. Bu dosyaya gizli değer yazılmaz.
 */

type AppVariant = 'development' | 'preview' | 'production';

type VariantConfig = {
  name: string;
  bundleId: string;
  scheme: string;
};

const BASE_BUNDLE_ID = 'com.walkers.app';

const VARIANTS: Record<AppVariant, VariantConfig> = {
  development: {
    name: 'Walkers (Dev)',
    bundleId: `${BASE_BUNDLE_ID}.dev`,
    scheme: 'walkers-dev',
  },
  preview: {
    name: 'Walkers (Preview)',
    bundleId: `${BASE_BUNDLE_ID}.preview`,
    scheme: 'walkers-preview',
  },
  production: {
    name: 'Walkers',
    bundleId: BASE_BUNDLE_ID,
    scheme: 'walkers',
  },
};

/**
 * `npx eas-cli@latest init` çalıştırıldıktan sonra verdiği proje kimliği
 * buraya yazılır. Gizli değildir; EAS Build ve EAS Update için gerekir.
 */
const EAS_PROJECT_ID: string | undefined = undefined;

const BRAND_GREEN = '#16A34A';
const SPLASH_DARK_BACKGROUND = '#0B1410';

function resolveVariant(value: string | undefined): AppVariant {
  if (value === undefined || value === '') {
    return 'development';
  }
  if (value === 'development' || value === 'preview' || value === 'production') {
    return value;
  }
  throw new Error(
    `Geçersiz APP_VARIANT: "${value}". Beklenen: development, preview veya production.`,
  );
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = resolveVariant(process.env.APP_VARIANT);
  const { name, bundleId, scheme } = VARIANTS[variant];

  return {
    ...config,
    name,
    slug: 'walkers',
    version: '1.0.0',
    scheme,
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    icon: './assets/icon.png',
    ios: {
      bundleIdentifier: bundleId,
      supportsTablet: false,
    },
    android: {
      package: bundleId,
      adaptiveIcon: {
        backgroundColor: BRAND_GREEN,
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#FFFFFF',
          dark: { backgroundColor: SPLASH_DARK_BACKGROUND },
        },
      ],
      'expo-font',
      // Biyometrik kimlik doğrulama kullanmıyoruz; gereksiz Face ID izin metni eklenmesin.
      ['expo-secure-store', { faceIDPermission: false }],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      appVariant: variant,
      ...(EAS_PROJECT_ID === undefined ? {} : { eas: { projectId: EAS_PROJECT_ID } }),
    },
  };
};
