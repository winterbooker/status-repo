import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SelectScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>テスト</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});

export default SelectScreen;
