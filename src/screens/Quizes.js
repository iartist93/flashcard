import React from 'react';
import { View, Text, FlatList } from 'react-native';
import QuizSummary from '../components/QuizSummary';

import styled from '@emotion/native';
import { connect } from 'react-redux';

const Quizes = ({ navigation, quizes }) => {
  const handleCardPress = (title) => {
    navigation.navigate('QuizDetails', { title });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={Object.entries(quizes)}
        renderItem={(props) => {
          const [key] = props.item;
          return (
            <QuizSummary {...props} onCardPress={() => handleCardPress(key)} />
          );
        }}
        keyExtractor={([key]) => key}
      />
    </View>
  );
};

const mapState = (state) => ({
  quizes: state.quizes,
});

export default connect(mapState)(Quizes);
