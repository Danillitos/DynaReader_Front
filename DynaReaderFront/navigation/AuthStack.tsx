import * as SplashScreen from 'expo-splash-screen'
import { Montserrat_700Bold, Montserrat_400Regular, useFonts } from '@expo-google-fonts/montserrat'
import { useEffect } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../app/LoginScreen";

SplashScreen.preventAutoHideAsync()

export type AuthStackParamList = {
  LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  )
}
