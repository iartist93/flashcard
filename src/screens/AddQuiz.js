import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styled from '@emotion/native';
import { primary } from '../utils/colors';

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

const AddQuiz = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      <Title>New Quiz</Title>
      <Container>
        <Input placeholder='Quiz Title' style={styles.shadow} />
        <Button>
          <ButtonText>Submit</ButtonText>
        </Button>
      </Container>
    </View>
  );
};

export default AddQuiz;
