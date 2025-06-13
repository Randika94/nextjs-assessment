import crypto from 'crypto';

const store = new Map();

export async function POST(req) {
  try {
    const { username } = await req.json();
    const last = store.get(username);
    const now = Date.now();

    if (!username) {
      return new Response(JSON.stringify({ error: 'Username is required!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (last && now - last.issuedAt < 10000) {
      return new Response(JSON.stringify({ error: 'Try again after 10 seconds!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const secureWord = crypto.createHash('sha256').update(username + now).digest('hex').slice(0, 8);
    store.set(username, { secureWord });

    return new Response(JSON.stringify({ secureWord }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}