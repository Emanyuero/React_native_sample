import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const theme = useColorScheme();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !age || !gender) {
      setErrorMsg('All fields are required!');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('https://your-api.com/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          age,
          gender,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registered successfully!');
        router.replace('/(auth)/login');
      } else {
        setErrorMsg(data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={theme === 'dark' ? ['#0f2027', '#203a43'] : ['#1D976C', '#93F9B9']}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Register</Text>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <TextInput
          placeholder="First Name"
          placeholderTextColor="#ccc"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#ccc"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          style={styles.input}
        />
        <TextInput
          placeholder="Gender"
          placeholderTextColor="#ccc"
          value={gender}
          onChangeText={setGender}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleRegister} style={styles.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ff4d4d',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
});
