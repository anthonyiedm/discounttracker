// src/config/billing.js

const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic Plan',
    price: 9.99,
    interval: 'EVERY_30_DAYS',
    trialDays: 14,
    features: [
      'Track up to 100 discounts',
      'Basic analytics',
      'Email support'
    ]
  },
  PRO: {
    name: 'Professional Plan',
    price: 29.99,
    interval: 'EVERY_30_DAYS',
    trialDays: 14,
    features: [
      'Unlimited discount tracking',
      'Advanced analytics',
      'Priority support',
      'Custom reports'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise Plan',
    price: 99.99,
    interval: 'EVERY_30_DAYS',
    trialDays: 14,
    features: [
      'All Pro features',
      'Dedicated support',
      'Custom integration',
      'API access',
      'Multiple user accounts'
    ]
  }
};

const createSubscriptionMutation = (planName) => {
  const plan = SUBSCRIPTION_PLANS[planName];
  return {
    query: `mutation createSubscription {
      appSubscriptionCreate(
        name: "${plan.name}"
        returnUrl: "${process.env.SHOPIFY_APP_URL}/auth/callback"
        trialDays: ${plan.trialDays}
        lineItems: [{
          plan: {
            appRecurringPricingDetails: {
              price: { amount: ${plan.price}, currencyCode: USD }
              interval: ${plan.interval}
            }
          }
        }]
      ) {
        userErrors {
          field
          message
        }
        confirmationUrl
        appSubscription {
          id
          status
        }
      }
    }`
  };
};

const validateSubscription = async (session) => {
  const query = `{
    currentAppInstallation {
      activeSubscriptions {
        id
        status
        lineItems {
          plan {
            pricingDetails {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }`;

  return { query };
};

module.exports = {
  SUBSCRIPTION_PLANS,
  createSubscriptionMutation,
  validateSubscription
};
