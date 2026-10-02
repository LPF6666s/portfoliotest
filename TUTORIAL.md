# 📘 TUTORIJAL - Kako dodati nove slike na sajt

## 🎯 Brzi pregled

1. **Dodaj sliku** → u `images/grafika/` (ili drugu kategoriju)
2. **Pokreni skriptu** → dupli klik na `generiši-galeriju.bat` (Windows) ili `generiši-galeriju.sh` (Mac/Linux)
3. **Upload** → `git add . && git commit -m "Nove slike" && git push`
4. **Čekaj 2 minuta** → Sajt se automatski updateuje

---

## 📁 KORAK 1: Dodaj slike u folder

### Struktura foldera

```
images/
├── aktovi/          ← Figure Studies (aktovi, crteži ljudskog tijela)
├── crtezi/          ← Drawings (crteži, skice)
├── grafika/         ← Prints (grafike, štampe)
├── instalacije/     ← Installations (instalacije)
└── slike/           ← Paintings (slike, ulja, akril)
```

### Gdje dodati sliku?

**Primjer 1:** Imaš novu grafiku "Grafika 30.jpg"
- ✓ Stavi u: `images/grafika/Grafika 30.jpg`

**Primjer 2:** Imaš novi akt "Akt 50.jpg"
- ✓ Stavi u: `images/aktovi/Akt 50.jpg`

**Primjer 3:** Imaš novu sliku "Portret.png"
- ✓ Stavi u: `images/slike/Portret.png`

### Dozvoljeni formati

- ✓ JPG / JPEG
- ✓ PNG
- ✓ GIF
- ✗ WebP (automatski se generiše kasnije, opciono)

### Imenovanje fajlova

Možeš koristiti bilo kakva imena:
- `Grafika 30.jpg`
- `portret-1.jpg`
- `urban_landscape.png`
- `Abstract Art 2026.jpg`

Skripta će automatski formatirati nazive za prikaz.

---

## ⚙️ KORAK 2: Generiši galeriju

### Windows korisnici

1. **Pronađi fajl**: `generiši-galeriju.bat`
2. **Dupli klik** na njega
3. **Pričekaj** da se otvori CMD prozor
4. **Pročitaj output** - trebao bi reći koliko slika je pronađeno

**Output izgleda ovako:**
```
============================================================
  📸 GALERIJA GENERATOR - Lejla Pleho Portfolio
============================================================

🔍 Skeniram slike...

  ✓  Prints               →  15 slika
  ✓  Paintings            →   8 slika
  ✓  Figure Studies       →  25 slika
  ✓  Installations        →   3 slika
  ✓  Drawings             →  12 slika

────────────────────────────────────────────────────────────
  📊 UKUPNO: 63 slika
────────────────────────────────────────────────────────────

✅ Generisan: galerija.json
   Veličina: 12.4 KB
```

5. **Pritisni bilo koji taster** da zatvoriš prozor

### Mac / Linux korisnici

1. **Otvori Terminal**
2. **Navigiraj do foldera**:
   ```bash
   cd /putanja/do/lejla-portfolio
   ```
3. **Pokreni skriptu**:
   ```bash
   ./generiši-galeriju.sh
   ```

**ILI jednostavno:**
```bash
python3 build-gallery.py
```

---

## 🚀 KORAK 3: Upload na GitHub

### Ako koristiš GitHub Desktop (preporučeno za početnike)

1. **Otvori GitHub Desktop**
2. **Vidi promjene** - trebao bi vidjeti:
   - `galerija.json` (modified)
   - Nove slike u `images/` (added)
3. **Napiši commit poruku**: "Dodato 5 novih slika"
4. **Klikni "Commit to main"**
5. **Klikni "Push origin"**

### Ako koristiš Command Line

```bash
# Dodaj sve promjene
git add .

# Commit sa porukom
git commit -m "Dodato novih slika u galeriju"

# Push na GitHub
git push
```

---

## ⏱️ KORAK 4: Čekaj da se sajt updateuje

1. **Idi na GitHub** → tvoj repository
2. **Klikni na "Actions" tab**
3. **Vidi da li radi** - trebao bi vidjeti žuti krug (in progress) ili zelenu kačicu (done)
4. **Čekaj 1-2 minuta**
5. **Refresh sajt** - Ctrl+F5 ili Cmd+Shift+R

---

## 🎨 Napredne opcije

### WebP optimizacija (brže učitavanje)

Ako imaš ImageMagick instaliran:

```bash
cd images/grafika
mkdir -p webp thumbnails

# Konvertuj u WebP
for img in *.jpg; do
  magick "$img" "webp/${img%.jpg}.webp"
  magick "$img" -resize 400x400 "thumbnails/${img%.jpg}.webp"
done
```

Skripta će automatski koristiti WebP verzije ako postoje!

### Kategorije

Možeš dodati nove kategorije:
1. Kreiraj folder `images/nova-kategorija/`
2. Otvori `build-gallery.py`
3. Dodaj u `KATEGORIJE` dictionary:
   ```python
   KATEGORIJE = {
       'grafika': 'Prints',
       'slike': 'Paintings',
       'nova-kategorija': 'Nova Kategorija'  # ← dodaj ovo
   }
   ```

---

## 🐛 Troubleshooting

### Problem: "Python nije pronađen"

**Windows:**
1. Instaliraj Python: https://www.python.org/downloads/
2. ✓ Označi "Add Python to PATH" tokom instalacije
3. Restartuj računar

**Mac:**
```bash
brew install python3
```

**Linux:**
```bash
sudo apt install python3
```

### Problem: "Galerija je prazna"

1. Provjeri da li su slike u pravom folderu
2. Provjeri da li su ekstenzije ispravne (`.jpg`, `.png`)
3. Pokreni ponovo skriptu
4. Otvori `galerija.json` i vidi šta piše

### Problem: "Ne vidim nove slike na sajtu"

1. **Hard refresh**: Ctrl+F5 (Windows) ili Cmd+Shift+R (Mac)
2. Provjeri GitHub Actions - da li je build prošao?
3. Čekaj još 2-3 minuta
4. Obriši browser cache

### Problem: Slike su prevelike (sporo se učitavaju)

1. **Kompresuj slike**: https://tinypng.com/
2. **Preporučena veličina**: max 2000px širina
3. **Kvalitet**: 80-90% za JPG

---

## 📞 Pomoć

Ako ništa ne radi:
1. Screenshot greške
2. Kopiraj cijeli output iz CMD/Terminal
3. Pošalji mi: [tvoj-email@example.com]

---

**Sretno! 🎨**
