import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db');


const Items = () => {
  const [items, setItems] = useState(null);

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

  return (
    <View style={styles.todolist}>
      <View style={styles.todo}>
        <Text>心：</Text>
        {items.map(({ id, heart }) => (
          <Text key={id}>{heart}</Text>
        ))}
      </View>
      <View style={styles.todo}>
        <Text>技：</Text>
        {items.map(({ id, technique }) => (
          <Text key={id}>{technique}</Text>
        ))}
      </View>
      <View style={styles.todo}>
        <Text>体：</Text>
        {items.map(({ id, body }) => (
          <Text key={id}>{body}</Text>
        ))}
      </View>
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
      <WebView
        source={require('./graph.html')}
        startInLoadingState
      />
      <Items />
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
