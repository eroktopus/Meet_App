import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(async () => {
    await browser.close();
  });

  // Scenario 1
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details-section");
    expect(eventDetails).toBeNull();
  });

  // Scenario 2
  test("User can expand an event to see its details", async () => {
    await page.click(".event .event-details-button");
    const eventDetails = await page.$(".event .details-section");
    expect(eventDetails).toBeDefined();
  });

  // Scenario 3
  test("User can collapse an event to hide details", async () => {
    await page.click(".event .event-details-button");
    const eventDetails = await page.$(".event .details-section");
    expect(eventDetails).toBeNull();
  });
});
