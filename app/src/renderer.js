// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const os = require('os');
const fs = require('fs');
const path = require('path');
const { shell } = require('electron');
const scrape = require('website-scraper');
const SaveToExistingDirectoryPlugin = require('website-scraper-existing-directory');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const slugify = require('slugify');
  
const homedir = os.homedir() + '/vivaforum-downloads/'; 
    
function handleSubmit(event) {
    event.preventDefault();

    // clearOutWhatHappened();
    timesRun = 0;

    const formUsed = document.getElementById('whichForm').value;

    if (formUsed == "formDefault") {
        let vivaURL = /^https:\/\/forum\.viva\.nl\//;
        let oldURL = /^https:\/\/forum\.viva\.nl\/forum\/list_messages\//;

        download_url_dirty = document.getElementById('download_url').value;

        if (download_url_dirty.match(vivaURL)) {
            let regex = /\/[0-9]{1,3}$/; // AHA
            download_url = download_url_dirty.split(regex)[0].split('?')[0];
        } else {
            updateWhatHappened('Is dit wel een link naar het Vivaforum?!', 0);
            download_url = null;
        }

        if (download_url.match(oldURL)) {
            updateWhatHappened('Je hebt een link ingevoerd die niet goed werkt. <a href="download-old.html">Je kunt het met dit formulier opnieuw proberen.</a>', 0);
            download_url = null;
        }
    } else {
        const download_topic = document.getElementById('download_topic').value;
        const download_topic_category = document.getElementById('download_topic_category').value;
        const download_topic_id = document.getElementById('download_topic_id').value;

        // if the user wants to download an older topic, change the download URL
        download_url = `https://forum.viva.nl/${slugify(download_topic_category)}/${slugify(download_topic)}/list_messages/${slugify(download_topic_id)}`;

        const attemptUrl = document.getElementById("attemptURL");
        attemptUrl.textContent = download_url;
    }

    async function prepareDownload() {
        try {
            console.log('preparing download... ' + download_url);

            const response = await fetch(download_url);
            const text = await response.text();
            const dom = await new JSDOM(text);

            if (!response.ok) {
                updateWhatHappened('Er ging iets mis met het ophalen van informatie over het draadje. Ik kan geen verbinding maken met de server van het Vivaforum. Is het al 2 augustus geweest? 😭', 1000);
            }
        
            function numberOfPagesToDownload() {
                if (numberOfMessages > 25) {
                    getMessageNumber = dom.window.document.querySelector(".pagination__nav li:nth-last-child(2) a").textContent;
                    return getMessageNumber;
                } else {
                    return 1;
                }
            }

            const pageTitle = dom.window.document.querySelector("h1").textContent.trim();
            const numberOfMessages = dom.window.document.querySelector(".thread__meta .meta__left span:last-child").textContent.trim().slice(0, -10);
            const dateAndTime = dom.window.document.querySelector(".meta__left > span:first-child").innerHTML;
            let numberOfPages = numberOfPagesToDownload();

            // remove any spaces from the string dateAndTime, 
            // and then take off the last 6 characters for just the date
            const justTheDate = dateAndTime.replace(/ /g, '').slice(0, -6);

            let threadInfo = {
                title: pageTitle,
                sanitizedTitle: slugify(justTheDate) + '_' + slugify(pageTitle),
                numberOfPages: parseInt(numberOfPages),
            };
    
            return threadInfo;
            
        } catch (err) {
            updateWhatHappened('Er ging iets mis met het ophalen van informatie over het draadje. Klopt de link wel?', 1000);
        }
    };
 
    prepareDownload().then((value) => {            
        function numberOfPagesDownloaded(sanitizedTitle) {
            numberOfPagesDownloadedArray = [];
            if (fs.existsSync(homedir + '/' + sanitizedTitle + '/')) {
                files = fs.readdirSync(homedir + '/' + sanitizedTitle + '/');
                files.forEach(file => {
                    if (path.extname(file) == ".html") {
                        numberOfPagesDownloadedArray.push(file);
                    }
                });
            } 
            return numberOfPagesDownloadedArray.length;
        }

        console.log(numberOfPagesDownloaded(value.sanitizedTitle));

        if (numberOfPagesDownloaded(value.sanitizedTitle) == 0) {
            updateWhatHappened(`Verbinding gemaakt met de server! Klaar om het draadje "${value.title}" te downloaden...`, 300);

            if (value.numberOfPages >= 40) {
                updateWhatHappened(`Dit draadje telt maar liefst ${value.numberOfPages} pagina's. Ik heb waarschijnlijk wat meer tijd nodig om alles te downloaden. Check ook even het mapje vivaforum-downloads in je gebruikersmap, dan zie je hoe alles binnendruppelt.`, 5000);
            } else if (value.numberOfPages == 1) {
                updateWhatHappened(`Dit draadje telt ${value.numberOfPages} pagina.`, 5000);
            } else {
                updateWhatHappened(`Dit draadje telt ${value.numberOfPages} pagina's. Ik ga aan de slag!`, 5000);
            }
        } else if (numberOfPagesDownloaded(value.sanitizedTitle) == value.numberOfPages) {
            if (timesRun == 0) {
                updateWhatHappened(`Even kijken!`, 100);
            }

            finished(1000, value.sanitizedTitle);
        } else {
            if (timesRun == 0) {
                updateWhatHappened(`Ah, ik heb dit draadje eerder gezien!`, 100);
                updateWhatHappened(`Ik heb eerder ${numberOfPagesDownloaded(value.sanitizedTitle)} gedownload van de ${value.numberOfPages} pagina's.<br /> Ik download nu de rest...`, 3000);
            } else {

            }
        }

        function downloadAllThePages() {            
            // loop over all the pages, and download the associated link
            // in a seperate folder

            allPages = value.numberOfPages + 1;

            for (let i = 1; i < allPages; i++) {
            // // if the number of pages downloaded does not matches the 
            // // number of pages in the forum thread...
                let download_folder = homedir + '/' + value.sanitizedTitle + '/';

                // if we're not at the last iteration, download the page 
                // and it's assets if the folder doesn't yet exist
                if (!fs.existsSync(download_folder + `pagina-${i}.html`)) {
                    const options = {
                        urls: download_url + '/' + i,
                        directory: download_folder,
                        defaultFilename: `pagina-${i}.html`,
                        plugins: [new SaveToExistingDirectoryPlugin()]
                    };

                    scrape(options).then((result) => {
                        updateWhatHappened(`Aan het downloaden...`, 10000);
                    });
                }
            }
            checkAndRepeat();
        }

        downloadAllThePages();

        // check three times if we got it all!
        // for (let j = 0; j < 3; j++) {
        function checkAndRepeat() {
            function didWeDownloadEverything() {
                numberOfPagesDownloaded(value.sanitizedTitle);

                if (numberOfPagesDownloaded(value.sanitizedTitle) == 0) {
                    return false;
                } else if (numberOfPagesDownloaded(value.sanitizedTitle) == value.numberOfPages) {
                    finished(12000, value.sanitizedTitle);
                    return true;
                } else if (numberOfPagesDownloaded(value.sanitizedTitle) < value.numberOfPages) {
                    return false;
                }
            }

            checkDidWeGetItAll = didWeDownloadEverything();

            if (!checkDidWeGetItAll) {
                setTimeout(downloadAllThePages, 10000);
                timesRun += 1;
            } 
        }
    });
}

const form = document.querySelector('form#download-form');
form.addEventListener('submit', handleSubmit);
 
function finished(timeDelay, sanitizedTitle) {
    updateWhatHappened(`Ik denk dat we er zijn!`, timeDelay, "succes.svg");

    const finished = document.getElementById("finished"); 

    finished.removeAttribute("hidden");

    naamDraadje = document.getElementById("naamDraadje");
    naamDraadje.innerHTML = homedir + sanitizedTitle + '/';
    

    document.querySelectorAll('.openThreadInHomeDir').forEach(item => {
        item.addEventListener('click', event => {
            shell.openPath(homedir + '/' + sanitizedTitle + '/');
        })
    });
}

function updateWhatHappened(updateUser, timeDelay, icon = "") {
    function addUpdate() {
        document.getElementById("statusUpdate").innerHTML = "";
        const paragraph = document.createElement("p");
        if (icon != "") {
            paragraph.innerHTML =
                `<img src="${icon}" alt="" width="20" height="20" style="margin-right: .5rem; float: left;">` + updateUser;
        } else {
            paragraph.innerHTML = updateUser;
        }
            
        document.getElementById("statusUpdate").appendChild(paragraph);
        // document.getElementById("statusUpdate").prepend(paragraph);
    }

    setTimeout(addUpdate, timeDelay) 
}

function clearOutWhatHappened() {
    document.getElementById("statusUpdate").innerHTML = "";
}

document.querySelectorAll('.openHomeDir').forEach(item => {
    item.addEventListener('click', event => {
        shell.openPath(homedir);
    })
});

// const myNotification = new Notification('Title', {
//     body: 'Reloaded the app'
// })
  
// myNotification.onclick = () => {
//     console.log('Notification clicked')
// }
