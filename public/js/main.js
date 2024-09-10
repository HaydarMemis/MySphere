// Menü öğelerini ve açma düğmesini oluşturma
const menuToggle = document.createElement('div');
menuToggle.id = 'menu-toggle';
menuToggle.innerHTML = '<span></span>';
document.body.insertBefore(menuToggle, document.body.firstChild);

const menu = document.createElement('div');
menu.id = 'slide-menu';
document.body.insertBefore(menu, document.body.firstChild);

// Menü öğelerini oluşturma
const menuSections = [
    {
        title: 'Ana Menü',
        items: [
            { text: 'Ana Sayfa', href: '/', icon: 'home' },
            { text: 'Hakkımda', href: '#hakkimda', icon: 'user' },
            { text: 'Projeler', href: '#son-projeler', icon: 'folder' },
            { text: 'İletişim', href: '#iletisim', icon: 'envelope' }
        ]
    },
    {
        title: 'Hesap',
        items: [
            { text: 'Profil', href: '#profil', icon: 'user-circle' },
            { text: 'Ayarlar', href: '#ayarlar', icon: 'cog' },
            { text: 'Cüzdan', href: '#', icon: 'wallet', subMenu: [
                { text: 'Bakiye', href: '#bakiye', icon: 'money-bill' },
                { text: 'İşlemler', href: '#islemler', icon: 'exchange-alt' },
                { text: 'Para Yatır/Çek', href: '#para-islemleri', icon: 'hand-holding-usd' },
                { text: 'Ayarlar', href: '#cuzdanayarlar', icon: 'sliders-h' }
            ]},
            { text: 'Bildirimler', href: '#bildirimler', icon: 'bell' }
        ]
    },
    {
        title: 'Planlama',
        items: [
            { text: 'Takvim', href: '#', icon: 'calendar-alt', subMenu: [
                { text: 'Günlük', href: '#gunluk', icon: 'calendar-day' },
                { text: 'Haftalık', href: '#haftalik', icon: 'calendar-week' },
                { text: 'Aylık', href: '#aylik', icon: 'calendar-alt' },
                { text: 'Yıllık', href: '#yillik', icon: 'calendar' }
            ]},
            { text: 'Günlük', href: '#', icon: 'book', subMenu: [
                { text: 'Yeni Giriş', href: '#yenigiris', icon: 'plus-circle' },
                { text: 'Tüm Girdiler', href: '#tumgirdiler', icon: 'list' },
                { text: 'Etiketler', href: '#etiketler', icon: 'tags' },
                { text: 'Arama', href: '#gunluk-arama', icon: 'search' }
            ]},
            { text: 'Görevler', href: '#gorevler', icon: 'tasks' },
            { text: 'Hedefler', href: '#hedefler', icon: 'bullseye' }
        ]
    },
    {
        title: 'İçerik',
        items: [
            { text: 'Blog', href: '#blog', icon: 'rss' },
            { text: 'Galeri', href: '#galeri', icon: 'images' },
            { text: 'Dosyalar', href: '#dosyalar', icon: 'file-alt' },
            { text: 'Notlar', href: '#notlar', icon: 'sticky-note' }
        ]
    },
    {
        title: 'Araçlar',
        items: [
            { text: 'Hesap Makinesi', href: '#hesap-makinesi', icon: 'calculator' },
            { text: 'Döviz Çevirici', href: '#doviz-cevirici', icon: 'exchange-alt' },
            { text: 'Hava Durumu', href: '#hava-durumu', icon: 'cloud-sun' },
            { text: 'QR Kod Oluşturucu', href: '#qr-kod', icon: 'qrcode' }
        ]
    },
    {
        title: 'Yardım ve Destek',
        items: [
            { text: 'SSS', href: '#sss', icon: 'question-circle' },
            { text: 'İletişim Formu', href: '#iletisim-formu', icon: 'envelope' },
            { text: 'Kullanım Kılavuzu', href: '#kullanim-kilavuzu', icon: 'book-open' },
            { text: 'Geri Bildirim', href: '#geri-bildirim', icon: 'comment-alt' }
        ]
    }
];

function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    
    const link = document.createElement('a');
    link.href = item.href;
    link.innerHTML = `<i class="fas fa-${item.icon}"></i> ${item.text}`;
    menuItem.appendChild(link);

    if (item.subMenu) {
        const subMenu = document.createElement('div');
        subMenu.className = 'sub-menu';
        item.subMenu.forEach(subItem => {
            if (subItem.subMenu) {
                const subMenuItem = createMenuItem(subItem);
                subMenu.appendChild(subMenuItem);
            } else {
                const subLink = document.createElement('a');
                subLink.href = subItem.href;
                subLink.innerHTML = `<i class="fas fa-${subItem.icon}"></i> ${subItem.text}`;
                subMenu.appendChild(subLink);
            }
        });
        menuItem.appendChild(subMenu);

        link.addEventListener('click', (e) => {
            e.preventDefault();
            subMenu.classList.toggle('active');
        });
    }

    return menuItem;
}

menuSections.forEach((section, index) => {
    const sectionElement = document.createElement('div');
    sectionElement.className = 'menu-section';
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = section.title;
    sectionElement.appendChild(sectionTitle);

    section.items.forEach(item => {
        sectionElement.appendChild(createMenuItem(item));
    });

    menu.appendChild(sectionElement);

    // Bölümler arası çizgi ekleme
    if (index < menuSections.length - 1) {
        const divider = document.createElement('hr');
        divider.className = 'menu-divider';
        menu.appendChild(divider);
    }
});

// Arama özelliği ekleme
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Menüde ara...';
searchInput.className = 'menu-search';
menu.insertBefore(searchInput, menu.firstChild);

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const menuItems = menu.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// CSS stillerini ekleme
const style = document.createElement('style');
style.textContent = `
    #menu-toggle {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #menu-toggle span {
        display: block;
        width: 20px;
        height: 2px;
        background-color: var(--text-color);
        transition: all 0.3s ease;
    }
    #menu-toggle span::before,
    #menu-toggle span::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        background-color: var(--text-color);
        transition: all 0.3s ease;
    }
    #menu-toggle span::before {
        transform: translateY(-6px);
    }
    #menu-toggle span::after {
        transform: translateY(6px);
    }
    body.menu-open #menu-toggle span {
        background-color: transparent;
    }
    body.menu-open #menu-toggle span::before {
        transform: rotate(45deg);
    }
    body.menu-open #menu-toggle span::after {
        transform: rotate(-45deg);
    }
    #slide-menu {
        position: fixed;
        left: -300px;
        top: 0;
        width: 280px;
        height: 100%;
        background-color: var(--header-bg);
        transition: 0.3s;
        z-index: 999;
        padding-top: 60px;
        box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--accent-color) var(--header-bg);
    }
    #slide-menu::-webkit-scrollbar {
        width: 6px;
    }
    #slide-menu::-webkit-scrollbar-track {
        background: var(--header-bg);
    }
    #slide-menu::-webkit-scrollbar-thumb {
        background-color: var(--accent-color);
        border-radius: 3px;
    }
    .menu-search {
        width: 90%;
        margin: 5px auto;
        padding: 6px;
        border: none;
        border-radius: 20px;
        background-color: rgba(255,255,255,0.1);
        color: var(--text-color);
        font-size: 0.6em;
    }
    .menu-section {
        margin-bottom: 5px;
    }
    .menu-section h3 {
        padding: 4px 15px;
        margin: 0;
        font-size: 0.6em;
        text-transform: uppercase;
        color: var(--accent-color);
        letter-spacing: 0.5px;
    }
    .menu-item {
        position: relative;
    }
    .menu-item > a {
        display: flex;
        align-items: center;
        padding: 3px 15px;
        color: var(--text-color);
        text-decoration: none;
        transition: 0.3s;
        font-size: 0.65em;
        letter-spacing: 0.3px;
    }
    .menu-item > a:hover {
        background-color: rgba(255,255,255,0.1);
    }
    .menu-item > a i {
        margin-right: 8px;
        width: 16px;
        text-align: center;
    }
    .sub-menu {
        display: none;
        background-color: rgba(0,0,0,0.05);
    }
    .sub-menu.active {
        display: block;
    }
    .sub-menu a {
        display: flex;
        align-items: center;
        padding: 2px 15px 2px 25px;
        color: var(--text-color);
        text-decoration: none;
        transition: 0.3s;
        font-size: 0.6em;
    }
    .sub-menu a:hover {
        background-color: rgba(255,255,255,0.1);
    }
    .sub-menu a i {
        margin-right: 8px;
        width: 16px;
        text-align: center;
    }
    body.menu-open #slide-menu {
        left: 0;
    }
    .menu-divider {
        border: none;
        border-top: 1px solid rgba(255,255,255,0.1);
        margin: 4px 0;
    }
`;
document.head.appendChild(style);

// Menüyü açma/kapama işlevi
menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
});

// Menü dışına tıklandığında menüyü kapatma
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
        document.body.classList.remove('menu-open');
    }
});

// Pencere yeniden boyutlandırıldığında menüyü kapatma
window.addEventListener('resize', () => {
    document.body.classList.remove('menu-open');
});

// Menü kaydırma sorununu çözmek için
menu.addEventListener('wheel', (e) => {
    e.stopPropagation();
});

// Profil bölümü ekleme
const profileSection = document.createElement('div');
profileSection.className = 'profile-section';
profileSection.innerHTML = `
    <img src="path/to/profile-image.jpg" alt="Profil Resmi" class="profile-image">
    <h2 class="profile-name">Kullanıcı Adı</h2>
    <p class="profile-title">Unvan veya Pozisyon</p>
`;
menu.insertBefore(profileSection, menu.firstChild);

// Profil bölümü için CSS
style.textContent += `
    .profile-section {
        text-align: center;
        padding: 10px 0;
        background-color: rgba(0,0,0,0.1);
        margin-bottom: 5px;
    }
    .profile-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--accent-color);
    }
    .profile-name {
        margin: 5px 0 2px;
        font-size: 0.8em;
        color: var(--text-color);
    }
    .profile-title {
        margin: 0;
        font-size: 0.6em;
        color: var(--accent-color);
    }
`;
