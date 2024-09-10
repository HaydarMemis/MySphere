import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalDataManager = () => {
  const [personalData, setPersonalData] = useState([]);
  const [newDataKey, setNewDataKey] = useState('');
  const [newDataValue, setNewDataValue] = useState('');

  useEffect(() => {
    veriYukle();
  }, []);

  const veriYukle = async () => {
    try {
      const kaydedilmisVeri = await AsyncStorage.getItem('kisiselVeri');
      if (kaydedilmisVeri !== null) {
        setPersonalData(JSON.parse(kaydedilmisVeri));
      }
    } catch (hata) {
      console.error('Veri yüklenirken hata oluştu:', hata);
    }
  };

  const veriKaydet = async () => {
    if (newDataKey && newDataValue) {
      const yeniVeri = {
        id: Date.now().toString(),
        key: newDataKey,
        value: newDataValue,
      };

      const guncellenmisVeri = [...personalData, yeniVeri];
      setPersonalData(guncellenmisVeri);
      setNewDataKey('');
      setNewDataValue('');

      try {
        await AsyncStorage.setItem('kisiselVeri', JSON.stringify(guncellenmisVeri));
      } catch (hata) {
        console.error('Veri kaydedilirken hata oluştu:', hata);
      }
    }
  };

  const veriGoster = ({ item }) => (
    <View style={stiller.veriOgesi}>
      <Text style={stiller.veriAnahtar}>{item.key}:</Text>
      <Text style={stiller.veriDeger}>{item.value}</Text>
    </View>
  );

  return (
    <View style={stiller.konteyner}>
      <Text style={stiller.baslik}>Kişisel Veri Yöneticisi</Text>
      <View style={stiller.girisAlani}>
        <TextInput
          style={stiller.girdi}
          placeholder="Anahtar"
          value={newDataKey}
          onChangeText={setNewDataKey}
        />
        <TextInput
          style={stiller.girdi}
          placeholder="Değer"
          value={newDataValue}
          onChangeText={setNewDataValue}
        />
        <Button title="Veri Ekle" onPress={veriKaydet} />
      </View>
      <FlatList
        data={personalData}
        renderItem={veriGoster}
        keyExtractor={(item) => item.id}
        style={stiller.liste}
      />
    </View>
  );
};

const stiller = StyleSheet.create({
  konteyner: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  baslik: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  girisAlani: {
    marginBottom: 20,
  },
  girdi: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  liste: {
    flex: 1,
  },
  veriOgesi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  veriAnahtar: {
    fontWeight: 'bold',
  },
  veriDeger: {
    flex: 1,
    marginLeft: 10,
  },
});

export default PersonalDataManager;
