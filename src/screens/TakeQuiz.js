import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { primary, primaryDark } from '../utils/colors';
import { connect } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';

const Container = styled.View`
  /* height: 400px; */
  /* width: 90%; */
  background-color: white;
  border-radius: 10px;
  margin: auto 30px;
  padding: 20px;
  /* justify-content: center; */
  align-items: center;
`;

const Title = styled.Text`
  font-size: 35px;
  font-weight: 600;
  color: black;
`;

const Details = styled.Text`
  font-size: 25px;
  font-weight: 900;
  margin: 40px 0;
  color: grey;
`;

const Row = styled.View`
  flex-direction: row;
  margin-top: 50px;
`;

const Centered = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

//-----------------------------------------------------------

const TakeQuiz = ({ navigation, quiz, dispatch }) => {
  const { title, questions } = quiz;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correct, setCorrect] = useState(0);

  const increment = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion >= questions.length - 1) {
      navigation.navigate('QuizResult', {
        title,
        correct,
        total: questions.length,
      });
    }
  };

  const handleThumbUp = () => {
    setCorrect(correct + 1);
    increment();
  };

  const handleThumbDown = () => {
    increment();
  };

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <View>
      <Centered>
        <Details>{`Q ${currentQuestion + 1}/${questions.length}`}</Details>
      </Centered>
      <Container>
        <Title>{questions[currentQuestion].question}</Title>
        <Row>
          {/* TODO:: Heighlight change the button name */}
          <FontAwesome
            name='thumbs-o-up'
            size={50}
            onPress={handleThumbUp}
            color={primary}
            style={{
              marginRight: 40,
            }}
          />
          <FontAwesome
            name='thumbs-o-down'
            size={50}
            onPress={handleThumbDown}
            color={primaryDark}
          />
        </Row>
      </Container>
    </View>
  );
};

const mapState = (state, { route }) => ({
  quiz: state.quizes[route.params.title],
});

export default connect(mapState)(TakeQuiz);
