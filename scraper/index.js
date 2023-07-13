import puppeteer from "puppeteer";

const url = "https://dragoncity.fandom.com/wiki/Dragons/All";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // await page.screenshot({ path: "josh-comeau.png" });
  const allEggs = await page.evaluate(() => {
    const eggs = document.querySelectorAll(".bm_dragon_name");

    return Array.from(eggs)
      .slice(0, 3)
      .map((egg) => {
        const dragonName = egg.querySelector("span").innerText;
        const url = egg.querySelector("a").href;
        return { dragonName, url };
      });
  });

  console.log(allEggs);
};

main();
