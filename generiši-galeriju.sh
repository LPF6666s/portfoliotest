#!/bin/bash

# ============================================================
# Generiši Galeriju - Lejla Pleho Portfolio
# ============================================================

echo ""
echo "============================================================"
echo "  Generisanje galerije..."
echo "============================================================"
echo ""

python3 build-gallery.py

if [ $? -eq 0 ]; then
    echo ""
    echo "============================================================"
    echo "  USPJEŠNO! Galerija je generisana."
    echo "============================================================"
    echo ""
    echo "  Sad možeš uploadovati na GitHub:"
    echo "  git add ."
    echo "  git commit -m \"Dodato novih slika\""
    echo "  git push"
    echo ""
else
    echo ""
    echo "============================================================"
    echo "  GREŠKA! Nešto nije u redu."
    echo "============================================================"
    echo ""
fi
