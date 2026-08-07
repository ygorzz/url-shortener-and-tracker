import url from "../models/Url.js"
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
import BaseError from "../errors/BaseError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

export async function createShortUrl(originalUrl, userId) {

    if (!originalUrl) throw new BadRequestError("The original URL is required");
    if (!isValidUrl(originalUrl)) throw new BadRequestError("The URL is invalid");

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const shortUrl = generateShortUrl();
            const createdUrl = await url.create({originalUrl, shortUrl, userId});
            return createdUrl;
        } catch (error) {
            if (error.code !== 11000) {
                throw error;
            }
        }
    }

    throw new BaseError();

}

export async function findAllShortUrls(userId) {
    const urls = await url.find({userId});

    return urls;
}

export async function findShortUrlStats(shortUrl, userId) {

    if (shortUrl.length <= 0 || shortUrl.length > 9) throw new BadRequestError("The URL is invalid");

    const urlStats = await url.findOne({ shortUrl, userId })

    if (!urlStats) throw new NotFoundError("URL not found")

    return urlStats;
}

export async function findOriginalUrl(shortUrl) {

    if (shortUrl.length <= 0 || shortUrl.length > 9) throw new BadRequestError("The URL is invalid");

    const urlDatas = await url.findOneAndUpdate(
        { shortUrl },
        { $inc: { accessCount: 1 } },
        { returnDocument: "after" }
    ).select("originalUrl expiresAtMs updatedAt -_id") // Selects only these fields, excluding the _id that comes by default

    if (!urlDatas) throw new NotFoundError("URL not found");
    if (urlIsExpired(urlDatas)) throw new NotFoundError("Expired URL");

    return urlDatas.originalUrl;
}

export async function deleteShortUrl(shortUrl, userId) {

    if (shortUrl.length <= 0 || shortUrl.length > 9) throw new BadRequestError("The URL is invalid");

    const deletedUrl = await url.findOneAndDelete({ shortUrl, userId });

    if (!deletedUrl) throw new NotFoundError("URL not found");

    return deletedUrl;
}

export async function renewShortUrl(shortUrl, userId) {

    if (shortUrl.length <= 0 || shortUrl.length > 9) throw new BadRequestError("The URL is invalid");

    const updatedUrl = await url.findOneAndUpdate(
        { shortUrl, userId },
        { updatedAt: Date.now() },
        { returnDocument: "after" }
    );

    if (!updatedUrl) throw new NotFoundError("URL not found");

    return updatedUrl;
}


// HELPERS FUNCTIONS
function generateShortUrl(){
    let shortUrl = ""
    let i = 0;
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    while(i <= 2){
        const randomNumber = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
        shortUrl += letters[randomNumber] + randomNumber;
        i++;  
    }

    return shortUrl;
}

function isValidUrl(originalUrl){
    try {
        new URL(originalUrl);
        return true;
    } catch (error) {
        return false;
    };
}
    
function urlIsExpired({expiresAtMs, updatedAt}) {
    const updatedAtMs = updatedAt.getTime();

    return Date.now() - updatedAtMs >= expiresAtMs;
}
