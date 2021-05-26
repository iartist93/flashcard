import React from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import styled from '@emotion/native';

const Card = styled.View`
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
  const { title, questions } = item;

  return (
    <TouchableHighlight onPress={onCardPress}>
      <Card>
        <Title>{title}</Title>
        <Details>{questions.length}</Details>
      </Card>
    </TouchableHighlight>
  );
};

export default QuizSummary;
