import React from 'react';
import { View, Text } from 'react-native';
import QuizSummary from '../components/QuizSummary';

import styled from '@emotion/native';

const Quizes = ({ navigation }) => {
  const handleCardPress = (title) => {
    navigation.navigate('QuizDetails', { title });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <QuizSummary
        item={{ title: 'Quiz1', questions: ['Q(1)', 'Q(2)'] }}
        onCardPress={() => handleCardPress('Quiz1')}
      />
      <QuizSummary
        item={{ title: 'Quiz2', questions: ['Q(1)', 'Q(2)', 'Q(2)', 'Q(2)'] }}
        onCardPress={() => handleCardPress('Quiz2')}
      />
      <QuizSummary
        item={{ title: 'Quiz3', questions: ['Q(1)', 'Q(2)', 'Q(2)', 'Q(2)'] }}
        onCardPress={() => handleCardPress('Quiz3')}
      />
    </View>
  );
};

export default Quizes;
