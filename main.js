const puppeteer = require('puppeteer')
const http = require('http')
const url = require('url')

const requestListener = async function (req, res) {
    const htmlUrl = url.parse(req.url,true).query.url;
    if(!htmlUrl){
        res.end()
        return;
    }
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(htmlUrl)
    const buffer = await page.pdf({ format: 'A4' })
    res.end(buffer)
    browser.close()

}

const server = http.createServer(requestListener)
server.listen(8080)


