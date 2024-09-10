import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyLog = () => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const storedLogs = await AsyncStorage.getItem('dailyLogs');
      if (storedLogs !== null) {
        setLogs(JSON.parse(storedLogs));
      }
    } catch (error) {
      console.error('Günlük kayıtları yüklenirken hata oluştu:', error);
    }
  };

  const saveLogs = async (updatedLogs) => {
    try {
      await AsyncStorage.setItem('dailyLogs', JSON.stringify(updatedLogs));
    } catch (error) {
      console.error('Günlük kayıtları kaydedilirken hata oluştu:', error);
    }
  };

  const addLog = () => {
    if (newLog.trim() !== '') {
      const updatedLogs = [...logs, { id: Date.now().toString(), text: newLog, date: new Date().toLocaleString() }];
      setLogs(updatedLogs);
      saveLogs(updatedLogs);
      setNewLog('');
    }
  };

  const renderLogItem = ({ item }) => (
    <View style={styles.logItem}>
      <Text style={styles.logText}>{item.text}</Text>
      <Text style={styles.logDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Günlük Kayıtlar</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newLog}
          onChangeText={setNewLog}
          placeholder="Yeni günlük kaydı ekle"
        />
        <Button title="Ekle" onPress={addLog} />
      </View>
      <FlatList
        data={logs}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  list: {
    flex: 1,
  },
  logItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  logText: {
    fontSize: 16,
  },
  logDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default DailyLog;
