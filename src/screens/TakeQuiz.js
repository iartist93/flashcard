import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/native';
import { primary, primaryDark } from '../utils/colors';
import { connect } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Card = styled.View``;

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
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const TipText = styled.Text`
  color: #8d8888;
  font-size: 15px;
`;

const Centered = styled.View`
  justify-content: center;
  align-items: center;
`;

const FlipperWrapper = styled(Animated.View)`
  background-color: white;
  border-radius: 10px;
  margin: auto 30px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const FrontSide = styled(Animated.View)`
  transform: rotateY(0deg);
  backface-visibility: hidden;
  z-index: 2;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
`;

const BackSide = styled(Animated.View)`
  transform: rotateY(180deg);
  backface-visibility: hidden;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
`;

//-----------------------------------------------------------

const TakeQuiz = ({ navigation, quiz, dispatch }) => {
  const { title, questions } = quiz;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFlipped, setFlipped] = useState(false);
  const correct = useRef(0);
  const rotateAnimFront = useRef(new Animated.Value(0)).current;
  const rotateAnimBack = useRef(new Animated.Value(1)).current;

  const increment = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion >= questions.length - 1) {
      navigation.navigate('QuizResult', {
        title,
        correct: correct.current,
        total: questions.length,
      });
    }
  };

  const handleThumbUp = () => {
    correct.current++;
    increment();
  };

  const handleThumbDown = () => {
    increment();
  };

  useEffect(() => {
    navigation.setOptions({
      title: title + ' quiz',
    });
  }, []);

  const rotateRight = () => {
    Animated.timing(rotateAnimFront, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(rotateAnimBack, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setFlipped(!isFlipped);
  };

  const rotateLeft = () => {
    Animated.timing(rotateAnimFront, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(rotateAnimBack, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setFlipped(!isFlipped);
  };

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const flipFront = rotateAnimFront.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const flipBack = rotateAnimBack.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View>
      <Centered>
        <Details>{`Card ${currentQuestion + 1}/${questions.length}`}</Details>
      </Centered>
      <TouchableOpacity onPress={isFlipped ? rotateLeft : rotateRight}>
        {/* TODO: Add shadow to the card  */}
        <FlipperWrapper>
          <FrontSide style={{ transform: [{ rotateY: flipFront }] }}>
            <Title style={{ flex: 1 }}>
              {questions[currentQuestion].question}
            </Title>
            <TipText>Touch to see the answer!</TipText>
          </FrontSide>
          <BackSide style={{ transform: [{ rotateY: flipBack }] }}>
            <Title style={{ flex: 1 }}>
              {questions[currentQuestion].answer}
            </Title>
            <TipText>You got it right?</TipText>
          </BackSide>
        </FlipperWrapper>
      </TouchableOpacity>

      <Row style={{ marginTop: 50 }}>
        {/* TODO:: Heighlight change the button name */}
        <Centered style={{ marginRight: 60 }}>
          <FontAwesome
            name='thumbs-o-up'
            size={50}
            onPress={handleThumbUp}
            color={primary}
          />
          <ButtonText>Correct</ButtonText>
        </Centered>
        <Centered>
          <FontAwesome
            name='thumbs-o-down'
            size={50}
            onPress={handleThumbDown}
            color={primaryDark}
          />
          <ButtonText>Wrong</ButtonText>
        </Centered>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
  },
});

const mapState = (state, { route }) => ({
  quiz: state.quizes[route.params.title],
});

export default connect(mapState)(TakeQuiz);
