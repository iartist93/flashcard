import React from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import styled from '@emotion/native';

const Card = styled.TouchableOpacity`
  height: 100px;
  background-color: white;
  border-radius: 10px;
  margin: 5px 30px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: black;
`;

const Details = styled.Text`
  font-size: 35px;
  font-weight: 900;
`;

const QuizSummary = ({ item, onCardPress }) => {
  console.log('item ', item);
  const [title, quiz] = item;

  return (
    <Card onPress={onCardPress} activeOpacity={0.5}>
      <View>
        <Title>{title}</Title>
        <Details>{quiz.questions.length}</Details>
      </View>
    </Card>
  );
};

export default QuizSummary;
