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
    'bermuda Caro.jpeg',
    'blusa alba.jpeg',
    'blusa gaia.jpeg',
    'body.jpeg',
    'camisa juno (2).jpeg',
    'camisa juno (3).jpeg',
    'camisa juno (4).jpeg',
    'camisa juno.jpeg',
    'chaleco Ada.jpeg',
    'chaleco Icon.jpeg',
    'chaleco Jaz.jpeg',
    'chaleco aura.jpeg',
    'chaleco cloe.jpeg',
    'chaleco rhea (2).jpeg',
    'chaleco rhea (3).jpeg',
    'chaleco rhea.jpeg',
    'musculosa balloon.jpeg',
    'musculosa eira.jpeg',
    'musculosa jana.jpeg',
    'musculosa nox (2).jpeg',
    'musculosa nox (3).jpeg',
    'musculosa nox (4).jpeg',
    'musculosa nox.jpeg',
    'musculosa onix (2).jpeg',
    'musculosa onix (3).jpeg',
    'musculosa onix (4).jpeg',
    'musculosa onix.jpeg',
    'pantalon gala (2).jpeg',
    'pantalon gala (3).jpeg',
    'pantalon gala.jpeg',
    'patalon.jpeg',
    'pollera pantalon nova (2).jpeg',
    'pollera pantalon nova (3).jpeg',
    'pollera pantalon nova.jpeg',
    'remera bali (2).jpeg',
    'remera bali.jpeg',
    'remera chiao bella.jpeg',
    'remera fay.jpeg',
    'remera ger.jpeg',
    'remera iza.jpeg',
    'remera mare.jpeg',
    'remera margo (2).jpeg',
    'remera margo.jpeg',
    'remera ray.jpeg',
    'remera sian (2).jpeg',
    'remera sian.jpeg',
    'remera sun (2).jpeg',
    'remera sun.jpeg',
    'remera vita (2).jpeg',
    'remera vita.jpeg',
    'short lumi (2).jpeg',
    'short lumi (3).jpeg',
    'short lumi.jpeg',
    'short noa (2).jpeg',
    'short noa (3).jpeg',
    'short noa.jpeg',
    'short ona.jpeg',
    'short rua.jpeg',
    'short tora (2).jpeg',
    'short tora.jpeg',
    'top dara (2).jpeg',
    'top dara (3).jpeg',
    'top dara (4).jpeg',
    'top dara (5).jpeg',
    'top dara.jpeg',
    'top kala (1).jpeg',
    'top kala (2).jpeg',
    'top kala (3).jpeg',
    'top lila (2).jpeg',
    'top lila.jpeg',
    'top vera.jpeg',
    'top zoe.jpeg',
    'tops lola.jpeg',
    'vestido flora.jpeg',
    'vestido gema (2).jpeg',
    'vestido gema.jpeg',
    'vestido kyra.jpeg',
  ];

  const removeExtension = (fileName) => fileName.replace(/\.jpe?g$/i, '');
  const normalizeProductKey = (fileName) => removeExtension(fileName)
    .replace(/\s*\(\d+\)$/, '')
    .trim()
    .toLowerCase();
  const toDisplayName = (fileName) => removeExtension(fileName)
    .replace(/\s*\(\d+\)$/, '')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const productsMap = new Map();
  catalogFiles.forEach((fileName) => {
    const key = normalizeProductKey(fileName);
    if (!productsMap.has(key)) {
      productsMap.set(key, {
        name: toDisplayName(fileName),
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
