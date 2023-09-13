const { error } = require('console');
const puppeteer = require('puppeteer')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const searchWord = 'nodejs'

const searchLink = `https://wuzzuf.net/search/jobs/?a=hpb&q=${searchWord}&start=`

let data = []

async function main(searchLink) {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${searchLink}0`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#app > div > div.css-ryrhs0 > div > div > div.css-b8ewlj.e1v1l3u10 > div.css-tbpo9i > span.css-12razwi > strong',);
    const jobsCount = await page.$eval('#app > div > div.css-ryrhs0 > div > div > div.css-b8ewlj.e1v1l3u10 > div.css-tbpo9i > span.css-12razwi > strong', option => option.textContent);

    let index = 0;
    let extracted = 0
    while (extracted < parseInt(jobsCount)) {
        const resultPerPage = await getDataPerPage(browser, `${searchLink}${index}`)
        data.push(resultPerPage)
        extracted += resultPerPage.length
        index++;
    }
    await browser.close();
    data = data.flat()
    writeResultToFile(data);

}

function writeResultToFile(data) {

    const csvWriter = createCsvWriter({
        path: `${searchWord}-result.csv`,
        header: [
            { id: 'title', title: 'title' },
            { id: 'location', title: 'location' },
            { id: 'type', title: 'type' },
            { id: 'date', title: 'date' },
            { id: 'company', title: 'company' },
            { id: 'link', title: 'link' },
        ]
    });

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully')).catch((err) => {
            console.error(`${error}`)
        });
}

async function getDataPerPage(browser, searchLink) {
    const data = [];
    const page = await browser.newPage();
    await page.goto(searchLink, { waitUntil: 'domcontentloaded' });
    const jobsTitle = await page.$$eval('div.css-laomuu > h2 > a', options => {
        return options.map(option => option.textContent)
    })
    const jobslink = await page.$$eval('div.css-laomuu > h2 > a', options => {
        return options.map(option => option.href)
    })
    const jobsLocation = await page.$$eval('div > div.css-laomuu > div > span', options => {
        return options.map(option => option.textContent);
    });
    const publishDates = await page.$$eval('div > div.css-laomuu > div > div', options => {
        return options.map(option => option.textContent);
    })
    const jobsType = await page.$$eval('div.css-y4udm8 > div.css-1lh32fc > a > span', options => {
        return options.map(option => option.textContent);
    })
    const companiesName = await page.$$eval('div > div.css-laomuu > div > a', options => {
        return options.map(option => option.textContent);
    })
    for (let i = 0; i < jobsTitle.length; i++) {
        data.push({ title: jobsTitle[i], location: jobsLocation[i], type: jobsType[i], date: publishDates[i], company: companiesName[i], link: jobslink[i] })
    }
    await page.close();
    return data;
}

main(searchLink);

