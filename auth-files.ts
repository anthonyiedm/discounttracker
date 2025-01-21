// src/pages/api/auth/[...auth].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Shopify } from '@shopify/shopify-api';
import { handleAuthStart, handleCallback } from '../../../utils/auth';
import { errorHandler } from '../../../utils/error-handler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { auth } = req.query;

    switch (auth[0]) {
      case 'login':
        return await handleAuthStart(req, res);
      
      case 'callback':
        return await handleCallback(req, res);
      
      default:
        return res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

// src/pages/api/auth/token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { validateSession } from '../../../utils/auth';
import { errorHandler } from '../../../utils/error-handler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const session = await validateSession(req);
    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    return res.status(200).json({
      accessToken: session.accessToken,
      expiresAt: session.expires
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}