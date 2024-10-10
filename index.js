// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  
  //set a running total of the articles so that we can exit when exactly 100 articles are compared
  let totalArticles = 0;
  
  //For loop iterates through the table rows of the articles on the page
  //2nd row of each article has the DateTime stamp in the title attribute
  //Get the DateTime value from the title and convert to date and then get the milliseconds
  //Compare the time in milliseconds of the top article with the one below it
  //If the top article milliseconds are bigger then continue executing the for loop otherwise exit the loop with the message that the sorting is not correct
  for (let i=2; i < 90; i+=3){
    if(totalArticles === 100){
      console.log("Articles 1 - 100 are sorted from newest to oldest");
      break;
    }
    if(i===89){
      //Reached end of page. Click the More link to go to the next page
      await page.locator('//*[@id="hnmain"]/tbody/tr[3]/td/table/tbody/tr[92]/td[2]/a').click();
      i=2;  //reset the index back to original value to restart the loop again
      continue;
    }
    else    {
      totalArticles = totalArticles + 1;

      const element1 = await page.locator('//*[@id="hnmain"]/tbody/tr[3]/td/table/tbody/tr[' + i +']/td[2]/span/span[2]').getAttribute('title');
      const element2 = await page.locator('//*[@id="hnmain"]/tbody/tr[3]/td/table/tbody/tr[' + (i+3) +']/td[2]/span/span[2]').getAttribute('title');

      const dtInmilSec1 = new Date(element1).getTime();
      const dtInmilSec2 = new Date(element2).getTime();

      if(totalArticles < 100){
        console.log(totalArticles);
        console.log("Article"+totalArticles + "=" + dtInmilSec1 + " is greater than " + "Article"+ (totalArticles+1) + "=" + dtInmilSec2 );
      }

      if(dtInmilSec1 < dtInmilSec2){
          console.log("Articles are not sorted from newest to oldest");
          break;
      }    
    } 
  }

  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
