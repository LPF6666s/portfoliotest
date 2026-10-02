@echo off
:: ============================================================
:: Pokreni Sajt Lokalno - Lejla Pleho Portfolio
:: Generise galeriju i otvara sajt u browseru preko lokalnog servera
:: ============================================================

echo.
echo ============================================================
echo   Generisanje galerije...
echo ============================================================
echo.

python build-gallery.py

echo.
echo ============================================================
echo   Pokretanje lokalnog servera na http://localhost:8000
echo ============================================================
echo.
echo   Sajt ce se otvoriti u browseru za par sekundi.
echo   NE ZATVARAJ ovaj prozor dok gledas sajt.
echo   Za zaustavljanje: pritisni CTRL+C ili zatvori ovaj prozor.
echo.

start "" http://localhost:8000
python -m http.server 8000

pause
