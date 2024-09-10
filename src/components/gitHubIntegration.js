import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octokit } from '@octokit/rest';

const GitHubIntegration = () => {
  const [repositories, setRepositories] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedUsername();
  }, []);

  const loadSavedUsername = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('githubUsername');
      if (savedUsername) {
        setUsername(savedUsername);
        fetchRepositories(savedUsername);
      }
    } catch (error) {
      console.error('Kullanıcı adı yüklenirken hata oluştu:', error);
    }
  };

  const saveUsername = async (newUsername) => {
    try {
      await AsyncStorage.setItem('githubUsername', newUsername);
    } catch (error) {
      console.error('Kullanıcı adı kaydedilirken hata oluştu:', error);
    }
  };

  const fetchRepositories = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const octokit = new Octokit();
      const response = await octokit.repos.listForUser({
        username: user,
        sort: 'updated',
        per_page: 10
      });
      setRepositories(response.data);
      saveUsername(user);
    } catch (error) {
      setError('Depolar yüklenirken bir hata oluştu. Lütfen kullanıcı adını kontrol edin.');
      console.error('GitHub API hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (username.trim()) {
      fetchRepositories(username.trim());
    }
  };

  const renderRepositoryItem = ({ item }) => (
    <View style={styles.repoItem}>
      <Text style={styles.repoName}>{item.name}</Text>
      <Text style={styles.repoDescription}>{item.description}</Text>
      <Text style={styles.repoLanguage}>Dil: {item.language || 'Belirtilmemiş'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHub Entegrasyonu</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="GitHub kullanıcı adı"
          value={username}
          onChangeText={setUsername}
        />
        <Button title="Depoları Getir" onPress={handleSubmit} />
      </View>
      {loading && <Text>Yükleniyor...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={repositories}
        renderItem={renderRepositoryItem}
        keyExtractor={(item) => item.id.toString()}
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
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  repoItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  repoDescription: {
    marginTop: 5,
    color: '#666',
  },
  repoLanguage: {
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default GitHubIntegration;
