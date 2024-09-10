import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinanceTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('financeTransactions');
      if (storedTransactions !== null) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error('İşlemler yüklenirken hata oluştu:', error);
    }
  };

  const saveTransaction = async () => {
    if (description && amount) {
      const newTransaction = {
        id: Date.now().toString(),
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      };

      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      setDescription('');
      setAmount('');

      try {
        await AsyncStorage.setItem('financeTransactions', JSON.stringify(updatedTransactions));
      } catch (error) {
        console.error('İşlem kaydedilirken hata oluştu:', error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>{item.description}</Text>
      <Text>{item.amount.toFixed(2)} TL</Text>
      <Text>{new Date(item.date).toLocaleDateString('tr-TR')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finans Takipçisi</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Açıklama"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Miktar"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Button title="Ekle" onPress={saveTransaction} />
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FinanceTracker;
