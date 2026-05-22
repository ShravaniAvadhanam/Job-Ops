import { chromium } from 'playwright';

async function extractJd(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000); // Wait for hydration
    const bodyText = await page.evaluate(() => document.body?.innerText ?? '');
    const title = await page.title();
    console.log(JSON.stringify({ title, bodyText }));
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
}

const url = process.argv[2];
if (url) {
  extractJd(url);
} else {
  console.error("No URL provided");
}
