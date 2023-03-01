// Sy7JcNRz!4ZJba

const puppeteer = require('puppeteer');

const createSourceURL = "https://app.contentful.com/spaces/ep40s6qbzmf4/entries/63Tm2em6POhTIVJafe08bq";

(async () => { 
    const browser = await puppeteer.launch(
        { 
            headless: false, 
            userDataDir: "./user_data", 
            args: [`--window-size=1920,1080`],
            defaultViewport: {
                width:1680,
                height:1050
            }
        });
    const page = await browser.newPage();
    await page.goto(createSourceURL, { waitUntil: "networkidle0" }); // wait until page completely loads

})(); 