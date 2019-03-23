const puppeteer = require("puppeteer");

module.exports = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, {
      waitUntil: "load",
      timeout: 20000
    });
  } catch (error) {
    return error;
  }
  let sourceCode = await page.content();
  sourceCode += `<script type='text/javascript'>
    document.addEventListener('click', event => {
      event.preventDefault();
    });
    document.addEventListener('keypress', event => {
      event.preventDefault();
    })
  </script>`;
  return sourceCode;
};
