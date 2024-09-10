// Ana fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde çalışacak kodlar
    console.log('Sayfa yüklendi');

    // Sayfa içeriğini yükleme fonksiyonu
    function icerigiYukle(bolumId) {
        const bolum = document.getElementById(bolumId);
        if (bolum) {
            const icerikYeri = bolum.querySelector('.content-placeholder');
            if (icerikYeri) {
                icerikYeri.textContent = `${bolumId.charAt(0).toUpperCase() + bolumId.slice(1)} içeriği yükleniyor...`;
                // Burada gerçek içerik yükleme işlemleri yapılabilir
            }
        }
    }

    // Smooth scroll için
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modern açılır kapanır menü oluşturma
    const sidebarToggle = document.createElement('button');
    sidebarToggle.classList.add('sidebar-toggle');
    sidebarToggle.innerHTML = '<div class="hamburger"><span></span><span></span><span></span></div>';
    document.body.insertBefore(sidebarToggle, document.body.firstChild);

    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
    document.body.insertBefore(sidebar, document.body.firstChild);

    sidebarToggle.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-open');
        sidebarToggle.classList.toggle('active');
    });

    // Sayfa dışına tıklandığında menüyü kapatma
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && document.body.classList.contains('sidebar-open')) {
            document.body.classList.remove('sidebar-open');
            sidebarToggle.classList.remove('active');
        }
    });

    // Animasyonlu giriş efekti
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Sidebar stillerini ekleme
    const style = document.createElement('style');
    style.textContent = `
        .sidebar-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: transparent;
            border: none;
            cursor: pointer;
            width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .hamburger {
            width: 30px;
            height: 20px;
            position: relative;
        }
        .hamburger span {
            display: block;
            position: absolute;
            height: 3px;
            width: 100%;
            background: #e0e0e0;
            border-radius: 3px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
        }
        .hamburger span:nth-child(1) {
            top: 0px;
        }
        .hamburger span:nth-child(2) {
            top: 8px;
        }
        .hamburger span:nth-child(3) {
            top: 16px;
        }
        .sidebar-toggle.active .hamburger span:nth-child(1) {
            top: 8px;
            transform: rotate(135deg);
        }
        .sidebar-toggle.active .hamburger span:nth-child(2) {
            opacity: 0;
            left: -60px;
        }
        .sidebar-toggle.active .hamburger span:nth-child(3) {
            top: 8px;
            transform: rotate(-135deg);
        }
        .sidebar {
            position: fixed;
            top: 0;
            left: -300px;
            width: 300px;
            height: 100%;
            background-color: rgba(30, 30, 30, 0.95);
            transition: left 0.3s ease;
            z-index: 1000;
            padding-top: 80px;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
        }
        body.sidebar-open .sidebar {
            left: 0;
        }
        body {
            background-color: #0a0a0a;
            color: #e0e0e0;
            padding-top: 60px;
        }
        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 999;
            background-color: #1e1e1e;
            padding: 10px 0;
        }
    `;
    document.head.appendChild(style);
});
