import express from "express";
import UrlController from "../controllers/urlController.js";
import * as rateLimit from "../middlewares/rateLimit.js";
import auth from "../middlewares/auth.js";

const routes = express.Router();

routes
    .post("/shortUrl", rateLimit.creationLimiter, auth, UrlController.createShortUrl)
    .get("/shortUrls", rateLimit.getUrlsLimiter, auth, UrlController.findAllShortUrls)
    .get("/stats/:shortUrl", rateLimit.getStatsLimiter, auth, UrlController.findShortUrlStats)
    .get("/redirect/:shortUrl", rateLimit.redirectLimiter, auth, UrlController.redirectShortUrl)
    .delete("/:shortUrl", rateLimit.deletionLimiter, auth, UrlController.deleteShortUrl)
    .put("/renew/:shortUrl", rateLimit.updateLimiter, auth, UrlController.renewShortUrl)

export default routes;