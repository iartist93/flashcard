import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primary } from './src/utils/colors';

import Quizes from './src/screens/Quizes';
import AddQuiz from './src/screens/AddQuiz';

export default function App() {
  const Tab = createBottomTabNavigator();

  const QuizesScreen = (props) => <Quizes {...props} />;
  const AddQuizScreen = (props) => <AddQuiz {...props} />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName =
              route.name === 'Quizes'
                ? focused
                  ? 'layers'
                  : 'layers-outline'
                : route.name === 'AddQuiz'
                ? focused
                  ? 'add-circle'
                  : 'add-circle-outline'
                : '';
            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: primary,
          labelStyle: {
            fontSize: 18,
          },
        }}
      >
        <Tab.Screen name='Quizes' component={QuizesScreen} />
        <Tab.Screen name='AddQuiz' component={AddQuizScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
