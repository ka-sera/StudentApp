import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useApp } from '../AppContext';
import { validateLogin } from '../validation';

const DEMO_PASSWORD = 'student123';

export default function LoginScreen() {
  const { signIn } = useApp();
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const found = validateLogin(regNo, password);
    if (Object.keys(found).length) return setErrors(found);

    if (password !== DEMO_PASSWORD) {
      return setErrors({ password: 'Incorrect password (demo: student123)' });
    }
    setErrors({});
    await signIn(regNo.trim().toUpperCase());
  };

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={s.title}>Student Portal</Text>

      <TextInput
        style={[s.input, errors.regNo && s.inputError]}
        placeholder="Registration No. (CS/12345/2023)"
        autoCapitalize="characters"
        autoCorrect={false}
        value={regNo}
        onChangeText={setRegNo}
      />
      {errors.regNo && <Text style={s.error}>{errors.regNo}</Text>}

      <TextInput
        style={[s.input, errors.password && s.inputError]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={s.error}>{errors.password}</Text>}

      <TouchableOpacity style={s.button} onPress={handleLogin}>
        <Text style={s.buttonText}>Log In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f1f5f9' },
  title: { fontSize: 30, fontWeight: '700', textAlign: 'center', marginBottom: 32, color: '#1e3a8a' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginTop: 12, borderWidth: 1, borderColor: '#cbd5e1' },
  inputError: { borderColor: '#dc2626' },
  error: { color: '#dc2626', marginTop: 4, fontSize: 13 },
  button: { backgroundColor: '#1e3a8a', padding: 16, borderRadius: 8, marginTop: 24, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});