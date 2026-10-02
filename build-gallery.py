#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Statički Galerija Generator za Lejla Pleho Portfolio
====================================================

Skenira slike iz images/ foldera i generiše galerija.json

STRUKTURA FOLDERA:
  images/
    ├── aktovi/
    │   ├── Akt 1.jpg
    │   ├── Akt 2.jpg
    │   ├── webp/
    │   └── thumbnails/
    ├── crtezi/
    ├── grafika/
    ├── instalacije/
    ├── slike/
    └── poliptih/  (ignorise se - samo za hero)

UPOTREBA:
  1. Dodaj nove slike u odgovarajuću kategoriju
  2. Pokreni: python build-gallery.py
  3. Upload sve na GitHub Pages

"""

import os
import json
from pathlib import Path
from datetime import datetime

# ============================================================
# KONFIGURACIJA
# ============================================================

# Kategorije za galeriju (poliptih se ignoriše)
KATEGORIJE = {
    'grafika': 'Prints',
    'slike': 'Paintings', 
    'aktovi': 'Figure Studies',
    'instalacije': 'Installations',
    'crtezi': 'Drawings'
}

# Dozvoljene ekstenzije slika
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif'}

# Output fajl
OUTPUT_FILE = 'galerija.json'

# ============================================================
# HELPER FUNKCIJE
# ============================================================

def is_image(filename):
    """Provjerava da li je fajl slika (ignorise .webp jer su u subfolderu)"""
    return Path(filename).suffix.lower() in IMAGE_EXTENSIONS


def format_title(filename):
    """Formatira naziv slike za prikaz"""
    name = Path(filename).stem
    # Ukloni _ i -, zamijeni sa razmacima
    name = name.replace('_', ' ').replace('-', ' ')
    # Uppercase prva slova
    return ' '.join(word.capitalize() for word in name.split())


def scan_category(category_path, category_key, category_name):
    """Skenira jednu kategoriju i vraća listu slika"""
    slike = []
    
    if not category_path.exists() or not category_path.is_dir():
        return slike
    
    # Uzmi sve slike direktno u folderu (ne ulazi u webp/thumbnails)
    for item in sorted(category_path.iterdir()):
        # Preskoci foldere
        if item.is_dir():
            continue
        
        # Preskoci ako nije slika
        if not is_image(item.name):
            continue
        
        filename = item.name
        basename = item.stem
        
        # Putanje do različitih verzija
        webp_file = category_path / 'webp' / f'{basename}.webp'
        thumb_file = category_path / 'thumbnails' / f'{basename}.webp'
        
        # Odaberi najbolju verziju za prikaz
        # Prioritet: thumbnail webp > original webp > original jpg
        if thumb_file.exists():
            display_path = f'images/{category_key}/thumbnails/{basename}.webp'
        elif webp_file.exists():
            display_path = f'images/{category_key}/webp/{basename}.webp'
        else:
            display_path = f'images/{category_key}/{filename}'
        
        # Odaberi originalnu sliku za lightbox
        if webp_file.exists():
            original_path = f'images/{category_key}/webp/{basename}.webp'
        else:
            original_path = f'images/{category_key}/{filename}'
        
        slika_data = {
            'naziv': format_title(filename),
            'putanja': display_path,
            'original': original_path,
            'kat': category_key
        }
        
        slike.append(slika_data)
    
    return slike


def generate_gallery_json():
    """Glavna funkcija - skenira sve i generiše JSON"""
    
    images_root = Path('images')
    
    # Provjera da li postoji images folder
    if not images_root.exists():
        print("\n❌ GREŠKA: 'images/' folder ne postoji!")
        print("\n   Kreiraj strukturu foldera:")
        print("   images/")
        print("   ├── aktovi/")
        print("   ├── crtezi/")
        print("   ├── grafika/")
        print("   ├── instalacije/")
        print("   └── slike/")
        print()
        return False
    
    print("\n" + "="*60)
    print("  📸 GALERIJA GENERATOR - Lejla Pleho Portfolio")
    print("="*60)
    print(f"\n🕐 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    print("🔍 Skeniram slike...\n")
    
    all_images = []
    stats = {}
    
    # Skeniraj sve kategorije
    for kat_key, kat_name in KATEGORIJE.items():
        kat_path = images_root / kat_key
        
        slike = scan_category(kat_path, kat_key, kat_name)
        stats[kat_key] = len(slike)
        all_images.extend(slike)
        
        status = "✓" if len(slike) > 0 else "⚠"
        print(f"  {status}  {kat_name.ljust(20)} → {len(slike):3d} slika")
    
    print(f"\n{'─'*60}")
    print(f"  📊 UKUPNO: {len(all_images)} slika")
    print(f"{'─'*60}\n")
    
    # Generiši JSON
    if len(all_images) == 0:
        print("⚠️  Nema slika za generisanje!\n")
        return False
    
    # Kreiraj output
    output_data = {
        'generated': datetime.now().isoformat(),
        'total': len(all_images),
        'categories': stats,
        'images': all_images
    }
    
    # Sačuvaj JSON
    output_path = Path(OUTPUT_FILE)
    with output_path.open('w', encoding='utf-8') as f:
        json.dump(all_images, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Generisan: {output_path}")
    print(f"   Veličina: {output_path.stat().st_size / 1024:.1f} KB")
    print()
    
    # Dodatne informacije
    print("📝 Sledeći koraci:")
    print("   1. Provjeri da li sve izgleda ok u radovi.html")
    print("   2. Commit i push na GitHub:")
    print("      git add .")
    print(f"      git commit -m \"Dodato {len(all_images)} slika u galeriju\"")
    print("      git push")
    print()
    
    return True


# ============================================================
# MAIN
# ============================================================

if __name__ == '__main__':
    try:
        success = generate_gallery_json()
        exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⚠️  Prekinuto od strane korisnika\n")
        exit(1)
    except Exception as e:
        print(f"\n❌ GREŠKA: {e}\n")
        import traceback
        traceback.print_exc()
        exit(1)
