import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { connect } from 'react-redux';
import { primary, primaryDark } from '../utils/colors';

const Title = styled.Text`
  font-size: 35px;
  font-weight: 600;
  color: black;
`;

const Centered = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  background-color: ${primary};
  font-size: 20px;
  width: 140px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 20px 5px;
`;

const ButtonText = styled.Text`
  font-size: 25px;
  color: white;
`;

const Row = styled.View`
  flex-direction: row;
`;

//-----------------------------------------------------------

const QuizResult = ({ navigation, route }) => {
  const { title, correct, total } = route.params;

  const handleBackPressed = () => {
    navigation.navigate('QuizesHome');
  };
  const handleStartOver = () => {
    navigation.navigate('TakeQuiz', { title });
  };

  return (
    <Centered>
      <Title>{`Your score ${correct} of ${total}`}</Title>
      <Row>
        <Button onPress={handleStartOver}>
          <ButtonText>Start Over</ButtonText>
        </Button>
        <Button onPress={handleBackPressed}>
          <ButtonText>Back</ButtonText>
        </Button>
      </Row>
    </Centered>
  );
};

export default connect()(QuizResult);
