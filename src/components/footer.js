import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Tüm hakları saklıdır</p>
        <nav className="footer-nav">
          <ul>
            <li><a href="/gizlilik-politikasi">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-sartlari">Kullanım Şartları</a></li>
            <li><a href="/iletisim">İletişim</a></li>
          </ul>
        </nav>
        <div className="social-links">
          <a href="https://twitter.com/kullanici_adi" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com/kullanici_adi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/kullanici_adi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
