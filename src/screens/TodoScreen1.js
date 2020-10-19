import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
              placeholder="瞑想を5分間する"
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
          <Text>更新</Text>
        </TouchableOpacity>
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

export default TodoScreen1;
