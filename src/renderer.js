// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const os = require('os');
const fs = require('fs');
const scrape = require('website-scraper');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const slugify = require('slugify');
  
const homedir = os.homedir() + '/vivaforum-downloads/'; 
  
function handleSubmit(event) {
    event.preventDefault();

    clearOutWhatHappened();
    
    const download_url = document.getElementById('download_url').value;
    let pagesDownloaded = 1;
    let timesRun = 0;

    async function prepareDownload() {
        try {
            const response = await fetch(download_url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
                        
            const text = await response.text();
            const dom = await new JSDOM(text);

            const pageTitle = await dom.window.document.querySelector("h1").textContent;
            const numberOfPages = await dom.window.document.querySelector(".pagination__nav li:nth-last-child(2) a").textContent;
            const dateAndTime = await dom.window.document.querySelector(".meta__left > span:first-child").innerHTML;
            
            // remove any spaces from the string dateAndTime, 
            // and then take off the last 6 characters for just the date
            const justTheDate = dateAndTime.replace(/ /g, '').slice(0, -6);
            
            const removeSpacesFromTitle = pageTitle.slice(1, -1);

            let threadInfo = {
                title: removeSpacesFromTitle,
                sanitizedTitle: slugify(justTheDate) + '_' + slugify(pageTitle),
                numberOfPages: parseInt(numberOfPages),
            };
    
            return threadInfo;

        } catch (err) {
            updateWhatHappened('Er ging iets mis met het ophalen van informatie over het draadje, probeer het later nog eens!');
        }
    };
 
    prepareDownload().then((value) => {
        updateWhatHappened(`Verbinding gemaakt met de server!`, 1000);

        updateWhatHappened(`Aantal pagina's tellen...`, 3000);

        if (value.numberOfPages >= 40) {
            updateWhatHappened(`Oef, daar is wat afgepraat!`, 6000);
        }
        
        updateWhatHappened(`Klaar om het draadje "${value.title}" te downloaden...`, 9000);

        if (value.numberOfPages >= 30) {
            updateWhatHappened(`Dit draadje telt maar liefst ${value.numberOfPages} pagina's. Check je straks of dat aantal klopt met wat er gedownload is?`, 12000);
        } else {
            updateWhatHappened(`Dit draadje telt ${value.numberOfPages} pagina's. Controleer je zo even of dat klopt?`, 12000);
        }

        function downloadAllThePages() {
            updateWhatHappened(`Bezig met downloaden...`, 15000);

            const allThreadPages = value.numberOfPages + 1;

            // loop over all the pages, and download the associated link
            // in a seperate folder
            for (let i = 1; i < allThreadPages; i++) {
                let download_folder = homedir + '/' + value.sanitizedTitle + '/' + i + '/';

                if (value.numberOfPages == i) {
                    if (pagesDownloaded != value.numberOfPages) {
                        updateWhatHappened(`Even checken of alles er is...`, 16000);

                        timesRun += 1;
                        if (timesRun <= 2) {
                            downloadAllThePages();
                        }
                    } else {
                        updateWhatHappened(`Ik denk dat we er zijn! Check je gebruikersmap voor het mapje vivaforum-downloads.`, 18000);
                    }
                } else {
                    pagesDownloaded += 1;

                    // if we're not at the last iteration, download the page 
                    // and it's assets if the folder doesn't yet exist
                    if (!fs.existsSync(download_folder)) {
                        const options = {
                            urls: download_url + '/' + i,
                            directory: download_folder
                        };

                        scrape(options).then((result) => {
                        });

                        updateWhatHappened(`Pagina ${i} gedownload...`, 15000);
                    } else {
                        if (timesRun == 1) {
                            updateWhatHappened(`Deze (pagina ${i}) heb ik al...`, 15700);
                        }
                    }
                }
            }
        }

        downloadAllThePages();
    });
}

const form = document.querySelector('form#download-form');
form.addEventListener('submit', handleSubmit);

function updateWhatHappened(updateUser, timeDelay) {
    function addUpdate() {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = updateUser;
        paragraph.classList = 'fadeIn';
        document.getElementById("statusUpdate").appendChild(paragraph);
    }

    setTimeout(addUpdate, timeDelay) 
}

function clearOutWhatHappened() {
    document.getElementById("statusUpdate").innerHTML = "";
}

// const myNotification = new Notification('Title', {
//     body: 'Reloaded the app'
// })
  
// myNotification.onclick = () => {
//     console.log('Notification clicked')
// }
