// src/pages/api/webhooks/[topic].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyHmac } from '../../../utils/verify-hmac';
import { errorHandler } from '../../../utils/error-handler';
import { ShopModel } from '../../../models/Shop/ShopModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify webhook authenticity
    const hmacValid = await verifyHmac(req);
    if (!hmacValid) {
      return res.status(401).json({ error: 'Invalid HMAC' });
    }

    const { topic } = req.query;
    const shop = req.headers['x-shopify-shop-domain'] as string;

    switch (topic) {
      case 'app/uninstalled':
        await handleUninstall(shop);
        break;
      
      case 'discounts/create':
      case 'discounts/update':
      case 'discounts/delete':
        await handleDiscountWebhook(topic as string, req.body);
        break;
      
      default:
        return res.status(404).json({ error: 'Unknown webhook topic' });
    }

    return res.status(200).end();
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

async function handleUninstall(shop: string) {
  await ShopModel.findOneAndUpdate(
    { shop },
    { 
      isActive: false,
      uninstalledAt: new Date()
    }
  );
}

async function handleDiscountWebhook(topic: string, data: any) {
  // Implement discount webhook handling logic
}

// src/pages/api/webhooks/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Shopify } from '@shopify/shopify-api';
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

    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);

    const webhooks = [
      {
        topic: 'app/uninstalled',
        address: `${process.env.SHOPIFY_APP_URL}/api/webhooks/app/uninstalled`
      },
      {
        topic: 'discounts/create',
        address: `${process.env.SHOPIFY_APP_URL}/api/webhooks/discounts/create`
      },
      {
        topic: 'discounts/update',
        address: `${process.env.SHOPIFY_APP_URL}/api/webhooks/discounts/update`
      },
      {
        topic: 'discounts/delete',
        address: `${process.env.SHOPIFY_APP_URL}/api/webhooks/discounts/delete`
      }
    ];

    const registrations = await Promise.all(
      webhooks.map(webhook =>
        client.post({
          path: 'webhooks',
          data: { webhook }
        })
      )
    );

    return res.status(200).json({ success: true, registrations });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}