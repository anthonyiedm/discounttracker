// src/config/scopes.js

// Base scopes required for core functionality
const BASE_SCOPES = [
  'read_products',
  'write_products',
  'read_orders',
  'read_discounts',
  'write_discounts'
];

// Additional scopes for premium features
const PREMIUM_SCOPES = [
  'read_customers',
  'read_marketing_events',
  'write_marketing_events'
];

// Scopes needed for specific features
const FEATURE_SCOPES = {
  analytics: [
    'read_analytics'
  ],
  marketing: [
    'read_marketing_events',
    'write_marketing_events'
  ],
  customers: [
    'read_customers',
    'write_customers'
  ]
};

// Scope requirements by plan
const PLAN_SCOPES = {
  basic: [...BASE_SCOPES],
  pro: [...BASE_SCOPES, 'read_analytics', 'read_customers'],
  enterprise: [...BASE_SCOPES, ...PREMIUM_SCOPES]
};

// Function to validate required scopes
const validateScopes = (currentScopes, requiredScopes) => {
  return requiredScopes.every(scope => currentScopes.includes(scope));
};

// Function to get missing scopes
const getMissingScopes = (currentScopes, requiredScopes) => {
  return requiredScopes.filter(scope => !currentScopes.includes(scope));
};

// Function to get scopes for a specific feature
const getFeatureScopes = (feature) => {
  return FEATURE_SCOPES[feature] || [];
};

// Function to get all required scopes for a plan
const getPlanScopes = (planName) => {
  return PLAN_SCOPES[planName.toLowerCase()] || PLAN_SCOPES.basic;
};

module.exports = {
  BASE_SCOPES,
  PREMIUM_SCOPES,
  FEATURE_SCOPES,
  PLAN_SCOPES,
  validateScopes,
  getMissingScopes,
  getFeatureScopes,
  getPlanScopes
};
