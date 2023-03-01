// Sy7JcNRz!4ZJba

const puppeteer = require('puppeteer');
const createSourceURL = "https://app.contentful.com/spaces/ep40s6qbzmf4/entries/4Q83BTjpOb8u2JLcar4Gc"


csvObject = {
    name: "autopilot", 
    display_name: "Autopilot", 
    url: "https://www.autopilothq.com/ ", 
    type_of_solution: "Marketing automation software", 
    used_for: "managing and connecting with your leads and customers in one place: seamlessly sync information from your CRM, capture new leads from your website, and segment your audience to create and send highly personalized messages across email, SMS, pop-ups and forms", 
    api_documentation_url: "https://api.otto.market/docs", 
    example_request_method: "GET", 
    example_request_endpoint_name: "Get installation for a service provider app", 
    example_request_url: "https://api.otto.market/v1/apps", 
    
    example_curl_api_call: "curl --request GET \
    --url https://api.otto.market/v1/apps/%7BappId%7D/installation \
    --header 'Authorization: Bearer REPLACE_BEARER_TOKEN'", 
    
    example_api_endpoints: "", 
    authentication_description: "Access to the API in provided for following two  environments",
    
    pagination_description: "Interfaces may return a list with resources (orders, shipments...) and a way to navigate these lists. Please pay attention to the response pattern to identify how to handle lists. There are two common ways list handling is implemented. One way to retrieve the next entry of a list is by using links for navigation the entries. The other is by providing list pages to iterate through lists.    For pagination, the basic query parameter 'limit' (e.g. ?limit=10) can be used to define the maximum amount of resulting entities returned per call. The interface itself can reduce the limit lower than your client limit.", 
    request_parameters_description: "Some API endpoints require unique identifiers from a previous API response to be included in the URL path. For instance, to get {{XXXXXXX}}, you need a {{XXXXXXX}} that is returned from another endpoint.",
    
    rate_limit_description: "A high volume of calls on API services at any given time would increase server resource consumption. If the load is due to an unauthorized intrusion it would be a chaos. Thus, rate limiting becomes extremely important.    In general requests are limited to 20 requests per second per partner-id as received inside the header. Exceeding the rate limit results in a HTTP 429 'too many requests' error. For some endpoints the rate limit is lower to ensure the best quality for all API users"
    };

(async () => { 
    const browser = await puppeteer.launch(
        { 
            headless: false, 
            userDataDir: "./user_data", 
            args: [`--window-size=1920,1080`],
            defaultViewport: {
                width:1680,

                height:1050
            }
        });
    const page = await browser.newPage();
    await page.goto(createSourceURL, { waitUntil: "networkidle0" }); // wait until page completely loads

    var singleLinefields = [
        "name",
        "display_name", 
        "url", 
        "type_of_solution", 
        "used_for", 
        "api_documentation_url", 
        "example_request_method", 
        "example_request_endpoint_name", 
        "example_request_url"
    ]; 

    var multiLineFields = [
        "example_curl_api_call"
    ] 

    var codeFields = [
        "example_api_endpoints", 
        "authentication_description", 
        "pagination_description", 
        "request_parameters_description", 
        "rate_limit_description"
    ]

    const inputs = await page.$$("input");

    for (i = 0; i < singleLinefields.length; i++) { 
        await inputs[i].type(csvObject[singleLinefields[i]]);
    }

    const multiLines = await page.$$("textarea.css-rf9puu");

    for (j = 0; j < multiLineFields.length; j++) { 
        await multiLines[j].type(csvObject[multiLineFields[j]]);
    }

    // type() uses querySelector, not querySelectorAll, so assign a unique class to each codeblock 
    await page.evaluate(() => {
        const elements = [...document.querySelectorAll("pre.CodeMirror-line")];
        for (l = 0; l < elements.length; l++) { 
            elements[l].classList.add(`codeblock-${l}`); 
        }
    });

    for (k = 0; k < codeFields.length; k++) { 
        await page.click(`pre.codeblock-${k}`); 
        await page.type(`pre.codeblock-${k}`, csvObject[codeFields[k]] ); 
    }

})(); 