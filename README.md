# Lejla Pleho Portfolio - Statički Sajt

Potpuno statički portfolio sajt optimizovan za GitHub Pages.

## 🚀 Setup

### Prva postavka (samo jednom)

1. **Instaliraj Python 3** (ako već nije instaliran)
   - Windows: https://www.python.org/downloads/
   - Mac/Linux: već instaliran

2. **Kloniraj repo**
   ```bash
   git clone https://github.com/tvoj-username/lejla-portfolio.git
   cd lejla-portfolio
   ```

## 📸 Kako dodati nove slike

### 1. Dodaj slike u odgovarajuću kategoriju

Struktura foldera:
```
images/
├── aktovi/          (Figure Studies)
├── crtezi/          (Drawings)
├── grafika/         (Prints)
├── instalacije/     (Installations)
└── slike/           (Paintings)
```

**Primjer:** Dodaj novu sliku u `images/grafika/Grafika 25.jpg`

### 2. Generiši galeriju

Pokreni Python skriptu:

```bash
python build-gallery.py
```

Skripta će:
- ✓ Skenirati sve slike
- ✓ Generisati `galerija.json`
- ✓ Prikazati statistiku

### 3. Upload na GitHub

```bash
git add .
git commit -m "Dodate nove slike"
git push
```

GitHub Pages će automatski uploadovati novi sajt za 1-2 minuta.

## 🎨 Struktura sajta

```
.
├── index.html              # Početna stranica (hero slider)
├── radovi.html             # Galerija radova
├── biografija.html         # Biografija
├── usluge.html             # Usluge
├── galerija.json           # Generisana lista slika
├── build-gallery.py        # Skripta za generisanje
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── aktovi/
    │   ├── Akt 1.jpg
    │   ├── Akt 2.jpg
    │   ├── webp/           # (opciono - WebP verzije)
    │   └── thumbnails/     # (opciono - mali thumbnailovi)
    ├── crtezi/
    ├── grafika/
    ├── instalacije/
    ├── slike/
    └── poliptih/           # (samo za hero, ne ide u galeriju)
```

## 🔧 Napredne opcije

### WebP optimizacija (opciono)

Za brže učitavanje, možeš kreirati WebP verzije:

```bash
# Za svaku kategoriju
cd images/grafika
mkdir webp thumbnails

# Konvertuj u WebP (treba imagemagick)
for img in *.jpg; do
  convert "$img" "webp/${img%.jpg}.webp"
  convert "$img" -resize 400x400 "thumbnails/${img%.jpg}.webp"
done
```

### Hero Slider

Slike u hero slideru se biraju ručno u `js/main.js`:

```javascript
const heroSlides = [
  {
    src: 'images/grafika/Grafika 5.jpg',
    title: 'Grafika 5',
    cat: 'Print'
  },
  // ... dodaj još
];
```

## 📝 Potrebna Python 3

Skripta koristi samo standardne Python biblioteke:
- `os`
- `json`
- `pathlib`

Nema potrebe za `pip install`.

## 🌐 GitHub Pages Setup

1. Idi na Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/root`
4. Save

Sajt će biti dostupan na: `https://tvoj-username.github.io/lejla-portfolio/`

## 🐛 Problemi?

### Galerija prazna
- Provjeri da li postoji `galerija.json`
- Otvori `galerija.json` i vidi da li ima slika
- Pokreni ponovo `python build-gallery.py`

### Slike se ne učitavaju
- Provjeri da li su putanje ispravne
- Otvori Developer Console (F12) u browseru
- Vidi da li ima grešaka

### Ne vidiš promjene
- Refresh sa Ctrl+F5 (hard refresh)
- GitHub Pages treba 1-2 min da updateuje

## 📧 Kontakt

Pitanja? Kontaktiraj: [tvoj-email@example.com]

---

**© 2026 Lejla Pleho. All rights reserved.**
