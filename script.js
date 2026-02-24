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
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el) => {
    observer.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
}

// Productos dinámicos para la página de "ver todo"
const productsAllGrid = document.getElementById('products-all-grid');
if (productsAllGrid) {
  const whatsappBase = 'https://wa.me/5493515155620?text=';
  const catalogFiles = [
    'bermuda.jpeg',
    'body.jpeg',
    'chaleco.jpeg',
    'chaleco (2).jpeg',
    'chaleco inflable.jpeg',
    'conjunto.jpeg',
    'musculosa.jpeg',
    'musculosa balloon.jpeg',
    'pantalon.jpeg',
    'pantalon (2).jpeg',
    'pantalon (3).jpeg',
    'remera (1).jpeg',
    'remera (2).jpeg',
    'short.jpeg',
    'short (2).jpeg',
    'short (3).jpeg',
    'top.jpeg',
    'top (2).jpeg',
    'tops.jpeg',
    'vestido.jpeg',
    'vestido (1).jpeg',
    'vestido (2).jpeg',
    'vestidos.jpeg'
  ];

  const removeExtension = (fileName) => fileName.replace(/\.jpe?g$/i, '');
  const normalizeProductKey = (fileName) => removeExtension(fileName)
    .replace(/\s*\(\d+\)$/, '')
    .trim()
    .toLowerCase();
  const toDisplayName = (fileName) => removeExtension(fileName)
    .replace(/\s*\(\d+\)$/, '')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const productNames = {
    remera: 'Juno',
    pantalon: 'Dara',
    top: 'Onix',
    short: 'Mora',
    vestido: 'Luna',
    vestidos: 'Luna',
    musculosa: 'Atenea',
    'musculosa balloon': 'Atenea Balloon',
    chaleco: 'Nilo',
    'chaleco inflable': 'Nilo Inflable',
    bermuda: 'Siena',
    body: 'Selene',
    conjunto: 'Aura',
    tops: 'Onix'
  };

  const productsMap = new Map();
  catalogFiles.forEach((fileName) => {
    const key = normalizeProductKey(fileName);
    if (!productsMap.has(key)) {
      productsMap.set(key, {
        name: productNames[key] || toDisplayName(fileName),
        images: []
      });
    }
    productsMap.get(key).images.push(fileName);
  });

  const buildWhatsappUrl = (productName) => `${whatsappBase}${encodeURIComponent(`Hola Buenas. Quería consultar disponibilidad de ${productName}`)}`;

  productsMap.forEach((product) => {
    let currentImageIndex = 0;

    const card = document.createElement('div');
    card.className = 'product-card reveal visible';
    card.innerHTML = `
      <div class="product-img">
        <img class="product-photo" src="Indumentaria tienda web/${product.images[currentImageIndex]}" alt="${product.name}" loading="lazy"/>
        ${product.images.length > 1 ? `
          <div class="product-gallery-controls" aria-label="Vistas de ${product.name}">
            <button type="button" class="gallery-arrow prev" aria-label="Imagen anterior">‹</button>
            <span class="gallery-counter">1/${product.images.length}</span>
            <button type="button" class="gallery-arrow next" aria-label="Imagen siguiente">›</button>
          </div>
        ` : ''}
        <div class="product-hover">
          <a class="catalog-whatsapp-link" href="${buildWhatsappUrl(product.name)}" target="_blank">Consultar →</a>
        </div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Consultá disponibilidad por WhatsApp</p>
      </div>
    `;

    if (product.images.length > 1) {
      const imageEl = card.querySelector('.product-photo');
      const whatsappLink = card.querySelector('.catalog-whatsapp-link');
      const counter = card.querySelector('.gallery-counter');
      const prevBtn = card.querySelector('.gallery-arrow.prev');
      const nextBtn = card.querySelector('.gallery-arrow.next');

      const updateImage = () => {
        imageEl.src = `Indumentaria tienda web/${product.images[currentImageIndex]}`;
        counter.textContent = `${currentImageIndex + 1}/${product.images.length}`;
        whatsappLink.href = buildWhatsappUrl(product.name);
      };

      prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
        updateImage();
      });

      nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % product.images.length;
        updateImage();
      });
    }

    productsAllGrid.appendChild(card);
  });

}
