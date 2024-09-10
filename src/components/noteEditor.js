import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteEditor = () => {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const storedNote = await AsyncStorage.getItem('userNote');
      if (storedNote !== null) {
        setNote(storedNote);
        setSavedNote(storedNote);
      }
    } catch (error) {
      console.error('Not yüklenirken hata oluştu:', error);
    }
  };

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem('userNote', note);
      setSavedNote(note);
      alert('Not başarıyla kaydedildi!');
    } catch (error) {
      console.error('Not kaydedilirken hata oluştu:', error);
      alert('Not kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Not Düzenleyici</Text>
      <TextInput
        style={styles.input}
        multiline
        value={note}
        onChangeText={setNote}
        placeholder="Notunuzu buraya yazın..."
      />
      <Button title="Notu Kaydet" onPress={saveNote} />
      {savedNote !== '' && (
        <View style={styles.savedNoteContainer}>
          <Text style={styles.savedNoteTitle}>Kaydedilen Not:</Text>
          <Text style={styles.savedNoteText}>{savedNote}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  savedNoteContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  savedNoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedNoteText: {
    fontSize: 16,
  },
});

export default NoteEditor;
