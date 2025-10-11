import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="HomeScreen" options={{ headerShown: false, animation: 'none'}} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  );
}