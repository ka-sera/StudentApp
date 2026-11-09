import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { COURSES } from '../data/mockData';

export default function CoursesScreen() {
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={COURSES}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.title}>{item.code}: {item.title}</Text>
          <Text>Lecturer: {item.lecturer}</Text>
          <Text>Credits: {item.credits}</Text>
          <Text>Schedule: {item.schedule}</Text>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, gap: 2 },
  title: { fontWeight: '700', fontSize: 16, color: '#1e3a8a', marginBottom: 4 },
});