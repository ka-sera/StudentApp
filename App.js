import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppContext } from './src/AppContext';
import useAppLifecycle from './src/hooks/useAppLifecycle';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import AnnouncementsScreen from './src/screens/AnnouncementsScreen';
import CoursesScreen from './src/screens/CoursesScreen';

const Stack = createNativeStackNavigator();
const SESSION_KEY = '@session_regNo';

export default function App() {
  const [regNo, setRegNo] = useState(null);
  const [loading, setLoading] = useState(true);
  const lifecycleLog = useAppLifecycle();

  // Restore the saved login when the app starts
  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY)
      .then((saved) => saved && setRegNo(saved))
      .finally(() => setLoading(false));
  }, []);

  const auth = useMemo(
    () => ({
      regNo,
      lifecycleLog,
      signIn: async (value) => {
        await AsyncStorage.setItem(SESSION_KEY, value);
        setRegNo(value);
      },
      signOut: async () => {
        await AsyncStorage.removeItem(SESSION_KEY);
        setRegNo(null);
      },
    }),
    [regNo, lifecycleLog]
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppContext.Provider value={auth}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#1e3a8a' },
            headerTintColor: '#fff',
          }}
        >
          {regNo == null ? (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Student Portal' }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Student Profile' }} />
              <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Examination Results' }} />
              <Stack.Screen name="Announcements" component={AnnouncementsScreen} options={{ title: 'Announcements' }} />
              <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: 'Course Information' }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}