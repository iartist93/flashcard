import 'react-native-gesture-handler';

import React from 'react';

import Quizes from './src/screens/Quizes';
import AddQuiz from './src/screens/AddQuiz';

import { StyleSheet, Text, View } from 'react-native';
import { primary } from './src/utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import store from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import QuizDetails from './src/screens/QuizDetails';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const QuizesScreen = () => {
    const Home = (props) => <Quizes {...props} />;
    const Details = (props) => <QuizDetails {...props} />;
    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: primary,
          },
        })}
      >
        <Stack.Screen
          name='QuizesHome'
          component={Home}
          options={{ title: 'Quizes' }}
        />
        <Stack.Screen
          name='QuizDetails'
          component={Details}
          //TOOD:: Make dynamic header name for each quize
          options={{ title: 'Details To be Changed' }}
        />
      </Stack.Navigator>
    );
  };

  const AddQuizScreen = (props) => <AddQuiz {...props} />;

  return (
    <NavigationContainer>
      <Provider store={store}>
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
      </Provider>
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
