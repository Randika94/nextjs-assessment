export function generateMfaCode(secret) {
    const time = Math.floor(Date.now() / 100000);
    const hash = require('crypto').createHmac('sha1', secret).update(time.toString()).digest('hex').replace(/\D/g, '');
    return hash.padEnd(6, '0').slice(0, 6);
}