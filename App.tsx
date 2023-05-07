import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './screens/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Home />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
