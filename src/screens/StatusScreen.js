import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ProgressChart } from 'react-native-chart-kit';
import { createStackNavigator } from '@react-navigation/stack';


const db = SQLite.openDatabase('db');
const Stack = createStackNavigator();


const Items = ({ navigation }) => {
  const [items, setItems] = useState(null);

  const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 3,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };


  function handlePlusHeart() {
    db.transaction(tx => {
      tx.executeSql(
        'update users set heartCount = round(heartCount + 0.01, 3) where id = 1;', null,
      );
      tx.executeSql('select * from users', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  function handlePlusTechnique() {
    db.transaction(tx => {
      tx.executeSql(
        'update users set techniqueCount = round(techniqueCount + 0.01, 3) where id = 1;', null,
      );
      tx.executeSql('select * from users', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  function handlePlusBody() {
    db.transaction(tx => {
      tx.executeSql(
        'update users set bodyCount = round(bodyCount + 0.01, 3) where id = 1;', null,
      );
      tx.executeSql('select * from users', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists users (id integer primary key not null, sex interger, heart text, technique text, body text, quit text, heartCount float default 0, techniqueCount interger default 0, bodyCount integer default 0);',
      );
      tx.executeSql(
        'select * from users where id = 1;',
        null,
        (_, { rows: { _array } }) => setItems(_array),
      );
      // tx.executeSql(
      // 'drop table users;',
      // );
    });
  });

  if (items === null || items.length === 0) {
    return null;
  }


  let heartCount;

  if (items[0].heartCount === 0) {
    heartCount = 0;
  } else if (items[0].heartCount === Math.floor(items[0].heartCount)) {
    heartCount = 1;
  } else {
    heartCount = items[0].heartCount - Math.floor(items[0].heartCount);
  }


  let techniqueCount;

  if (items[0].techniqueCount === 0) {
    techniqueCount = 0;
  } else if (items[0].techniqueCount === Math.floor(items[0].techniqueCount)) {
    techniqueCount = 1;
  } else {
    techniqueCount = items[0].techniqueCount - Math.floor(items[0].techniqueCount);
  }


  let bodyCount;

  if (items[0].bodyCount === 0) {
    bodyCount = 0;
  } else if (items[0].bodyCount === Math.floor(items[0].bodyCount)) {
    bodyCount = 1;
  } else {
    bodyCount = items[0].bodyCount - Math.floor(items[0].bodyCount);
  }


  const data = {
    labels: ['心', '技', '体'],
    data: [heartCount, techniqueCount, bodyCount],
  };


  return (
    <View style={styles.todolist}>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        strokeWidth={10}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />


      <View style={styles.todo}>
        <View style={styles.text}>
          <Text>心：</Text>
          {items.map(({ id, heart }) => (
            <Text key={id}>{heart}</Text>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Heart')}>
          <Text style={styles.plus}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePlusHeart()}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.todo}>
        <View style={styles.text}>
          <Text>技：</Text>
          {items.map(({ id, technique }) => (
            <Text key={id}>{technique}</Text>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Technique')}>
          <Text style={styles.plus}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePlusTechnique()}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.todo}>
        <View style={styles.text}>
          <Text>体：</Text>
          {items.map(({ id, body }) => (
            <Text key={id}>{body}</Text>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Body')}>
          <Text style={styles.plus}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePlusBody()}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.todoQuit}>
        <View style={styles.text}>
          <Text style={styles.quit}>捨：</Text>
          {items.map(({ id, quit }) => (
            <Text style={styles.quit} key={id}>{quit}</Text>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Quit')}>
          <Text style={styles.plus}>*</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StatusScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Items navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbf6',
  },
  todolist: {
    marginTop: 50,
    marginBottom: 80,
  },
  todo: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
  },
  text: {
    flexDirection: 'row',
    marginRight: 70,
    alignItems: 'center',
  },
  plus: {
    backgroundColor: '#ddd',
    padding: 10,
    margin: 15,
  },
  todoQuit: {
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'center',
  },
  quit: {
    color: '#FF6384',
  },
});

export default StatusScreen;
