import { mfaStore } from '../../libraries/mfaStore';
import { generateMfaCode } from '../../libraries/mfa';

export async function POST(req) {
  try {
    const { username, code } = await req.json();
    const entry = mfaStore.get(username);

    if (!username || !code || !/^\d{6}$/.test(code)) {
      return new Response(JSON.stringify({ error: 'OTP must be exactly 6 digits.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!entry) {
      return new Response(JSON.stringify({ error: 'No MFA session!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (entry.attempts >= 3) {
      return new Response(JSON.stringify({ error: 'Too many attempts' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const valid = generateMfaCode(entry.secret);

    if (code === valid) {
      mfaStore.delete(username);
      return new Response(JSON.stringify({ message: 'Login Successful!', token: valid }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      entry.attempts++;
      mfaStore.set(username, entry);
      return new Response(
        JSON.stringify({ error: 'Invalid code', remaining: 3 - entry.attempts }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}