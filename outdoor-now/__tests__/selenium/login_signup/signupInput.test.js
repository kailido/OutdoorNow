//set up require statements taken from selenium-lab-example
const { describe, it, expect, afterAll } = require('@jest/globals')
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const service = new chrome.ServiceBuilder;
const driver =  new Builder().forBrowser('chrome').setChromeService(service).build();
let started = false
jest.setTimeout(50000);

describe("login input tests", () => {
    //ensure driver is running
    it('should wait fo the driver to start', () =>{
        return driver.then(() => {started = true})
    })

    it('should have a title of OutdoorNow', async () => {
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get title
        const title = await driver.getTitle();
        //assert title is OutdoorNow 
        expect(title).toMatch('OutdoorNow');
    })

    it("should allow users to input info into the username field", async () => {
        //precondition -> navigate to localhost signup page
        await driver.get('http://localhost:3000/signup');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //wait until the input field is visible and enabled
        await driver.wait(until.elementIsVisible(input), 5000);
        await driver.wait(until.elementIsEnabled(input), 5000);
        //send value to field
        input.sendKeys('testUsername');
        //get element again to access sent value
        const input2 = await driver.findElement(By.id("username"));
        //turn to string to avoid type errors
        const val = String(await input2.getAttribute("value"));
        //assert value to contain sent value
        expect(val).toMatch('testUsername');
    })

    it("should allow users to input info into the password field", async () => {
        //precondition -> navigate to localhost signup page
        await driver.get('http://localhost:3000/signup');
        //get username input element
        const input = await driver.findElement(By.id("password"));
        //wait until the input field is visible and enabled
        await driver.wait(until.elementIsVisible(input), 5000);
        await driver.wait(until.elementIsEnabled(input), 5000);
        //send value to field
        input.sendKeys('testPassword.123');
        //wait to avoid errors
        await driver.wait(until.elementLocated(By.id("password")))
        //get element again to access sent value
        const input2 = await driver.findElement(By.id("password"));
        //turn to string to avoid type errors
        const val = String(await input2.getAttribute("value"));
        //assert value to contain sent value
        expect(val).toMatch('testPassword.123');
    })

    it("should allow users to input info into the password2 field", async () => {
        //precondition -> navigate to localhost signup page
        await driver.get('http://localhost:3000/signup');
        //get username input element
        const input = await driver.findElement(By.id("password2"));
        //wait until the input field is visible and enabled
        await driver.wait(until.elementIsVisible(input), 5000);
        await driver.wait(until.elementIsEnabled(input), 5000);
        //send value to field
        input.sendKeys('testPassword.123');
        //wait to avoid errors
        await driver.wait(until.elementLocated(By.id("password2")))
        //get element again to access sent value
        const input2 = await driver.findElement(By.id("password2"));
        //turn to string to avoid type errors
        const val = String(await input2.getAttribute("value"));
        //assert value to contain sent value
        expect(val).toMatch('testPassword.123');
    })

    afterAll(async () => {
        await driver.quit()
    });

});