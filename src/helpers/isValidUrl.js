export default function isValidUrl(originalUrl){
    try {
        new URL(originalUrl);
        return true;
    } catch (error) {
        return false;
    };
}