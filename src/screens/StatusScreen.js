import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ProgressChart } from 'react-native-chart-kit';


const db = SQLite.openDatabase('db');


const Items = ({ navigation }) => {
  const [items, setItems] = useState(null);

  // progressBarの設定
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

  // 「心」を１％増やす（１で１００％になるから0.01ずつ足す）
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

  // 「技」を１％増やす（１で１００％になるから0.01ずつ足す）
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

  // 「体」を１％増やす（１で１００％になるから0.01ずつ足す）
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

  // データベースから表示するデータを取得する
  useEffect(() => {
    db.transaction(tx => {
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


  // progressBarの表示を正しく行うための分岐処理
  let heartCount;

  if (items[0].heartCount === 0) {
    heartCount = 0;
  } else if (items[0].heartCount === Math.floor(items[0].heartCount)) {
    heartCount = 1;
  } else {
    heartCount = items[0].heartCount - Math.floor(items[0].heartCount);
  }


  // progressBarの表示を正しく行うための分岐処理
  let techniqueCount;

  if (items[0].techniqueCount === 0) {
    techniqueCount = 0;
  } else if (items[0].techniqueCount === Math.floor(items[0].techniqueCount)) {
    techniqueCount = 1;
  } else {
    techniqueCount = items[0].techniqueCount - Math.floor(items[0].techniqueCount);
  }


  // progressBarの表示を正しく行うための分岐処理
  let bodyCount;

  if (items[0].bodyCount === 0) {
    bodyCount = 0;
  } else if (items[0].bodyCount === Math.floor(items[0].bodyCount)) {
    bodyCount = 1;
  } else {
    bodyCount = items[0].bodyCount - Math.floor(items[0].bodyCount);
  }


  // データベースから取得した数値をprogressBarの設定で使う
  const data = {
    labels: ['心', '技', '体'],
    data: [heartCount, techniqueCount, bodyCount],
  };


  return (
    <View style={styles.progressBar}>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        strokeWidth={10}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />


      <View style={styles.todolist}>
        <View style={styles.todo}>
          <View style={styles.text}>
            <Text>心： </Text>
            {items.map(({ id, heart }) => (
              <TouchableOpacity key={id} onLongPress={() => { Alert.alert('', heart); }}>
                <Text style={styles.todoText} key={id} numberOfLines={1}>{heart}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('Heart')}>
              <Text style={styles.plus}>＊</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePlusHeart()}>
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.todo}>
          <View style={styles.text}>
            <Text>技： </Text>
            {items.map(({ id, technique }) => (
              <TouchableOpacity key={id} onLongPress={() => { Alert.alert('', technique); }}>
                <Text style={styles.todoText} key={id} numberOfLines={1}>{technique}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('Technique')}>
              <Text style={styles.plus}>＊</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePlusTechnique()}>
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.todo}>
          <View style={styles.text}>
            <Text>体： </Text>
            {items.map(({ id, body }) => (
              <TouchableOpacity key={id} onLongPress={() => { Alert.alert('', body); }}>
                <Text style={styles.todoText} key={id} numberOfLines={1}>{body}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('Body')}>
              <Text style={styles.plus}>＊</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePlusBody()}>
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.todo}>
          <View style={styles.text}>
            <Text style={styles.quit}>捨：</Text>
            {items.map(({ id, quit }) => (
              <TouchableOpacity key={id} onLongPress={() => { Alert.alert('', quit); }}>
                <Text style={styles.quit} key={id} numberOfLines={1}>{quit}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonQuit}>
            <TouchableOpacity onPress={() => navigation.navigate('Quit')}>
              <Text style={styles.editQuit}>＊</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// 最終的にエクスポートするコンポーネント
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
    height: Dimensions.get('window').height,
    backgroundColor: '#fffbf6',
  },
  progressBar: {
    marginTop: Dimensions.get('window').height * 0.13,
  },
  todolist: {
    margin: 25,
    // backgroundColor: 'yellow',
  },
  todo: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * 0.02,
    paddingTop: 20,
    paddingBottom: 20,
    // backgroundColor: 'blue',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    maxWidth: Dimensions.get('window').width * 0.5,
  },
  button: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    // backgroundColor: 'red',
  },
  plus: {
    fontSize: 13,
    backgroundColor: '#e6e3df',
    padding: 10,
    margin: 10,
  },
  quit: {
    color: '#B8B8B8',
    maxWidth: Dimensions.get('window').width * 0.5,
  },
  buttonQuit: {
    position: 'absolute',
    right: 52,
  },
  editQuit: {
    fontSize: 13,
    backgroundColor: '#e6e3df',
    padding: 10,
    margin: 10,
  },
});


export default StatusScreen;
