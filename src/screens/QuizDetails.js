import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { primary } from '../utils/colors';

const Container = styled.View`
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: auto 30px;
  padding: 20px;
  justify-content: center;
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
  margin-bottom: 40px;
  color: grey;
`;

const Button = styled.TouchableOpacity`
  background-color: ${primary};
  font-size: 20px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const ButtonText = styled.Text`
  font-size: 25px;
  color: white;
`;

const TextButton = styled.TouchableOpacity`
  font-size: 20px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const TextButtonText = styled.Text`
  font-size: 20px;
  color: gray;
`;

const QuizDetails = ({ route, navigation }) => {
  const { title } = route.params;

  const handleAddQuestion = (title) => {
    console.log('Add Question Pressed');
    navigation.navigate('AddQuestion', { title });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Details>{'3 Questions'}</Details>
      <Button onPress={() => console.log('Pressed')}>
        <ButtonText>Start Quiz</ButtonText>
      </Button>
      <Button onPress={() => handleAddQuestion(title)}>
        <ButtonText>Add Question</ButtonText>
      </Button>
      <TextButton>
        <TextButtonText>Delete</TextButtonText>
      </TextButton>
    </Container>
  );
};

//TODO : Get the current quiz item from the state

export default QuizDetails;
