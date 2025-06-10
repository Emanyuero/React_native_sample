import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

export default function IndexScreen() {
  const router = useRouter();
  const theme = useColorScheme() || 'light';

  const handlePress = (path: string) => {
    router.push(path as Parameters<typeof router.push>[0]);
  };

  return (
    <LinearGradient
      colors={
        theme === 'dark'
          ? ['#0f0c29', '#302b63', '#24243e']
          : ['#89f7fe', '#66a6ff', '#4facfe']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Socialify</Text>
        <Text style={styles.subtitle}>Your social media hub</Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handlePress('/(auth)/login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.registerButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handlePress('/(auth)/register')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#f0f0f0',
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.9,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(10px)', // works only in web, feel free to keep it or remove
  },
  loginButton: {
    backgroundColor: 'rgba(46, 204, 113, 0.85)',
  },
  registerButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.85)',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.8,
  },
});
