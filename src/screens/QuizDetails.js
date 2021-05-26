import React from 'react';
import styled from '@emotion/native';
import { primary } from '../utils/colors';
import { connect } from 'react-redux';
import { removeQuiz } from '../redux/actions/quizes.a';

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

//-----------------------------------------------------------

const QuizDetails = ({ navigation, quiz, dispatch }) => {
  // console.log('Details Quiz Called Again ', quiz);
  const { title, questions } = quiz;

  const handleAddQuestion = () => {
    navigation.navigate('AddQuestion', { title });
  };

  const handleRemoveQuiz = () => {
    dispatch(removeQuiz(title));
    navigation.navigate('QuizesHome');
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Details>{`${questions.length} Questions`}</Details>
      <Button onPress={() => console.log('Pressed')}>
        <ButtonText>Start Quiz</ButtonText>
      </Button>
      <Button onPress={handleAddQuestion}>
        <ButtonText>Add Question</ButtonText>
      </Button>
      <TextButton onPress={handleRemoveQuiz}>
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
