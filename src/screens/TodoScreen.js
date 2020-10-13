import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const TodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    marginTop: 50,
  },
});

export default TodoScreen;
