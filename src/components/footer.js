import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Bağlantı açılırken hata oluştu:', err));
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <Text style={styles.copyright}>&copy; {currentYear} Tüm hakları saklıdır</Text>
        <View style={styles.footerNav}>
          <TouchableOpacity onPress={() => openLink('/gizlilik-politikasi')}>
            <Text style={styles.navItem}>Gizlilik Politikası</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('/kullanim-sartlari')}>
            <Text style={styles.navItem}>Kullanım Şartları</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('/iletisim')}>
            <Text style={styles.navItem}>İletişim</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => openLink('https://twitter.com/kullanici_adi')}>
            <Text style={styles.socialLink}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://github.com/kullanici_adi')}>
            <Text style={styles.socialLink}>GitHub</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://linkedin.com/in/kullanici_adi')}>
            <Text style={styles.socialLink}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  footerContent: {
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    marginBottom: 10,
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  navItem: {
    marginHorizontal: 10,
    color: '#007AFF',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLink: {
    marginHorizontal: 10,
    color: '#007AFF',
  },
});

export default Footer;
