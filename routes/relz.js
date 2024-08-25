const axios = require('axios');
const cheerio = require('cheerio');
const process = require('process');

// Headers for the HTTP requests
const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'DNT': '1',  // Do Not Track Request Header
    'Connection': 'close',
    'Referer': 'https://linkvertise.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x66) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
};

// Regular expression to extract key from the content
const keyRegex1 = /let content = "([^"]+)";/;
const keyRegex2 = /class="card-key" id="key" value="([^"]+)"/;

async function fetch(url, referer) {
    try {
        const response = await axios.get(url, { headers: { ...headers, Referer: referer } });
        return { content: response.data, status: response.status, errorContent: null };
    } catch (error) {
        return { content: null, status: error.response ? error.response.status : 500, errorContent: error.message };
    }
}

async function processLink() {
    // The URLs are predefined; no need to extract or input any HWID.
    const endpoints = [
        {
            url: "https://nicuse.xyz/getkey",
            referer: "https://linkvertise.com"
        },
        {
            url: "https://nicuse.xyz/getkey/check1.php",
            referer: "https://linkvertise.com"
        },
        {
            url: "https://nicuse.xyz/getkey/check2.php",
            referer: "https://linkvertise.com"
        },
        {
            url: "https://nicuse.xyz/getkey/",
            referer: "https://linkvertise.com"
        }
    ];

    for (let i = 0; i < endpoints.length; i++) {
        const { url, referer } = endpoints[i];
        const { content, status, errorContent } = await fetch(url, referer);

        if (errorContent) {
            return {
                status: "error",
                message: `Failed to bypass at step ${i} | Status code: ${status}`,
                content: errorContent
            };
        }

        if (i === endpoints.length - 1) {  // End of the bypass
            const match1 = content.match(keyRegex1);
            const match2 = content.match(keyRegex2);
            const match = match1 || match2;

            if (match) {
                return {
                    status: "success",
                    key: match[1]
                };
            } else {
                return {
                    status: "error",
                    message: "Bypass not successful! No key found.",
                    content: content
                };
            }
        }
    }
}

async function main() {
    const startTime = process.hrtime();  // Start time
    const result = await processLink();
    const endTime = process.hrtime(startTime);  // End time
    const executionTime = endTime[0] + endTime[1] / 1e9;  // Calculate execution time
    result.execution_time = executionTime;  // Add execution time to the result
    console.log(result);
}

main();
