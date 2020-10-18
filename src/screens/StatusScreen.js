import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SQLite from 'expo-sqlite';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';


const db = SQLite.openDatabase('db');


const Items = () => {
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

  function handlePlusCount() {
    db.transaction(tx => {
      tx.executeSql(
        'update users set heartCount = round(heartCount + 0.01, 3) where id = 1;', null,
      );
      tx.executeSql('select * from users', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from users where id = 1;',
        null,
        (_, { rows: { _array } }) => setItems(_array),
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    return null;
  }

  let num;

  if (items[0].heartCount === Math.floor(items[0].heartCount)) {
    num = 1;
  } else {
    num = items[0].heartCount - Math.floor(items[0].heartCount);
  }


  const data = {
    labels: ['心', '技', '体'],
    data: [num, 0.3, 0.5],
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
      <TouchableOpacity style={styles.todo} onPress={() => handlePlusCount()}>
        <Text>心：</Text>
        {items.map(({ id, heart, heartCount }) => (
          <View key={id}>
            <Text>{heart}</Text>
            <Text>{heartCount}</Text>
          </View>
        ))}
      </TouchableOpacity>


      <TouchableOpacity style={styles.todo}>
        <Text>技：</Text>
        {items.map(({ id, technique }) => (
          <Text key={id}>{technique}</Text>
        ))}
      </TouchableOpacity>


      <TouchableOpacity style={styles.todo}>
        <Text>体：</Text>
        {items.map(({ id, body }) => (
          <Text key={id}>{body}</Text>
        ))}
      </TouchableOpacity>


      <View style={styles.todoQuit}>
        <Text style={styles.quit}>捨：</Text>
        {items.map(({ id, quit }) => (
          <Text style={styles.quit} key={id}>{quit}</Text>
        ))}
      </View>
    </View>
  );
};

const StatusScreen = () => {
  return (
    <View style={styles.container}>
      <Items />
    </View>
  );
};

// <WebView source={require('./graph.html')} startInLoadingState />


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
  todoQuit: {
    flexDirection: 'row',
    marginTop: 50,
    alignSelf: 'center',
  },
  quit: {
    color: '#FF6384',
  },
});

export default StatusScreen;
