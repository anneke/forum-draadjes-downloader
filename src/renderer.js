// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const os = require('os');
const fs = require('fs');
const scrape = require('website-scraper');
const SaveToExistingDirectoryPlugin = require('website-scraper-existing-directory');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const slugify = require('slugify');
  
const homedir = os.homedir() + '/vivaforum-downloads/'; 
  
function handleSubmit(event) {
    event.preventDefault();

    clearOutWhatHappened();

    const download_old_topic = document.getElementById('download_old_topic');
    const download_topic = document.getElementById('download_topic').value;
    const download_topic_id = document.getElementById('download_topic_id').value;

    if (download_old_topic.checked) {
        // if the user wants to download an older topic, change the download URL
        download_url = `https://forum.viva.nl/geld-recht/${slugify(download_topic)}/list_messages/${slugify(download_topic_id)}`;
    } else {
        download_url_value = document.getElementById('download_url').value;
        download_url = download_url_value.split('?')[0];
    }

    let timesRun = 0;

    async function prepareDownload() {
        try {
            const response = await fetch(download_url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
                        
            const text = await response.text();
            const dom = await new JSDOM(text);

            const pageTitle = await dom.window.document.querySelector("h1").textContent.trim();
            const numberOfPages = await dom.window.document.querySelector(".pagination__nav li:nth-last-child(2) a").textContent;
            const dateAndTime = await dom.window.document.querySelector(".meta__left > span:first-child").innerHTML;

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
            updateWhatHappened('Er ging iets mis met het ophalen van informatie over het draadje');
            setTimeout(prepareDownload, 3000);
        }
    };
 
    prepareDownload().then((value) => {

        const numberOfPagesDownloaded = fs.readdirSync(homedir + '/' + value.sanitizedTitle + '/').length;
          
        if (timesRun == 0) {
            updateWhatHappened(`Verbinding gemaakt met de server!`, 1000);

            updateWhatHappened(`Klaar om het draadje "${value.title}" te downloaden...`, 3000);

            updateWhatHappened(`Aantal pagina's tellen...`, 6000);

            if (value.numberOfPages >= 40) {
                updateWhatHappened(`Oef, daar is wat afgepraat!`, 9000);
            }

            if (value.numberOfPages >= 100) {
                updateWhatHappened(`Dit draadje telt maar liefst ${value.numberOfPages} pagina's. Ik heb waarschijnlijk wat meer tijd nodig om alles te downloaden en te verwerken!`, 12000);
            } else {
                updateWhatHappened(`Dit draadje telt ${value.numberOfPages} pagina's. Controleer je zo even of dat klopt?`, 12000);
            }
        }

        function downloadAllThePages() {
            const allThreadPages = value.numberOfPages + 1;

            // loop over all the pages, and download the associated link
            // in a seperate folder
            for (let i = 1; i < allThreadPages; i++) {

                // check if we're in the last iteration
                if (value.numberOfPages == i) {
                    updateWhatHappened(`Even checken of alles er is...`, 16000);

                    // if the number of pages downloaded doesn't match the 
                    // number of pages in the forum thread, we must have
                    // missed a few; 
                    if (numberOfPagesDownloaded == value.numberOfPages) {

                        timesRun += 1;
                        if (timesRun <= 3) {
                            updateWhatHappened(`Ik denk dat er nog wat mist, ik kijk nog een keer.`, 16000);
                            setTimeout(downloadAllThePages, 20000);
                        }

                        if (timesRun == 3) {
                            if (value.numberOfPages >= 100) {
                                updateWhatHappened(`Omdat het zoveel pagina's waren doe ik nog een laatste controle!.`, 19000);
                                setTimeout(downloadAllThePages, 30000);
                            }
                        }
                    } else {
                        updateWhatHappened(`Ik denk dat we er zijn! Check je gebruikersmap voor het mapje vivaforum-downloads.`, 33000, "succes.svg");
                    }
                } else {                  
                    let download_folder = homedir + '/' + value.sanitizedTitle + '/';

                    // if we're not at the last iteration, download the page 
                    // and it's assets if the folder doesn't yet exist
                    if (!fs.existsSync(download_folder + `pagina-${i}.html`)) {
                        const options = {
                            urls: download_url + '/' + i,
                            directory: download_folder,
                            defaultFilename: `pagina-${i}.html`,
                            plugins: [ new SaveToExistingDirectoryPlugin() ]
                        };

                        scrape(options).then((result) => {
                            console.log(result);
                        });

                    } 
                }
            }
        }

        downloadAllThePages();
    });
}

const form = document.querySelector('form#download-form');
form.addEventListener('submit', handleSubmit);

const formOld = document.querySelector('form#old-topic-downloading');
formOld.addEventListener('submit', handleSubmit);

function updateWhatHappened(updateUser, timeDelay, icon = "") {
    function addUpdate() {
        clearOutWhatHappened();
        const paragraph = document.createElement("p");
        if (icon != "") {
            paragraph.innerHTML =
                `<img src="${icon}" alt="" width="20" height="20" style="margin-right: .5rem; float: left;">` + updateUser;
        } else {
            paragraph.innerHTML = updateUser;
        }
            
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
