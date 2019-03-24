const puppeteer = require("puppeteer");

module.exports = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, {
      waitUntil: "networkidle0"
    });
  } catch (error) {
    return error;
  }
  let sourceCode = await page.content();
  let URL = await page.url();
  await browser.close();
  return {
    sourceCode,
    url: URL
  };
};
