import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Geçici başlangıç ekranı: Expo Router'ın ve app.config.ts'in çalıştığını
 * doğrulamak için. Adım 1.7'de gerçek navigasyon yapısıyla değiştirilecek.
 */
export default function Index() {
  const variant: unknown = Constants.expoConfig?.extra?.appVariant;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Constants.expoConfig?.name}</Text>
      <Text>Varyant: {typeof variant === 'string' ? variant : 'bilinmiyor'}</Text>
      <Text>Şema: {String(Constants.expoConfig?.scheme)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
