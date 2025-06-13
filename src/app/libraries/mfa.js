export function generateMfaCode(secret) {
    const time = Math.floor(Date.now() / 30000);
    const hash = require('crypto').createHmac('sha256', secret).update(time.toString()).digest('hex');
    return hash.slice(0, 6);
}