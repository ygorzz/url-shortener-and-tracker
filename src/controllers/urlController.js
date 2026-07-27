import * as urlService from "../services/urlService.js"
export default class UrlController {
    static async createShortUrl(req, res, next) {
        try {
            const userId = req.user.id;
            const { originalUrl } = req.body;
            const shortUrl = await urlService.createShortUrl(originalUrl, userId);
            res.status(201).json({ message: "URL encurtada com sucesso. Será expirada após 24 horas", shortUrl });
        } catch (error) {
            next(error);
        }
    }

    static async findAllShortUrls(req, res, next) {
        try {
            const userId = req.user.id;
            const urls = await urlService.findAllShortUrls(userId);
            res.status(200).json(urls);
        } catch (error) {
            next(error);
        }
    }
    
    static async findShortUrlStats(req, res, next) {
        try {
            const userId = req.user.id;
            const { shortUrl } = req.params;
            const urlStats = await urlService.findShortUrlStats(shortUrl, userId);
            res.status(200).json(urlStats);
        } catch (error) {
            next(error);
        }
    }

    static async redirectShortUrl(req, res, next) {
        try {
            const userId = req.user.id;
            const { shortUrl } = req.params;
            const originalUrl = await urlService.findOriginalUrl(shortUrl, userId)
            res.redirect(301, `${originalUrl}`);
        } catch (error) {
            next(error);
        }
    }


    static async deleteShortUrl(req, res, next) {
        try {
            const userId = req.user.id;
            const { shortUrl } = req.params;
            const deletedUrl = await urlService.deleteShortUrl(shortUrl, userId);
            res.status(200).json({ message: "URL removida com sucesso", deletedUrl })
        } catch (error) {
            next(error);
        }
    }

    static async renewShortUrl(req, res, next) {
        try {
            const userId = req.user.id;
            const { shortUrl } = req.params;
            const updatedUrl = await urlService.renewShortUrl(shortUrl, userId);
            res.status(200).json(updatedUrl);
        } catch (error) {
            next(error);
        }
    }

}