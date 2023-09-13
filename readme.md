# Wuzzuf Scrapper 

This project is a web scraping tool built using Node.js and Puppeteer to extract job search results data from a wuzzuf based on a search word. It allows you to scrape job titles, company names, job types, and job locations and save the data into a CSV file for further analysis or reference.

## Table of Contents
- [Wuzzuf Scrapper](#wuzzuf-scrapper)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Example](#example)
  - [Contributing](#contributing)
  - [Contact](#contact)

## Installation

Before you can use this web scraping tool, you need to set up the required dependencies:

1. **Node.js**: If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

2. **Puppeteer**: Puppeteer is a headless browser automation tool for Node.js. Install it using npm:

   ```bash
   npm install puppeteer
   ```

3. **CSV Writer Library**: To save the scraped data to a CSV file, you can use a library like `csv-writer`:

   ```bash
   npm install csv-writer
   ```

## Usage

1. Clone this repository or download the project files to your local machine.

2. Open the terminal and navigate to the project directory.

3. Run the scraping script:

   ```bash
   node index.js
   ```

4. update the searchWord var with the keyword that you want (e.g., "node.js developer")

5. The scraper will then navigate to the provided URL, search for the specified keyword, and start extracting job details.

6. Once the scraping is complete, the script will save the extracted data to a CSV file named `job-results.csv` in the project directory.

## Configuration

You can configure the scraping behavior by modifying the `index.js` file. Here are some aspects you can customize:

- **Puppeteer Options**: You can adjust Puppeteer settings such as headless mode, browser launch options, and more in the script's Puppeteer configuration section.

- **Data Extraction**: The script is currently set up to extract job titles, company names, job types, and job locations. You can modify the XPath selectors or other scraping logic to extract additional data or different fields.

- **CSV Output**: You can change the CSV file's name and output location by modifying the code that creates and writes to the CSV file.

## Example

Here's an example of how to use the web scraping tool:

1. update the search word, e.g., "node.js developer."

2. Run the script using  ` npm start`.
   
3. The script will start scraping the job results and save them to a CSV file.

## Contributing

Feel free to contribute to this project by creating pull requests, reporting issues, or suggesting improvements. Your contributions are welcome!

## Contact
If you have any questions or need assistance with this project, feel free to reach out to [linkedin](https://www.linkedin.com/in/mohamed-reda-elbadawi/).
Happy automating!