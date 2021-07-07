---
layout: default
title: Forum draadjes downloader
---
## Bewaar je herinneringen aan een sluitend forum

Om het bewaren van draadjes (ook wel topics genoemd) zo laagdrempelig mogelijk te maken, is er nu de **Forum draadjes downloader!**
Dit programma downloadt niet een heel forum, alleen het specifieke draadje dat jij opgeeft. Het downloadt geen persoonsgegevens van derden, zoals namen, adressen of IP-informatie. Het zorgt er alleen voor dat je niet bij een draadje van 120 pagina's alle 120 pagina's afzonderlijk moet openen om de pagina op te slaan in je webbrowser.
 

<section class="download" markdown="1">

## Download het programma

Je kunt hier de software downloaden en installeren voor het systeem waar je computer mee werkt.<br />
Het programma is ongeveer 80 MB.

<div id="desktopWarning">
    <strong>Let op:</strong> Dit is software voor een desktop computer! 
</div>

<strong id="systemUsed"></strong>

<div class="download_boxes">
<article id="windowsDownload" class="download_version">
    <img src="assets/img/windows.svg" alt="" />
    <a href="https://github.com/anneke/forum-draadjes-downloader/raw/main/app/out/make/squirrel.windows/x64/vf-draadjes-downloader-4-1-0.exe" download>Download voor Windows<br /> (versie 4.1.0)</a>
</article> 

<article id="macDownload" class="download_version">
    <img src="assets/img/macos.svg" alt="" />
    <a href="https://github.com/anneke/forum-draadjes-downloader/raw/main/app/out/make/vf-draadjes-downloader-v4_2_0.dmg" download>Download voor MacOS<br /> (versie 4.2.0)</a>
</article>
</div>
</section>

<section id="ifWindows" hidden>
    <h2>Installeer je dit op Windows?</h2>
    <p>Het kan zijn dat Windows Defender een popup krijgt wanneer je het programma wil gebruiken, met daarin een tekst die vertelt dat een onbekend programma is geblokkeerd om veiligheidsredenen. Als je op "meer info" klikt, dan kun je toch het programma gebruiken.</p>
    <p>Mocht je hier je bedenkingen bij hebben, maar wil je toch 1 of 2 draadjes downloaden? Dan mag je mij ook een mailtje sturen, dan download ik het voor je en mail ik je (in een zip-bestand) de bestanden terug 😘 Daarna verwijder ik ze weer van mijn computer. <br />
    Mail mij op <a href="mailto:mail@annekesinnema.nl?subject=Forum draadjes downloader">mail@annekesinnema.nl</a>.</p>
</section>

<section id="ifMac" hidden>
    <h2>Installeer je dit op een Mac?</h2>
    <p>macOS staat standaard zo ingesteld, dat je alleen programma's uit de Mac App Store kunt installeren. Heb je software gedownload van de website van de ontwikkelaar, dan zul je hiervoor een extra stap moeten nemen.</p>
    <p><a href="https://www.iculture.nl/tips/mac-apps-installeren-buiten-mac-app-store-om/" target="_blank" rel="noreferrer noopener">Dit artikel van iCulture legt uit wat je moet doen om dan de app te installeren (opent in een nieuw scherm).</a></p>
</section>

<section markdown="1">

## Hoe werkt het?

1. je plakt de link van een topic in een invoerveld
2. je drukt op enter of de knop 'Download'
3. het programma maakt een mapje 'forum-downloads' in je gebruikersmap, met daarin een mapje met het topic en alle daarbij horende pagina's, afbeeldingen en layout. ✨

{% comment %}
Zo ziet het er bijvoorbeeld uit (je kunt naar rechts scrollen voor meer afbeeldingen, of klikken op de afbeelding voor een grotere versie).

<div class="gallery">
    <a href="/assets/img/example-downloadfolder.png" target="_blank"><img src="/assets/img/example-downloadfolder.png" alt="Op een Mac computer: de map forum-downloads met daarin voor elk gedownload topic een map aangemaakt met als naam datum en titel, en daarin html, opmaak, en afbeeldingen. Elke pagina wordt opgeslagen als een apart html bestand, maar ze delen de gebruikte opmaakbestanden." width="600"></a>
    <a href="/assets/img/windows-downloading.PNG" target="_blank"><img src="/assets/img/windows-downloading.PNG" alt="De map forum-downloads op een Windows computer. Ernaast het programma om mee te downloaden." width="600"></a>
    <a href="/assets/img/example-downloadfolder-windows.PNG" target="_blank"><img src="/assets/img/example-downloadfolder-windows.PNG" alt="Het draadje Gierige Acties deel vier is gedownload in een mapje op Windows." width="600"></a>
</div> 
{% endcomment %}

</section>

<section markdown="1">

## Werkt er iets niet?

Dit programma is in een paar dagen tijd in elkaar gezet, en kan bugs vertonen! Downloaden en installeren is op eigen risico.

Sommige links van het Forum kunnen niet zo eenvoudig worden gedownload. Soms werkt een link ook niet eens in de browser. Het gaat dan bijvoorbeeld om een link waar de topictitel niet in terug te lezen is. Je moet dan helaas zelf doorklikken en informatie invoeren zodat de app alsnog kan proberen je te helpen. Hier staat in de app een uitleg voor.

Gebeurt er iets anders in het programma wat je niet verwacht, <a href="mailto:mail@annekesinnema.nl?subject=Forum draadjes downloader">mail dan naar Anneke</a> met wat je deed, wat je verwachtte dat er zou gebeuren en wat er ook echt gebeurde. Dan zal ik mijn best doen om het probleem te verhelpen in de volgende versie!

</section>
<section markdown="1">

## Werkt het allemaal wél?

Ben je blij met dit programma en wil je me graag bedanken, dan kun je [met iDeal een klein bedrag naar me overmaken](https://paymentlink.mollie.com/payment/fh0PDA6ul9P7QcnASwBDM/). Het hoeft niet, maar ik ben blij met elke euro! Het zegt vooral iets over je waardering voor de moeite die ik hier in gestoken heb. 

</section>

<section markdown="1">

## Hoe is dit gebouwd?

Ik ([Anneke Sinnema](https://www.linkedin.com/in/annekesinnema/)) heb gebruik gemaakt van [Electron](https://www.electronjs.org/) om een cross-platform applicatie te bouwen met HTML, CSS en JavaScript. De [code van het programma en van deze website is vrij in te zien op Github](https://github.com/anneke/forum-draadjes-downloader). Ben je zelf handig met code, dan kun je via dat platform een kopie maken van deze site/software of suggesties en zelf aanvullingen doen.

Ik heb de app en de website geprobeerd toegankelijk te maken voor verschillende mensen met een beperking. Door bijvoorbeeld rekening te houden met de koppenstructuur, duidelijke links en contrast van kleur-op-kleur. Kom je alsnog iets tegen dat je onduidelijk vindt, of waar je niet bij kunt, [hoor ik dat heel graag](mailto:mail@annekesinnema.nl)! Ik pas het aan en daar leer ik van voor mijn volgende project.

Met dank aan Kilian Valkhof voor zijn hulp bij het inrichten van het buildproces. Hij is de maker van [Polypane](https://polypane.app/), een superslimme ontwikkelbrowser voor developers.

Ik gebruik geen cookies, maar wel [Plausible.io](https://plausible.io) om zonder jouw privacy te riskeren te bekijken hoeveel mensen deze pagina bezoeken. 
Jij kunt zien wat ik zie, want [de statistieken zijn publiek toegankelijk](https://plausible.io/forum-downloader.annekesinnema.nl). 

<a href="https://github.com/anneke/forum-draadjes-downloader" target="_blank" rel="noreferrer nofollow">
<img src="/assets/img/github.png" width="37" height="37" alt="Bekijk op Github" /></a>

</section>
