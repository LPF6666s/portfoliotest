// ============================================================
// HERO CAROUSEL (donja polovina desne strane) - 10 slika, 3 vidljive
// ZAMIJENI stari "HERO SLIDER" blok u main.js sa ovim kodom
// ============================================================

const heroSlides = [
  { src: 'images/carousel/1.jpg',  title: 'Rad 1' },
  { src: 'images/carousel/2.jpg',  title: 'Rad 2' },
  { src: 'images/carousel/3.jpg',  title: 'Rad 3' },
  { src: 'images/carousel/4.jpg',  title: 'Rad 4' },
  { src: 'images/carousel/5.jpg',  title: 'Rad 5' },
  { src: 'images/carousel/6.jpg',  title: 'Rad 6' },
  { src: 'images/carousel/7.jpg',  title: 'Rad 7' },
  { src: 'images/carousel/8.jpg',  title: 'Rad 8' },
  { src: 'images/carousel/9.jpg',  title: 'Rad 9' },
  { src: 'images/carousel/10.jpg', title: 'Rad 10' }
];

const HERO_VISIBLE = 3;              // koliko slika je uvijek vidljivo
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

  updateHeroTrack();
  startHeroAutoSlide();
}

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
  if (heroInterval) {
    clearInterval(heroInterval);
    heroInterval = null;
  }
}

function resetHeroAutoSlide() {
  stopHeroAutoSlide();
  startHeroAutoSlide();
}

// Pokreni kad se stranica učita
window.addEventListener('DOMContentLoaded', initHeroSlider);
