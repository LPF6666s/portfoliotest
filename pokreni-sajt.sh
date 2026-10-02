#!/bin/bash

# ============================================================
# Pokreni Sajt Lokalno - Lejla Pleho Portfolio
# Generise galeriju i pokrece lokalni server za pregled
# ============================================================

echo ""
echo "============================================================"
echo "  Generisanje galerije..."
echo "============================================================"
echo ""

python3 build-gallery.py

echo ""
echo "============================================================"
echo "  Pokretanje lokalnog servera na http://localhost:8000"
echo "============================================================"
echo ""
echo "  Otvori http://localhost:8000 u browseru."
echo "  Za zaustavljanje: CTRL+C"
echo ""

python3 -m http.server 8000
