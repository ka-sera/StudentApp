import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../AppContext';

const MENU = [
  { label: 'Student Profile', route: 'Profile' },
  { label: 'Examination Results', route: 'Results' },
  { label: 'University Announcements', route: 'Announcements' },
  { label: 'Course Information', route: 'Courses' },
];

export default function HomeScreen({ navigation }) {
  const { regNo, signOut, lifecycleLog } = useApp();

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.welcome}>Welcome, {regNo}</Text>

      {MENU.map((item) => (
        <TouchableOpacity key={item.route} style={s.card} onPress={() => navigation.navigate(item.route)}>
          <Text style={s.cardText}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={s.logTitle}>App Lifecycle Log</Text>
      {lifecycleLog.length === 0 && (
        <Text style={s.logEmpty}>Send the app to the background and come back.</Text>
      )}
      {lifecycleLog.slice(0, 5).map((entry, i) => (
        <Text key={i} style={s.logItem}>{entry.time}: {entry.event}</Text>
      ))}

      <TouchableOpacity style={s.logout} onPress={signOut}>
        <Text style={s.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f1f5f9', flexGrow: 1 },
  welcome: { fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1e293b' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 12, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#1e3a8a' },
  cardText: { fontSize: 16, fontWeight: '600', color: '#1e3a8a' },
  logTitle: { marginTop: 20, fontWeight: '700', color: '#334155' },
  logEmpty: { color: '#64748b', marginTop: 4 },
  logItem: { fontSize: 12, color: '#475569', marginTop: 4 },
  logout: { marginTop: 24, padding: 14, alignItems: 'center' },
  logoutText: { color: '#dc2626', fontWeight: '600' },
});