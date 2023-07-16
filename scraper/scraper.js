// let puppeteer = require("puppeteer");
// let fs = require("fs");
// import { AsyncStorage } from "react-native";

const url = "https://dragoncity.fandom.com/wiki/Dragons/All";

const scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // await page.screenshot({ path: "josh-comeau.png" });
  const allEggs = await page.evaluate(() => {
    const eggs = document.querySelectorAll(".bm_dragon_name");

    return Array.from(eggs)
      .slice(0, 10)
      .map((egg) => {
        const dragonName = egg.querySelector("span").innerText;
        const url = egg.querySelector("a").href;
        const imageUrl = egg.querySelector("img").src;
        return { dragonName, url, imageUrl };
      });
  });

  // console.log(allEggs);
  // const fs = require("fs");

  //WRITE TO FILE
  // fs.writeFile("./dragons.json", JSON.stringify(allEggs), (err) =>
  //   err ? console.log(err) : null
  // );
};

scraper();
