import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const theme = useColorScheme();
  const router = useRouter();

  const [user, setUser] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (modalVisible) {
      setFullName(user.fullName);
      setEmail(user.email);
      setErrorMsg('');
    }
  }, [modalVisible, user]);

  const bgColor = theme === 'dark' ? '#121212' : '#fff';
  const textColor = theme === 'dark' ? '#eee' : '#111';
  const inputBg = theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f0f0f0';

  const handleSave = () => {
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Full Name and Email are required.');
      return;
    }
    setErrorMsg('');
    setUser((prev) => ({ ...prev, fullName, email }));
    setModalVisible(false);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    // Clear auth/session if needed here

    router.replace('/(auth)/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />

      <Text style={[styles.name, { color: textColor }]}>{user.fullName}</Text>
      <Text style={[styles.email, { color: theme === 'dark' ? '#aaa' : '#555' }]}>
        {user.email}
      </Text>

      <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Edit Profile Modal */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, { backgroundColor: bgColor }]}>
            <Text style={[styles.modalTitle, { color: textColor }]}>Edit Profile</Text>

            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Full Name"
              placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
              value={fullName}
              onChangeText={setFullName}
            />

            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Email"
              placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.buttonsRow}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal animationType="fade" transparent visible={logoutModalVisible} onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={[styles.logoutModalContainer, { backgroundColor: bgColor }]}>
            <Text style={[styles.logoutModalText, { color: textColor }]}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.logoutConfirmButton]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold' },
  email: { fontSize: 18, marginBottom: 40 },
  editButton: { backgroundColor: '#2ecc71', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12, marginBottom: 16 },
  editButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  logoutButton: { backgroundColor: '#e74c3c', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  logoutButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 24 },

  modalContainer: { borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16 },

  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
  cancelButton: { backgroundColor: '#888' },
  saveButton: { backgroundColor: '#2ecc71' },
  logoutConfirmButton: { backgroundColor: '#e74c3c' },

  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  errorText: { color: '#ff4d4d', marginBottom: 12, textAlign: 'center', fontWeight: '500' },

  logoutModalContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  logoutModalText: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
});
