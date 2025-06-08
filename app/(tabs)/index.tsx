import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

export default function IndexScreen() {
  const router = useRouter();
  const theme = useColorScheme() || 'light'; // Fallback to 'light' if null

  return (
    <LinearGradient
      colors={theme === 'dark' ? ['#0f2027', '#203a43'] : ['#2193b0', '#6dd5ed']}
      style={styles.container}
    >
      <View style={styles.content}>

        <Text style={styles.title}>Welcome to Socialify</Text>
        <Text style={styles.subtitle}>Your social media hub</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => router.push('/(auth)/register')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
