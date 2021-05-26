import React from 'react';

import styled from '@emotion/native';

const Card = styled.View`
  height: 300px;
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

const QuizDetails = ({ route, navigation }) => {
  const { title } = route.params;

  return (
    <Card>
      <Title>{title}</Title>
      <Details>{'To be filled later'}</Details>
    </Card>
  );
};

//TODO : Get the current quiz item from the state

export default QuizDetails;
