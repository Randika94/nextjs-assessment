import crypto from 'crypto';
import { mfaStore } from '../../libraries/mfaStore';
import { generateMfaCode } from '../../libraries/mfa';

export async function POST(req) {
  try {
    const { username, hashedPassword, secureWord } = await req.json();

    if (!username || !hashedPassword || !secureWord) {
      return new Response(JSON.stringify({ error: 'Some fields are missing!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let entry = mfaStore.get(username);
    if (!entry) {
      const secret = crypto.randomBytes(20).toString('hex');
      entry = { secret, attempts: 0 };
      mfaStore.set(username, entry);

      return new Response(JSON.stringify({ error: 'Invalid Secure Word!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const mfaCode = generateMfaCode(entry.secret);

    return new Response(JSON.stringify({
      message: 'OTP sent successfully! OTP is : '+ mfaCode,
      token: mfaCode,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Login API error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}