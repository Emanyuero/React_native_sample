import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import '../global.css'; // ✅ Required for Tailwind CSS on web

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#ffffff',
        },
      }}
    />
  );
}
