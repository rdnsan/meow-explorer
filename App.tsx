/* eslint-disable global-require */
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './screens/Home';
import { ThemeMode } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  });

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <View
          style={{
            backgroundColor: theme[colorScheme as ThemeMode].background,
            ...styles.container,
          }}
          onLayout={onLayoutRootView}
        >
          <StatusBar style="auto" />
          <Home />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
