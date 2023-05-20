//set up require statements taken from selenium-lab-example
const { describe, it, expect, afterAll } = require('@jest/globals')
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const service = new chrome.ServiceBuilder;
const driver =  new Builder().forBrowser('chrome').setChromeService(service).build();
let started = false
jest.setTimeout(50000);


describe("search input tests", () => {
    //ensure driver is running
    it('should wait fo the driver to start', () =>{
        return driver.then(() => {started = true})
    })
    


    it("should allow user to select hiking from the activity drop-down", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);
        await driver.wait(until.elementLocated(By.id("selectActivity")))
        //get activity select element
        const selectActivity = await driver.findElement(By.id("selectActivity"));
        await selectActivity.click();
        
        
        //click activity select element
        //await driver.wait(until.elementLocated(By.id("hiking")))        
        const hikingSelect = await driver.findElement(By.id("hiking"));
        await hikingSelect.click();

        //get activity select element
        const selectActivityValue = await driver.findElement(By.id("selectActivity")).getText();
        //assert value to contain sent value
        expect(selectActivityValue).toMatch("Hiking");

    })

    it("should allow user to select biking from the activity drop-down", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);
       
        await driver.wait(until.elementLocated(By.id("selectActivity")))
        //get activity select element
        const selectActivity = await driver.findElement(By.id("selectActivity"));
        await selectActivity.click();
        //click activity select element
        //await driver.wait(until.elementLocated(By.id("biking")))
        const bikingSelect = await driver.findElement(By.id("biking"));
        await bikingSelect.click();
        //get activity select element
        const selectActivityValue = await driver.findElement(By.id("selectActivity")).getText();
        //assert value to contain sent value
        expect(selectActivityValue).toMatch("Biking");

    })


    it("should allow user to input sunny into the weather input", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);

        await driver.wait(until.elementLocated(By.id("minCond")))
        //find weather selection element
        const selectWeather = await driver.findElement(By.id("minCond"));
        await selectWeather.click();
        //input sunny
        selectWeather.sendKeys("sunny");
        //get element again to access sent value
        const weatherCond = await driver.findElement(By.id("minCond"));
        //turn to string to avoid type errors
        const minCondValue = await weatherCond.getAttribute("value");

        expect(minCondValue).toMatch("sunny");

    })

    it("should allow user to input cloudy to the weather input", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);

        await driver.wait(until.elementLocated(By.id("minCond")))
        //find weather selection element
        const selectWeather = await driver.findElement(By.id("minCond"));
        await selectWeather.click();
        //input cloudy
        selectWeather.sendKeys("cloudy");

        //get element again to access sent value
        const weatherCond = await driver.findElement(By.id("minCond"));
        //turn to string to avoid type errors
        const minCondValue = await weatherCond.getAttribute("value");

        expect(minCondValue).toMatch("cloudy");

    })

    it("should allow user to input rainy into the weather input", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);

        await driver.wait(until.elementLocated(By.id("minCond")))
        //find weather selection element        
        const selectWeather = await driver.findElement(By.id("minCond"));
        await selectWeather.click();
        //input rainy
        selectWeather.sendKeys("rainy");

        //get element again to access sent value
        const weatherCond = await driver.findElement(By.id("minCond"));
        //turn to string to avoid type errors
        const minCondValue = await weatherCond.getAttribute("value");

        expect(minCondValue).toMatch("rainy");

    })

    it("should allow user to input snowy into the weather input", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);

        await driver.wait(until.elementLocated(By.id("minCond")))
        //find weather selection element
        const selectWeather = await driver.findElement(By.id("minCond"));
        await selectWeather.click();
        //input snowy
        selectWeather.sendKeys("snowy");

        //get element again to access sent value
        const weatherCond = await driver.findElement(By.id("minCond"));
        //turn to string to avoid type errors
        const minCondValue = await weatherCond.getAttribute("value");

        expect(minCondValue).toMatch("snowy");

    })

    it("should allow the user to select home location for their search", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);

        await driver.wait(until.elementLocated(By.id("savedLocationButton")))
        //find home location button
        const selectHomeLocation = await driver.findElement(By.id("savedLocationButton"));
        await selectHomeLocation.click();

        const selectedLocation = await driver.findElement(By.id("selectedLocation"));
        //turn to string to avoid type errors
        const selectedLocationValue = await selectedLocation.getText();

        expect(selectedLocationValue).toMatch("Home Location");

    })

    it("should allow the user to input a temperature value", async () => {
        //login the user to access search inputs
        //precondition -> navigate to localhost
        await driver.get('http://localhost:3000/');
        //get username input element
        const input = await driver.findElement(By.id("username"));
        //send value to field
        input.sendKeys('testAdminUser123');
        //get password input element
        const input2 = await driver.findElement(By.id("password"));
        //send value to field
        input2.sendKeys('test_Password.1770');
        //send value to field
        const submit = await driver.findElement(By.id("submitButton"));
        await submit.click();
        //wait for url to change
        await driver.wait(until.urlContains("/home"), 10000);


        await driver.wait(until.elementLocated(By.id("minTempy")))
        //find temperature input element
       
        //find weather selection element
        const minTemp = await driver.findElement(By.id("minTempy"));
        await minTemp.click();
        //input snowy
        minTemp.sendKeys("12");

        //get element again to access sent value
        const setTemp = await driver.findElement(By.id("minTempy"));
        //turn to string to avoid type errors
        const setTempValue = await setTemp.getAttribute("value");

        expect(setTempValue).toMatch("12");



    })

    afterAll(async () => {
        await driver.quit()
    });
    
})