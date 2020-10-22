import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db');


function CreateDataScreen({ navigation }) {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists users (id integer primary key not null, data interger, heart text, technique text, body text, quit text, heartCount float default 0, techniqueCount interger default 0, bodyCount integer default 0);',
      );
      tx.executeSql(
        'insert into users (data) select (1) where not exists (select 1 from users where data = 1);',
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
    height: Dimensions.get('window').height,
    backgroundColor: '#fffbf6',
  },
  text: {
    color: '#575757',
    textAlign: 'center',
    marginTop: 100,
  },
});


export default CreateDataScreen;
