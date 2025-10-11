import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="LoginScreen" options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  );
}