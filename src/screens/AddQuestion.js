import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styled from '@emotion/native';
import { primary } from '../utils/colors';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../redux/actions/quizes.a';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

const Input = styled.TextInput`
  background-color: white;
  border-radius: 10px;
  margin: 5px 20px;
  font-size: 20px;
  padding: 10px 20px;
  width: 80%;
  margin-bottom: 20px;
`;

const Button = styled.TouchableHighlight`
  background-color: ${primary};
  font-size: 20px;
  width: 150px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 25px;
  color: white;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: black;
`;

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
  },
});

//---------------------------------------------------

const AddQuestion = ({ route, dispatch, navigation }) => {
  const { title } = route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddQuestionPress = () => {
    dispatch(
      handleAddQuestion(title, {
        question,
        answer,
      })
    );
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      {/* <Title>New Question</Title> */}
      <Container>
        <Input
          placeholder='Question'
          style={styles.shadow}
          value={question}
          onChangeText={setQuestion}
        />
        <Input
          placeholder='Answer'
          style={styles.shadow}
          value={answer}
          onChangeText={setAnswer}
        />
        <Button>
          <ButtonText onPress={handleAddQuestionPress}>Submit</ButtonText>
        </Button>
      </Container>
    </View>
  );
};

const mapState = (state) => ({});

export default connect()(AddQuestion);
