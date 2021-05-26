import React from 'react';
import { View, Text, FlatList } from 'react-native';
import QuizSummary from '../components/QuizSummary';

import styled from '@emotion/native';
import { connect } from 'react-redux';

import { primary } from '../utils/colors';

const Details = styled.Text`
  font-size: 20px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${primary};
  font-size: 20px;
  width: 150px;
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

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto 0;
`;

//------------------------------------------------------

const Quizes = ({ navigation, quizes }) => {
  const handleCardPress = (title) => {
    navigation.navigate('QuizDetails', { title });
  };

  const handleAddQuizPressed = () => {
    navigation.navigate('AddQuiz');
  };

  return (
    <>
      {Object.keys(quizes).length === 0 && (
        <Container>
          <Details>There's no Quizes yet!</Details>
          <Button onPress={handleAddQuizPressed}>
            <ButtonText>Add Quiz</ButtonText>
          </Button>
        </Container>
      )}
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={Object.entries(quizes)}
          renderItem={(props) => {
            const [key] = props.item;
            return (
              <QuizSummary
                {...props}
                onCardPress={() => handleCardPress(key)}
              />
            );
          }}
          keyExtractor={([key]) => key}
        />
      </View>
    </>
  );
};

const mapState = (state) => ({
  quizes: state.quizes,
});

export default connect(mapState)(Quizes);
