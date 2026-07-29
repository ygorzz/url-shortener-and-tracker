import express from "express";
import UrlController from "../controllers/urlController.js";
import * as rateLimit from "../middlewares/rateLimit.js";
import auth from "../middlewares/auth.js";

const routes = express.Router();

routes
    .post("/shortUrls", rateLimit.creationLimiter, auth, UrlController.createShortUrl)
    .get("/shortUrls", rateLimit.getUrlsLimiter, auth, UrlController.findAllShortUrls)
    .get("/shortUrls/:shortUrl/stats", rateLimit.getStatsLimiter, auth, UrlController.findShortUrlStats)
    .get("/shortUrls/:shortUrl/redirect", rateLimit.redirectLimiter, auth, UrlController.redirectShortUrl)
    .put("/shortUrls/:shortUrl/renew", rateLimit.updateLimiter, auth, UrlController.renewShortUrl)
    .delete("/shortUrls/:shortUrl", rateLimit.deletionLimiter, auth, UrlController.deleteShortUrl)

export default routes;