@echo off
:: ============================================================
:: Generiši Galeriju - Lejla Pleho Portfolio
:: ============================================================

echo.
echo ============================================================
echo   Generisanje galerije...
echo ============================================================
echo.

python build-gallery.py

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo   USPJESNO! Galerija je generisana.
    echo ============================================================
    echo.
    echo   Sad mozes uploadovati na GitHub:
    echo   git add .
    echo   git commit -m "Dodato novih slika"
    echo   git push
    echo.
) else (
    echo.
    echo ============================================================
    echo   GRESKA! Nesto nije u redu.
    echo ============================================================
    echo.
)

pause
