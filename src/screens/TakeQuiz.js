import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/native';
import { primary, primaryDark } from '../utils/colors';
import { connect } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Animated, TouchableOpacity } from 'react-native';

const Container = styled.View``;

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

const FlipperWrapper = styled(Animated.View)`
  background-color: white;
  border-radius: 10px;
  margin: auto 30px;
  padding: 20px;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
`;
const FrontSide = styled(Animated.View)`
  transform: rotateY(0deg);
  /* position: relative; */
  backface-visibility: hidden;
  z-index: 2;
`;

const BackSide = styled(Animated.View)`
  transform: rotateY(180deg);
  /* position: relative; */
  backface-visibility: hidden;
`;

//-----------------------------------------------------------

const TakeQuiz = ({ navigation, quiz, dispatch }) => {
  const { title, questions } = quiz;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFlipped, setFlipped] = useState(false);
  const correct = useRef(0);

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

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotateRight = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setFlipped(!isFlipped);
  };

  const rotateLeft = () => {
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setFlipped(!isFlipped);
  };

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const flip = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View>
      <Centered>
        <Details>{`Q ${currentQuestion + 1}/${questions.length}`}</Details>
      </Centered>
      <Container>
        <TouchableOpacity onPress={isFlipped ? rotateLeft : rotateRight}>
          <FlipperWrapper style={{ transform: [{ rotateY: flip }] }}>
            <FrontSide style={{ transform: [{ rotateY: flip }] }}>
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
            </FrontSide>
            <BackSide style={{ transform: [{ rotateY: flip }] }}>
              <Title>{questions[currentQuestion].answer}</Title>
            </BackSide>
          </FlipperWrapper>
        </TouchableOpacity>
      </Container>
    </View>
  );
};

const mapState = (state, { route }) => ({
  quiz: state.quizes[route.params.title],
});

export default connect(mapState)(TakeQuiz);
