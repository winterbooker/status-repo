import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db');


function CreateDataScreen({ navigation }) {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists users (id integer primary key not null, sex interger, heart text, technique text, body text, quit text, heartCount float default 0, techniqueCount interger default 0, bodyCount integer default 0);',
      );
      tx.executeSql(
        'insert into users (sex) values (1);',
      );
      tx.executeSql('select * from users', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
      // tx.executeSql(
      // 'drop table users;',
      // );
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>ロード中</Text>
      {navigation.navigate('Status')}
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

export default CreateDataScreen;
