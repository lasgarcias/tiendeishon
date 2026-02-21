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
  const FIRST_VISIBLE_IN_HOME = 6;
  const TOTAL_PRODUCTOS = 30;
  const whatsappBase = 'https://wa.me/5493515155620?text=';

  for (let index = FIRST_VISIBLE_IN_HOME + 1; index <= TOTAL_PRODUCTOS; index += 1) {
    const card = document.createElement('div');
    card.className = 'product-card reveal visible';

    card.innerHTML = `
      <div class="product-img">
        <img class="product-photo" src="Indumentaria/producto${index}.jpeg" alt="Producto ${index}" loading="lazy"/>
        <div class="product-hover">
          <a href="${whatsappBase}Hola Buenas. Quería consultar disponibilidad del producto ${index}" target="_blank">Consultar →</a>
        </div>
      </div>
      <div class="product-info">
        <h3>Producto ${index}</h3>
        <p>Consultá disponibilidad por WhatsApp</p>
      </div>
    `;

    productsAllGrid.appendChild(card);
  }
}
