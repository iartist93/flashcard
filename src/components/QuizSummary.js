import React from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import styled from '@emotion/native';

const CardButton = styled.TouchableOpacity`
  height: 100px;
  background-color: white;
  border-radius: 10px;
  margin: 5px 30px;
  padding: 20px;
`;

const Row = styled.View`
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
    <CardButton onPress={onCardPress} activeOpacity={0.5}>
      <Row>
        <Title>{title}</Title>
        <Details>{quiz.questions.length}</Details>
      </Row>
    </CardButton>
  );
};

export default QuizSummary;
