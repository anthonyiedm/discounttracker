# Component and Model Relationships

## Frontend Components

### Core Components
```typescript
src/components/
├── DiscountTracker/
│   ├── index.tsx              // Main discount tracking interface
│   ├── DataTable.tsx          // Discount data display
│   └── FilterBar.tsx          // Date and filter controls
│
├── AdminDashboard/
│   ├── index.tsx              // Main admin interface
│   ├── MetricsCard.tsx        // Usage metrics display
│   └── ErrorLogs.tsx          // Error log display
│
├── ReviewBanner/
│   ├── index.tsx              // Review request banner
│   └── RatingStars.tsx        // Star rating component
│
└── SupportPage/
    ├── index.tsx              // Support interface
    ├── FAQSection.tsx         // FAQ display
    └── ContactForm.tsx        // Support contact form
```

### UI Components
```typescript
src/components/ui/
├── Button/
│   ├── index.tsx              // Base button component
│   └── types.ts               // Button type definitions
│
├── Card/
│   ├── index.tsx              // Card container component
│   └── types.ts               // Card type definitions
│
├── Alert/
│   ├── index.tsx              // Alert/notification component
│   └── types.ts               // Alert type definitions
│
└── DataDisplay/
    ├── Table.tsx              // Table component
    └── Pagination.tsx         // Pagination controls
```

## Backend Models

### Database Models
```typescript
src/models/
├── Shop/
│   ├── ShopModel.ts           // Shop data model
│   └── ShopTypes.ts           // Shop type definitions
│
├── Usage/
│   ├── UsageModel.ts          // Usage tracking model
│   └── UsageTypes.ts          // Usage type definitions
│
├── ErrorLog/
│   ├── ErrorLogModel.ts       // Error logging model
│   └── ErrorLogTypes.ts       // Error log type definitions
│
└── Session/
    ├── SessionModel.ts        // Session management model
    └── SessionTypes.ts        // Session type definitions
```

### API Routes
```typescript
src/pages/api/
├── auth/
│   ├── [...auth].ts           // Auth endpoints
│   └── token.ts               // Token management
│
├── webhooks/
│   ├── [topic].ts             // Webhook handlers
│   └── register.ts            // Webhook registration
│
└── graphql/
    ├── proxy.ts               // GraphQL proxy
    └── resolvers/             // GraphQL resolvers
```

## Component-Model Relationships

### DiscountTracker Component Dependencies
```typescript
DiscountTracker/index.tsx
├── Models Required:
│   ├── UsageModel            // For tracking usage
│   └── ShopModel             // For shop data
│
└── API Endpoints Used:
    ├── /api/graphql/proxy    // For discount data
    └── /api/webhooks         // For real-time updates
```

### AdminDashboard Component Dependencies
```typescript
AdminDashboard/index.tsx
├── Models Required:
│   ├── ErrorLogModel         // For error logs
│   ├── UsageModel           // For usage metrics
│   └── ShopModel            // For shop details
│
└── API Endpoints Used:
    ├── /api/graphql/proxy   // For metrics data
    └── /api/webhooks        // For real-time updates
```

### ReviewBanner Component Dependencies
```typescript
ReviewBanner/index.tsx
├── Models Required:
│   └── ShopModel            // For shop review status
│
└── API Endpoints Used:
    └── /api/graphql/proxy   // For review submission
```

### SupportPage Component Dependencies
```typescript
SupportPage/index.tsx
├── Models Required:
│   ├── ShopModel           // For shop details
│   └── ErrorLogModel       // For support tickets
│
└── API Endpoints Used:
    └── /api/graphql/proxy  // For support requests
```