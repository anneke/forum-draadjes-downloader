<div lang="nl">

# Vivaforum draadjes downloader

Je kunt dit programma downloaden via de website [viva-downloader.nl](https://www.viva-downloader.nl). Op deze plek kun je kijken wat er in de code gebeurt, en een kopie maken om bijvoorbeeld de opmaak aan te passen. 

Het Viva-forum gaat op 2 augustus offline dus wil je gebruik maken van deze download-tool, doe het dan voor die tijd! Daarna zal ik overwegen dit programma aan te passen zodat je als gebruiker draadjes van andere fora kunt downloaden.

Zie de website [viva-downloader.nl](https://www.viva-downloader.nl) voor uitleg over hoe je de app kunt gebruiken.

![Een voorbeeld van wat je ziet als je een topic downloadt](example-downloadfolder.png)
</div>

## Maken van aanpassingen

```bash
# Kloon deze repository:
git clone https://github.com/anneke/vivaforum-draadjes-downloader.git
# Ga de map in
cd vivaforum-draadjes-downloader
# Installeer afhankelijkheden
npm install
# Start de app
npm start
```

## Build maken

Je kan een eigen build (productie-versie van het programma) maken met deze drie commandos:

```bash
# Windows
npm run make-win
# Mac iOS
npm run make-mac
# Linux
npm run make-linux
```

Om de Windows variant op Mac (of Linux) te maken moet je eerst [mono installeren](https://www.mono-project.com/docs/getting-started/install/mac/).
