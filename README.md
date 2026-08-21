# Dokumentace předání bytu

Samostatná statická galerie připravená pro GitHub Pages. Nepotřebuje databázi, server ani instalaci balíčků.

## Zveřejnění

1. Vytvořte na GitHubu nový veřejný repozitář.
2. Nahrajte do kořene repozitáře celý obsah této složky, včetně `.github` a `.nojekyll`.
3. V repozitáři otevřete **Settings → Pages**.
4. V části **Build and deployment** zvolte **GitHub Actions**.
5. Po dokončení akce se zobrazí veřejná adresa webu.

## Po zveřejnění

- Ve službě Google Search Console přidejte přesnou URL GitHub Pages a požádejte o indexaci.
- Pokud chcete doplnit kanonickou adresu, přidejte do `<head>` souboru `index.html` značku `<link rel="canonical" href="VAŠE_URL">`.
- Všechna média jsou uložena ve složce `media`; web není závislý na Rajčeti.

## Aktualizace galerie

Zdrojová data jsou vytvořena z veřejného alba. Pro nové položky je potřeba znovu spustit import a sestavení ve zdrojovém projektu.
