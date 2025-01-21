// src/pages/api/graphql/resolvers/index.ts
import { ShopModel } from '../../../../models/Shop/ShopModel';
import { UsageModel } from '../../../../models/Usage/UsageModel';
import { ErrorLogModel } from '../../../../models/ErrorLog/ErrorLogModel';

export const resolvers = {
  Query: {
    // Shop related queries
    getShopMetrics: async (_, __, { session }) => {
      const shop = await ShopModel.findOne({ shop: session.shop });
      const usage = await UsageModel.find({ shop: session.shop })
        .sort({ timestamp: -1 })
        .limit(30);
      return {
        shop,
        usage
      };
    },

    // Discount related queries
    getDiscounts: async (_, { status, dateRange }, { session }) => {
      const query = `
        query getDiscounts($status: String, $dateRange: DateRangeInput) {
          discounts(first: 50, query: $status) {
            edges {
              node {
                id
                codeDiscount {
                  codes(first: 1) {
                    edges {
                      node {
                        code
                      }
                    }
                  }
                }
                startsAt
                endsAt
                status
                usageLimit
                totalUsageCount
              }
            }
          }
        }
      `;
      
      // Actual GraphQL query will be handled by the proxy
      return { query, variables: { status, dateRange } };
    },

    // Error logs queries
    getErrorLogs: async (_, { limit = 50 }, { session }) => {
      return await ErrorLogModel.find({ shop: session.shop })
        .sort({ timestamp: -1 })
        .limit(limit);
    }
  },

  Mutation: {
    // Shop related mutations
    updateShopSettings: async (_, { settings }, { session }) => {
      const shop = await ShopModel.findOneAndUpdate(
        { shop: session.shop },
        { $set: settings },
        { new: true }
      );
      return shop;
    },

    // Discount related mutations
    createDiscount: async (_, { discountInput }, { session }) => {
      const mutation = `
        mutation discountCreate($discount: DiscountInput!) {
          discountCreate(discount: $discount) {
            discount {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `;
      
      return { query: mutation, variables: { discount: discountInput } };
    },

    // Support related mutations
    createSupportTicket: async (_, { ticket }, { session }) => {
      const shop = await ShopModel.findOne({ shop: session.shop });
      // Implementation for creating support ticket
      return { success: true, ticketId: 'generated-id' };
    }
  }
};
