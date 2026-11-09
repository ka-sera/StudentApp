import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { ANNOUNCEMENTS } from '../data/mockData';

export default function AnnouncementsScreen() {
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={ANNOUNCEMENTS}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.title}>{item.title}</Text>
          <Text style={s.date}>{item.date}</Text>
          <Text style={s.body}>{item.body}</Text>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12 },
  title: { fontWeight: '700', fontSize: 16, color: '#1e3a8a' },
  date: { color: '#64748b', fontSize: 12, marginVertical: 4 },
  body: { color: '#334155' },
});