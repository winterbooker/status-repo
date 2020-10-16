import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db');

function CharacterScreen({ navigation }) {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists users (id integer primary key not null, sex interger, heart text, technique text, body text, quit text);',
      );
      // tx.executeSql(
        // 'drop table users;',
      // );
    });
  }, []);

  const add = (sex) => {
    db.transaction(tx => {
      tx.executeSql(
        'insert into users (sex) values (?);', [sex]);
      tx.executeSql('select * from users', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.characters}>
        <TouchableOpacity onPress={() => {
          add(1);
          navigation.navigate('Todo1');
        }}
        >
          <Image
            style={styles.character1}
            resizeMode="contain"
            source={require('../../assets/character1.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          add(2);
          navigation.navigate('Todo1');
        }}
        >
          <Image
            style={styles.character2}
            resizeMode="contain"
            source={require('../../assets/character2.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>キャラクターを選択してください</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  characters: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
  },
  character1: {
    width: 150,
    height: 400,
    backgroundColor: '#ddd',
    marginRight: 20,
  },
  character2: {
    width: 150,
    height: 400,
    backgroundColor: '#ddd',
  },
  text: {
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CharacterScreen;
