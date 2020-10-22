import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db');


const TodoScreen1 = ({ navigation }) => {
  const [text, setText] = useState('');

  const add = (text) => {
    db.transaction(tx => {
      tx.executeSql('update users set heart = ? where id = 1;', [text]);
      tx.executeSql('select * from users', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>メンタルを鍛えるために何をしますか？</Text>
        <View style={styles.contents}>
          <View style={styles.content}>
            <Text style={styles.text}>心：</Text>
            <TextInput
              style={styles.input}
              placeholder="瞑想をする"
              onChangeText={text => setText(text)}
              defaultValue={text}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            add(text);
            navigation.navigate('Status');
          }}
        >
          <Text style={styles.buttonText}>更新</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: '#fffbf6',
  },
  title: {
    color: '#575757',
    textAlign: 'center',
    marginTop: 50,
  },
  text: {
    color: '#575757',
    lineHeight: 40,
  },
  contents: {
    marginTop: Dimensions.get('window').height * 0.05,
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
    borderBottomColor: '#575757',
    borderBottomWidth: 1,
  },
  button: {
    width: 100,
    height: 40,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e3df',
  },
  buttonText: {
    color: '#575757',
  },
});


export default TodoScreen1;
