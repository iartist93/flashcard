import React, { useEffect } from 'react';
import styled, { css } from '@emotion/native';
import { primary, primaryDark } from '../utils/colors';
import { connect } from 'react-redux';
import { handleRemoveQuiz } from '../redux/actions/quizes.a';

const Container = styled.View`
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: auto 30px;
  padding: 20px;
  justify-content: center;
  align-items: center;
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

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${primaryDark};
    `}
`;

const ButtonText = styled.Text`
  font-size: 25px;
  color: white;

  ${(props) =>
    props.disabled &&
    css`
      color: #bbb7b7;
    `}
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

//-----------------------------------------------------------

const QuizDetails = ({ navigation, quiz, dispatch }) => {
  // console.log('Details Quiz Called Again ', quiz);
  const { title, questions } = quiz;

  const handleAddQuestionPress = () => {
    navigation.navigate('AddQuestion', { title });
  };

  const handleRemoveQuizPress = () => {
    dispatch(handleRemoveQuiz(title));
    navigation.navigate('QuizesHome');
  };

  const handleStartQuizPress = () => {
    if (questions.length === 0) return;
    navigation.navigate('TakeQuiz', { title });
  };

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <Container>
      {/* <Title>{title}</Title> */}
      <Details>{`${questions.length} Cards`}</Details>
      <Button onPress={handleStartQuizPress} disabled={questions.length === 0}>
        <ButtonText disabled={questions.length === 0}>Start Quiz</ButtonText>
      </Button>
      <Button onPress={handleAddQuestionPress}>
        <ButtonText>Add Card</ButtonText>
      </Button>
      <TextButton onPress={handleRemoveQuizPress}>
        <TextButtonText>Delete</TextButtonText>
      </TextButton>
    </Container>
  );
};

const mapState = (state, { route }) => ({
  quiz: state.quizes[route.params.title],
});

const shouldRender = (prevProps, nextProps) => {
  return nextProps.quiz ? false : true;
};

export default connect(mapState)(React.memo(QuizDetails, shouldRender));
