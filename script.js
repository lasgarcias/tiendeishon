// Header scroll effect
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Menú mobile
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// Animaciones scroll con IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
  observer.observe(el);
});

// Productos dinámicos para la página de "ver todo"
const productsAllGrid = document.getElementById('products-all-grid');
if (productsAllGrid) {
  const whatsappBase = 'https://wa.me/5493515155620?text=';
  const catalogFiles = [
    'musculosa.jpeg',
    'conjunto.jpeg',
    'top.jpeg',
    'vestidos.jpeg',
    'short.jpeg',
    'short (3).jpeg',
    'pantalon (3).jpeg',
    'pantalon.jpeg',
    'vestido (1).jpeg',
    'remera (1).jpeg',
    'top (2).jpeg',
    'tops.jpeg',
    'chaleco.jpeg',
    'chaleco (2).jpeg',
    'bermuda.jpeg',
    'body.jpeg',
    'vestido.jpeg',
    'pantalon (2).jpeg',
    'musculosa balloon.jpeg',
    'vestido (2).jpeg',
    'short (2).jpeg',
    'remera (2).jpeg',
    'chaleco inflable.jpeg'
  ];

  const toDisplayName = (fileName) => fileName
    .replace(/\.jpe?g$/i, '')
    .replace(/\s*\(\d+\)$/, '')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  catalogFiles.forEach((fileName) => {
    const productName = toDisplayName(fileName);
    const card = document.createElement('div');
    card.className = 'product-card reveal visible';

    card.innerHTML = `
      <div class="product-img">
        <img class="product-photo" src="Indumentaria tienda web/${fileName}" alt="${productName}" loading="lazy"/>
        <div class="product-hover">
          <a href="${whatsappBase}Hola Buenas. Quería consultar disponibilidad de ${productName}" target="_blank">Consultar →</a>
        </div>
      </div>
      <div class="product-info">
        <h3>${productName}</h3>
        <p>Consultá disponibilidad por WhatsApp</p>
      </div>
    `;

    productsAllGrid.appendChild(card);
  });
}
