import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { RESULTS } from '../data/mockData';

export default function ResultsScreen() {
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={RESULTS}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={s.row}>
          <View style={{ flex: 1 }}>
            <Text style={s.code}>{item.code}</Text>
            <Text>{item.title}</Text>
          </View>
          <Text style={s.marks}>{item.marks}%</Text>
          <Text style={s.grade}>{item.grade}</Text>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 10 },
  code: { fontWeight: '700', color: '#1e3a8a' },
  marks: { marginHorizontal: 16, color: '#475569' },
  grade: { fontSize: 20, fontWeight: '700', color: '#15803d' },
});