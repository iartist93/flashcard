import 'react-native-gesture-handler';

import React from 'react';

import Quizes from './src/screens/Quizes';
import AddQuiz from './src/screens/AddQuiz';

import { StyleSheet, StatusBar } from 'react-native';
import { primary } from './src/utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import store from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import QuizDetails from './src/screens/QuizDetails';
import AddQuestion from './src/screens/AddQuestion';
import TakeQuiz from './src/screens/TakeQuiz';
import QuizResult from './src/screens/QuizResult';

//-------------------------------------------------------------

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const QuizesScreen = () => {
    const HomeScreen = (props) => <Quizes {...props} />;
    const DetailsScreen = (props) => <QuizDetails {...props} />;
    const AddQuestionScreen = (props) => <AddQuestion {...props} />;
    const TakeQuizScreen = (props) => <TakeQuiz {...props} />;
    const QuizResultScreen = (props) => <QuizResult {...props} />;

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
          component={HomeScreen}
          options={{ title: 'Quizes' }}
        />
        <Stack.Screen
          name='QuizDetails'
          component={DetailsScreen}
          //TOOD:: Make dynamic header name for each quize
          // options={{ title: 'Details To be Changed' }}
        />
        <Stack.Screen
          name='AddQuestion'
          component={AddQuestionScreen}
          options={{ title: 'Add Question' }}
        />
        <Stack.Screen
          name='TakeQuiz'
          component={TakeQuizScreen}
          options={{ title: 'Take Quiz' }}
        />
        <Stack.Screen
          name='QuizResult'
          component={QuizResultScreen}
          options={{ title: 'Quiz Result' }}
        />
      </Stack.Navigator>
    );
  };

  const AddQuizScreen = (props) => <AddQuiz {...props} />;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar
          animated={true}
          // backgroundColor={blue}
          // barStyle='dark-content'
        />
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
