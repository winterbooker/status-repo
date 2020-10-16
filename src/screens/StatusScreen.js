import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db');

const StatusScreen = ({ navigation }) => {
  const [text, setText] = useState('');

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>成功</Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#3f3f36',
    textAlign: 'center',
    marginTop: 50,
  },
  text: {
    lineHeight: 40,
  },
  contents: {
    marginTop: 80,
    marginBottom: 50,
    alignSelf: 'center',
  },
  content: {
    flexDirection: 'row',
    margin: 35,
  },
  input: {
    width: 250,
    padding: 10,
    borderBottomColor: '#3f3f36',
    borderBottomWidth: 1,
  },
  button: {
    width: 100,
    height: 40,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
});

export default StatusScreen;
