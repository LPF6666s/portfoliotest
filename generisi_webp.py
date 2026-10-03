#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Generiši WebP i Thumbnails — Lejla Pleho Portfolio
====================================================

Prolazi kroz SVE podfoldere u images/ (osim 'poliptih') i za
svaku sliku (.jpg/.jpeg/.png/.gif) direktno u tom folderu pravi:

  images/<kategorija>/webp/<ime>.webp        — puna veličina, WebP
  images/<kategorija>/thumbnails/<ime>.webp  — umanjena verzija (max 400x400)

Već obrađene slike se PRESKAČU (provjerava da li webp i thumbnail
već postoje) — znači sigurno je pokretati skriptu ponovo svaki put
kad dodaš par novih slika, obradiće se samo one nove.

Fajl stavi direktno u folder koji sadrži images/ (dakle u root
repozitorija, pored build-gallery.py).

UPOTREBA:
  python3 generisi_webp.py                 (obradi samo nove slike)
  python3 generisi_webp.py --force          (ponovo obradi SVE slike)
  python3 generisi_webp.py --kvalitet 90    (podesi kvalitet, default 85)
  python3 generisi_webp.py --thumb 500      (veličina thumbnaila, default 400)

Treba: pip install Pillow
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("\n❌ Nedostaje Pillow paket.")
    print("   Instaliraj sa: pip install Pillow\n")
    sys.exit(1)

IMAGES_ROOT = Path('images')
IGNORISI = {'poliptih'}
EKSTENZIJE = {'.jpg', '.jpeg', '.png', '.gif'}


def pripremi_za_cuvanje(img):
    """Osiguraj da je slika u modu koji WebP može sačuvati."""
    if img.mode == 'P':
        return img.convert('RGBA' if 'transparency' in img.info else 'RGB')
    if img.mode not in ('RGB', 'RGBA'):
        return img.convert('RGB')
    return img


def obradi_kategoriju(kat_path, kvalitet, thumb_size, force, verbose):
    webp_dir = kat_path / 'webp'
    thumb_dir = kat_path / 'thumbnails'
    webp_dir.mkdir(exist_ok=True)
    thumb_dir.mkdir(exist_ok=True)

    novih = 0
    preskoceno = 0
    greske = 0

    stavke = [
        item for item in sorted(kat_path.iterdir())
        if not item.is_dir() and item.suffix.lower() in EKSTENZIJE
    ]

    for i, item in enumerate(stavke, 1):
        basename = item.stem
        webp_out = webp_dir / f'{basename}.webp'
        thumb_out = thumb_dir / f'{basename}.webp'

        if not force and webp_out.exists() and thumb_out.exists():
            preskoceno += 1
            continue

        if verbose:
            velicina_mb = item.stat().st_size / (1024 * 1024)
            print(f"    [{i}/{len(stavke)}] {item.name} ({velicina_mb:.1f} MB) …",
                  end=' ', flush=True)

        try:
            with Image.open(item) as img:
                if verbose:
                    print(f"{img.width}x{img.height}px", end=' ', flush=True)

                img = pripremi_za_cuvanje(img)

                # puna verzija u webp formatu
                img.save(webp_out, 'WEBP', quality=kvalitet, method=4)

                # umanjena verzija (thumbnail)
                thumb = img.copy()
                thumb.thumbnail((thumb_size, thumb_size), Image.LANCZOS)
                thumb.save(thumb_out, 'WEBP', quality=kvalitet)

            if verbose:
                print("✓", flush=True)
            novih += 1
        except Exception as e:
            if verbose:
                print("", flush=True)
            print(f"    ❌ Greška kod '{item.name}': {e}", flush=True)
            greske += 1

    return novih, preskoceno, greske


def main():
    parser = argparse.ArgumentParser(description="Generiši WebP i thumbnails za sve kategorije.")
    parser.add_argument('--force', action='store_true', help="Ponovo obradi SVE slike, ne samo nove.")
    parser.add_argument('--kvalitet', type=int, default=85, help="WebP kvalitet 1-100 (default 85).")
    parser.add_argument('--thumb', type=int, default=400, help="Max dimenzija thumbnaila u px (default 400).")
    parser.add_argument('--tiho', action='store_true', help="Ne ispisuj svaku sliku pojedinačno, samo rezime po kategoriji.")
    args = parser.parse_args()

    if not IMAGES_ROOT.exists():
        print("\n❌ GREŠKA: 'images/' folder ne postoji u ovom direktorijumu.")
        print("   Pokreni skriptu iz root foldera repozitorija.\n")
        sys.exit(1)

    kategorije = sorted(
        p for p in IMAGES_ROOT.iterdir()
        if p.is_dir() and p.name not in IGNORISI
    )

    if not kategorije:
        print("\n⚠️  Nema foldera za obradu u images/ (poliptih se preskače).\n")
        sys.exit(0)

    print("\n" + "=" * 60)
    print("  🖼️  GENERISANJE WEBP + THUMBNAILS — Lejla Pleho Portfolio")
    print("=" * 60)
    print(f"\n  Kvalitet: {args.kvalitet}  |  Thumbnail max: {args.thumb}px"
          f"  |  Force: {'DA' if args.force else 'ne'}\n")

    uk_novih = uk_preskoceno = uk_greske = 0

    for kat in kategorije:
        if not args.tiho:
            print(f"\n  📂 {kat.name}")
        novih, preskoceno, greske = obradi_kategoriju(
            kat, args.kvalitet, args.thumb, args.force, verbose=not args.tiho
        )
        uk_novih += novih
        uk_preskoceno += preskoceno
        uk_greske += greske

        status = "✓" if greske == 0 else "⚠"
        print(f"  {status}  {kat.name.ljust(16)} → {novih:3d} novih, {preskoceno:3d} preskočeno"
              + (f", {greske} grešaka" if greske else ""))

    print(f"\n{'─' * 60}")
    print(f"  📊 UKUPNO: {uk_novih} novih, {uk_preskoceno} preskočeno, {uk_greske} grešaka")
    print(f"{'─' * 60}\n")

    if uk_novih > 0:
        print("📝 Sledeći korak: pokreni build-gallery.py (ili dugme")
        print("   'Generiši galeriju' u pokretac.py) da se galerija osvježi.\n")


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Prekinuto od strane korisnika\n")
        sys.exit(1)
