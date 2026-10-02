# 🚀 QUICK START - Za potpune početnike

## Šta je ovo?

Ovo je portfolio sajt koji se automatski updateuje kad dodaš nove slike.

## Prvi put (setup)

### 1. Instaliraj Git i Python

**Windows:**
- Git: https://git-scm.com/download/win
- Python: https://www.python.org/downloads/ (✓ označi "Add to PATH")

**Mac:**
```bash
brew install git python3
```

### 2. Skinuti sajt sa GitHuba

```bash
git clone https://github.com/TVOJ-USERNAME/lejla-portfolio.git
cd lejla-portfolio
```

Zamijeni `TVOJ-USERNAME` sa svojim GitHub username-om.

### 3. GitHub Pages setup

1. Idi na GitHub → Settings → Pages
2. Source: **GitHub Actions**
3. Save

---

## Svaki put kad dodaješ slike

### 1. Dodaj sliku

Kopiraj sliku u odgovarajući folder:
- `images/grafika/` - Grafike
- `images/slike/` - Slike (ulja, akrili)
- `images/aktovi/` - Aktovi
- `images/crtezi/` - Crteži
- `images/instalacije/` - Instalacije

### 2. Generiši galeriju

**Windows:** Dupli klik na `generiši-galeriju.bat`

**Mac/Linux:** 
```bash
./generiši-galeriju.sh
```

### 3. Upload

**GitHub Desktop (najlakše):**
1. Otvori GitHub Desktop
2. Vidi promjene
3. Napiši poruku: "Dodato novih slika"
4. Commit → Push

**Command line:**
```bash
git add .
git commit -m "Dodato novih slika"
git push
```

### 4. Čekaj 2 minuta

Otvori sajt i refresh (Ctrl+F5)

---

## Gdje je moj sajt?

`https://TVOJ-USERNAME.github.io/lejla-portfolio/`

Zamijeni `TVOJ-USERNAME` sa svojim GitHub korisničkim imenom.

---

## Problemi?

### "Python nije pronađen"
- Reinstaliraj Python sa "Add to PATH" opcijom
- Restartuj računar

### "Permission denied"
**Mac/Linux:**
```bash
chmod +x generiši-galeriju.sh
```

### Ne vidim nove slike
- Hard refresh: Ctrl+F5 (Windows) ili Cmd+Shift+R (Mac)
- Čekaj 5 minuta
- Provjeri GitHub Actions da li je build prošao

---

## Pomoć

Detaljniji tutorial: [TUTORIAL.md](TUTORIAL.md)

Tehnička dokumentacija: [README.md](README.md)

---

## Struktura projekta

```
lejla-portfolio/
│
├── generiši-galeriju.bat    ← Dupli klik ovdje (Windows)
├── generiši-galeriju.sh     ← Pokreni ovo (Mac/Linux)
├── build-gallery.py         ← Python skripta (ne diraj)
│
├── index.html               ← Početna stranica
├── radovi.html              ← Galerija
├── biografija.html          ← Biografija
├── usluge.html              ← Usluge
├── galerija.json            ← Lista slika (auto-generisana)
│
├── css/
│   └── style.css
├── js/
│   └── main.js
│
└── images/                  ← DODAJ SLIKE OVDJE
    ├── grafika/
    ├── slike/
    ├── aktovi/
    ├── crtezi/
    ├── instalacije/
    └── poliptih/            (samo za hero, ne galerija)
```

---

**To je to! Sretno! 🎨**
