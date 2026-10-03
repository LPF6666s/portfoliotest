// ============================================================
// HERO CAROUSEL (donja polovina desne strane) - 10 slika, 3 vidljive
// ============================================================

const heroSlides = [
  { src: 'images/grafika/Grafika 5.jpg',  title: 'Grafika 5' },
  { src: 'images/grafika/Grafika 9.jpg',  title: 'Grafika 9' },
  { src: 'images/aktovi/Akt 15.jpg',      title: 'Akt 15' },
  { src: 'images/slike/Slika 25.jpg',     title: 'Slika 25' },
  { src: 'images/grafika/Grafika 15.jpg', title: 'Grafika 15' },
  { src: 'images/grafika/Grafika 1.jpg',  title: 'Grafika 1' },
  { src: 'images/aktovi/Akt 3.jpg',       title: 'Akt 3' },
  { src: 'images/slike/Slika 5.jpg',      title: 'Slika 5' },
  { src: 'images/crtezi/Crtez 2.jpg',     title: 'Crtež 2' },
  { src: 'images/instalacije/Instalacija 1.jpg', title: 'Instalacija 1' }
];

// koliko slika je vidljivo: 3 na desktopu, 2 na tabletu/mobitelu
function heroVisible() {
  return window.innerWidth <= 860 ? 2 : 3;
}
let HERO_VISIBLE = heroVisible();
let heroCurrentIndex = 0;            // index prve vidljive slike (0 .. maxIndex)
let heroInterval = null;

function heroMaxIndex() {
  return Math.max(0, heroSlides.length - HERO_VISIBLE);
}

function initHeroSlider() {
  const track = document.getElementById('heroCarouselTrack');
  const dotsContainer = document.getElementById('heroSlideDots');

  if (!track || !dotsContainer) return;

  // Kreiraj slajdove
  heroSlides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = 'hero-carousel-slide';
    slideEl.innerHTML = `<img src="${slide.src}" alt="${slide.title}" loading="${index < HERO_VISIBLE ? 'eager' : 'lazy'}" />`;
    track.appendChild(slideEl);
  });

  // Kreiraj dot za svaku validnu poziciju (uvijek 3 puna slajda vidljiva)
  const maxIndex = heroMaxIndex();
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('button');
    dot.className = 'hero-slide-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => heroGoToSlide(i);
    dotsContainer.appendChild(dot);
  }

  document.getElementById('heroCarouselTrack').parentElement.style.setProperty('--hero-visible', HERO_VISIBLE);
  updateHeroTrack();
  startHeroAutoSlide();
}

// kad se promijeni širina (rotacija telefona, resize) ponovo izgradi carousel
let heroLastVisible = HERO_VISIBLE;
window.addEventListener('resize', function() {
  const v = heroVisible();
  if (v === heroLastVisible) return;
  heroLastVisible = v;
  HERO_VISIBLE = v;
  heroCurrentIndex = 0;
  const track = document.getElementById('heroCarouselTrack');
  const dots = document.getElementById('heroSlideDots');
  if (!track || !dots) return;
  track.innerHTML = '';
  dots.innerHTML = '';
  initHeroSlider();
});

function updateHeroTrack() {
  const track = document.getElementById('heroCarouselTrack');
  const dots = document.querySelectorAll('.hero-slide-dot');

  if (!track) return;

  const slideWidthPct = 100 / HERO_VISIBLE;
  track.style.transform = `translateX(-${heroCurrentIndex * slideWidthPct}%)`;

  dots.forEach((d, i) => d.classList.toggle('active', i === heroCurrentIndex));
}

function heroGoToSlide(index) {
  const maxIndex = heroMaxIndex();
  heroCurrentIndex = Math.max(0, Math.min(index, maxIndex));
  updateHeroTrack();
  resetHeroAutoSlide();
}

function heroNextSlide() {
  const maxIndex = heroMaxIndex();
  heroCurrentIndex = heroCurrentIndex >= maxIndex ? 0 : heroCurrentIndex + 1;
  updateHeroTrack();
  resetHeroAutoSlide();
}

function heroPrevSlide() {
  const maxIndex = heroMaxIndex();
  heroCurrentIndex = heroCurrentIndex <= 0 ? maxIndex : heroCurrentIndex - 1;
  updateHeroTrack();
  resetHeroAutoSlide();
}

function startHeroAutoSlide() {
  stopHeroAutoSlide();
  heroInterval = setInterval(heroNextSlide, 4000);
}

function stopHeroAutoSlide() {
  if (heroInterval) { clearInterval(heroInterval); heroInterval = null; }
}

function resetHeroAutoSlide() {
  stopHeroAutoSlide();
  startHeroAutoSlide();
}

// ============================================================
// GALERIJA - 4×6 grid, thumbnailovi, paginacija
// ============================================================

let sveSlike = [];
const PO_STRANICI = 24;
let trenutnaStranica = 1;
let aktivnaKategorija = 'sve';

function ucitajGaleriju() {
  const grid = document.getElementById('gg');
  if (!grid) return;
  
  const loader = document.getElementById('gal-loading');

  fetch('galerija.json')
    .then(res => {
      if (!res.ok) throw new Error('greska pri ucitavanju: ' + res.status);
      return res.json();
    })
    .then(data => {
      // JSON fajl sadrži direktno array slika
      sveSlike = Array.isArray(data) ? data : [];
      
      if (loader) loader.style.display = 'none';
      
      if (sveSlike.length === 0) {
        if (loader) loader.textContent = 'nema slika u galeriji';
      } else {
        prikaziSlike('sve', 1);
      }
    })
    .catch(err => {
      if (loader) {
        loader.textContent = 'greska pri ucitavanju: ' + err.message;
        loader.style.color = 'var(--red)';
      }
      console.error('greska:', err);
    });
}

function prikaziSlike(kat, stranica = 1) {
  const grid = document.getElementById('gg');
  if (!grid) return;
  
  if (stranica === 1) {
    grid.innerHTML = '';
    trenutnaStranica = 1;
    aktivnaKategorija = kat;
  }
  
  let prikazano = 0;
  let brojac = (stranica - 1) * PO_STRANICI + 1;
  let indexPocetak = (stranica - 1) * PO_STRANICI;
  let filtrirane = [];
  
  sveSlike.forEach((slika, index) => {
    if (kat === 'sve' || slika.kat === kat) {
      filtrirane.push({ slika, index });
    }
  });
  
  for (let i = indexPocetak; i < Math.min(indexPocetak + PO_STRANICI, filtrirane.length); i++) {
    const { slika, index } = filtrirane[i];
    
    const item = document.createElement('div');
    item.className = 'gi';
    item.dataset.index = index;
    item.onclick = function() { ol(index); };
    
    const thumbSrc = slika.putanja.replace('/webp/', '/thumbnails/');
    
    item.innerHTML = `
      <div class="gi-inner">
        <img src="${thumbSrc}" alt="${slika.naziv}" loading="lazy" decoding="async" onerror="this.src='${slika.putanja}'" />
        <div class="gi-ov">
          <span class="gi-title">${slika.naziv}</span>
          <span class="gi-cat">${slika.kat}</span>
        </div>
        <span class="gi-num">${String(brojac++).padStart(2, '0')}</span>
      </div>
    `;
    grid.appendChild(item);
    prikazano++;
  }
  
  dodajLoadMore(kat, filtrirane.length);
}

function dodajLoadMore(kat, ukupnoFiltriranih) {
  const staro = document.getElementById('load-more');
  if (staro) staro.remove();
  
  const prikazano = trenutnaStranica * PO_STRANICI;
  
  if (prikazano < ukupnoFiltriranih) {
    const grid = document.getElementById('gg');
    const btnContainer = document.createElement('div');
    btnContainer.id = 'load-more';
    btnContainer.style.cssText = 'grid-column:1/-1; text-align:center; padding:40px 0;';
    
    const preostalo = ukupnoFiltriranih - prikazano;
    btnContainer.innerHTML = `<button onclick="ucitajJos('${kat}')" class="btn-load-more">Učitaj još (${preostalo} preostalo)</button>`;
    grid.appendChild(btnContainer);
  }
}

function ucitajJos(kat) {
  trenutnaStranica++;
  const staro = document.getElementById('load-more');
  if (staro) staro.remove();
  prikaziSlike(kat, trenutnaStranica);
}

function fg(kat) {
  document.querySelectorAll('.fb').forEach(btn => btn.classList.remove('on'));
  if (event && event.target) event.target.classList.add('on');
  trenutnaStranica = 1;
  prikaziSlike(kat, 1);
}

// ============================================================
// LIGHTBOX sa navigacijom
// ============================================================

let trenutniIndex = 0;

function ol(index) {
  trenutniIndex = index;
  prikaziLightboxSliku();
  document.getElementById('lb').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function prikaziLightboxSliku() {
  const lbImg = document.getElementById('lbImg');
  const slika = sveSlike[trenutniIndex];
  if (lbImg && slika) {
    lbImg.src = slika.original || slika.putanja;
  }
}

function prevSlika() {
  trenutniIndex = (trenutniIndex - 1 + sveSlike.length) % sveSlike.length;
  prikaziLightboxSliku();
}

function nextSlika() {
  trenutniIndex = (trenutniIndex + 1) % sveSlike.length;
  prikaziLightboxSliku();
}

function cl() {
  document.getElementById('lb').classList.remove('on');
  document.body.style.overflow = '';
}

// Tastatura
document.addEventListener('keydown', function(e) {
  const lb = document.getElementById('lb');
  if (e.key === 'Escape') { cl(); mmClose(); }
  if (!lb || !lb.classList.contains('on')) return;
  if (e.key === 'ArrowLeft') prevSlika();
  if (e.key === 'ArrowRight') nextSlika();
});

// ============================================================
// USLUGE - "Learn more" (razvuci karticu i prikazi detalje)
// ============================================================

function srvToggle(el) {
  const card = el.closest('.srv');
  if (!card) return;

  const otvorena = card.classList.toggle('open');
  el.textContent = otvorena ? 'Show less ←' : 'Learn more →';
}

// ============================================================
// BIOGRAFIJA - Tabovi (About / Education / Style / Awards)
// ============================================================

function bioTab(naziv) {
  document.querySelectorAll('.bio-tab').forEach(btn => btn.classList.remove('on'));
  if (event && event.target) event.target.classList.add('on');

  document.querySelectorAll('.bio-panel').forEach(panel => panel.classList.remove('on'));
  const panel = document.getElementById('bp-' + naziv);
  if (panel) panel.classList.add('on');
}

// ============================================================
// HAMBURGER MENI
// ============================================================

let menuOpen = false;

function mmClose() {
  menuOpen = false;
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger) burger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
      menuOpen = !menuOpen;
      if (menuOpen) {
        burger.classList.add('open');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mmClose();
      }
    });
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) mmClose();
    });
  }
});

// ============================================================
// SCROLL REVEAL
// ============================================================

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.gi, .srv, .bio-img').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
  });
});

// ============================================================
// POLIPTIH LIGHTBOX (index.html) - koristi isti #lb/#lbImg
// mehanizam kao galerija, ali sa slikama poliptiha
// ============================================================

function initPoliptihLightbox() {
  const figuraGrid = document.querySelector('.figura-grid');
  if (!figuraGrid) return; // ova stranica nema poliptih, ne radi nista

  sveSlike = [
    { putanja: 'images/poliptih/1.jpg',  naziv: 'Krilo lijevo' },
    { putanja: 'images/poliptih/2.jpg',  naziv: 'Glava' },
    { putanja: 'images/poliptih/3.jpg',  naziv: 'Krilo desno' },
    { putanja: 'images/poliptih/4.jpg',  naziv: 'Lijeva ruka' },
    { putanja: 'images/poliptih/5.jpg',  naziv: 'Tijelo' },
    { putanja: 'images/poliptih/6.jpg',  naziv: 'Desna ruka' },
    { putanja: 'images/poliptih/7.jpg',  naziv: 'Krilo lijevo donje' },
    { putanja: 'images/poliptih/8.jpg',  naziv: 'Krilo desno donje' },
    { putanja: 'images/poliptih/9.jpg',  naziv: 'Peraje lijevo' },
    { putanja: 'images/poliptih/10.jpg', naziv: 'Peraje desno' }
  ];
}

// ============================================================
// SCROLL HINT (mobilni) - strelica dolje, nestaje kad se vidi ostatak
// ============================================================

function initScrollHint() {
  const hint  = document.getElementById('scrollHint');
  const intro = document.querySelector('.hero-intro');
  if (!hint || !intro) return;

  hint.addEventListener('click', function() {
    intro.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ostatak (bio tekst) je vidljiv -> sakrij strelicu
  new IntersectionObserver(function(entries) {
    hint.classList.toggle('hidden', entries[0].isIntersecting);
  }, { threshold: 0.15 }).observe(intro);
}

// ============================================================
// POKRENI SVE
// ============================================================

window.addEventListener('DOMContentLoaded', function() {
  initHeroSlider();
  initPoliptihLightbox();
  initScrollHint();
  ucitajGaleriju();
});

console.log('🎨 Lejla Pleho - Portfolio Ready');
