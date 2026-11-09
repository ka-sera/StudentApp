import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../AppContext';
import { EMAIL_REGEX } from '../validation';

export default function ProfileScreen() {
  const { regNo } = useApp();
  const STORAGE_KEY = `@profile_${regNo}`;
  const [profile, setProfile] = useState({ name: '', email: '', major: '' });
  const [error, setError] = useState('');

  // Load saved profile when the screen opens
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setProfile(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to load profile', e);
      }
    })();
  }, [STORAGE_KEY]);

  const update = (field) => (value) => setProfile((p) => ({ ...p, [field]: value }));

  // Validate, then save to AsyncStorage
  const handleSave = async () => {
    if (!profile.name.trim()) return setError('Name is required');
    if (!EMAIL_REGEX.test(profile.email.trim())) return setError('Enter a valid email address');
    setError('');
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      Alert.alert('Saved', 'Your profile has been updated.');
    } catch (e) {
      Alert.alert('Error', 'Could not save profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.label}>Registration Number</Text>
      <Text style={s.readonly}>{regNo}</Text>

      <Text style={s.label}>Full Name</Text>
      <TextInput style={s.input} value={profile.name} onChangeText={update('name')} placeholder="e.g. Jane Wanjiru" />

      <Text style={s.label}>Email</Text>
      <TextInput
        style={s.input}
        value={profile.email}
        onChangeText={update('email')}
        placeholder="jane@student.ac.ke"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={s.label}>Major</Text>
      <TextInput style={s.input} value={profile.major} onChangeText={update('major')} placeholder="e.g. Computer Science" />

      {!!error && <Text style={s.error}>{error}</Text>}

      <TouchableOpacity style={s.button} onPress={handleSave}>
        <Text style={s.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f1f5f9', flexGrow: 1 },
  label: { marginTop: 16, fontWeight: '600', color: '#334155' },
  readonly: { marginTop: 6, fontSize: 16, color: '#64748b' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginTop: 6, borderWidth: 1, borderColor: '#cbd5e1' },
  error: { color: '#dc2626', marginTop: 12 },
  button: { backgroundColor: '#1e3a8a', padding: 16, borderRadius: 8, marginTop: 28, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});