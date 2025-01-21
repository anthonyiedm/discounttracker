// Continuing src/utils/rate-limit.js
      error: 'Too many requests, please try again later.',
      rateLimitInfo: {
        windowMs: 15 * 60 * 1000,
        maxRequests: 100
      }
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: false,
  skipSuccessfulRequests: false,
  keyGenerator: (req) => {
    return req.headers['x-shopify-shop-domain'] || req.ip;
  }
});

export const configureRateLimit = (options = {}) => {
  return rateLimit({
    ...rateLimiter,
    ...options
  });
};

// src/utils/verify-hmac.js
import crypto from 'crypto';

export const verifyHmac = async (req) => {
  const hmac = req.headers['x-shopify-hmac-sha256'];
  const topic = req.headers['x-shopify-topic'];
  const shop = req.headers['x-shopify-shop-domain'];
  
  if (!hmac || !topic || !shop) {
    return false;
  }

  const rawBody = await getRawBody(req);
  const calculatedHmac = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(rawBody, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(calculatedHmac)
  );
};

// Helper function to get raw body from request
const getRawBody = async (req) => {
  if (req.rawBody) return req.rawBody;
  
  return new Promise((resolve, reject) => {
    let data = '';
    
    req.on('data', (chunk) => {
      data += chunk;
    });
    
    req.on('end', () => {
      resolve(data);
    });
    
    req.on('error', (err) => {
      reject(err);
    });
  });
};

export const verifyProxy = (query) => {
  const { signature, ...params } = query;

  if (!signature) {
    return false;
  }

  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

  const message = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('');

  const calculatedSignature = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex');

  return signature === calculatedSignature;
};

// Additional HMAC verification utilities
export const verifyWebhookHmac = (rawBody, hmac) => {
  const calculatedHmac = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(rawBody, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(calculatedHmac)
  );
};

export const generateHmac = (data) => {
  return crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(JSON.stringify(data))
    .digest('hex');
};

// Webhook verification middleware
export const webhookVerification = async (req, res, next) => {
  try {
    const hmacValid = await verifyHmac(req);
    if (!hmacValid) {
      return res.status(401).json({ error: 'Invalid HMAC' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Webhook verification failed' });
  }
};