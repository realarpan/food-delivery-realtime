# Food Delivery Real-time Platform

![GitHub stars](https://img.shields.io/github/stars/realarpan/food-delivery-realtime?style=social)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-green.svg)
![Socket.io](https://img.shields.io/badge/Socket.io-red.svg)
![Stripe](https://img.shields.io/badge/Stripe-blue.svg)

Real-time food delivery platform with Socket.io live tracking, Stripe payments, MongoDB, and biometric MFA authentication using face-api.js. Features order tracking, restaurant management, and comprehensive metrics dashboard.

## Features

### Core Features
- 🚚 Real-time order tracking with Socket.io
- 💳 Stripe payment integration
- 👤 Multi-factor authentication (TOTP + Biometric)
- 🤖 Face recognition authentication using face-api.js
- 📊 Comprehensive metrics tracking and analytics
- 🍴 Restaurant and menu management
- 📦 Order management system
- 🗺️ Live delivery tracking map
- 📱 Responsive mobile-first design

### Security
- ✅ JWT-based authentication
- 🤝 Biometric face recognition
- ✅ TOTP (Time-based One-Time Password)
- 🔒 Encrypted password storage (bcrypt)
- 🛡️ Role-based access control

### Technical Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Authentication**: JWT, TOTP, face-api.js
- **Deployment**: Docker, Vercel
- **Real-time**: Socket.io for live updates
- **DevOps**: GitHub Actions, Docker Compose

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Stripe API keys
- Redis (for session management)

### Installation

```bash
# Clone the repository
git clone https://github.com/realarpan/food-delivery-realtime.git
cd food-delivery-realtime

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 🌐 File Structure

```
food-delivery-realtime/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── mfa/
│   │   │   └── face/
│   │   └── dashboard/
│   └── api/
│       ├── auth/
│       ├── restaurants/
│       ├── menu/
│       ├── cart/
│       ├── orders/
│       ├── stripe/
│       └── metrics/
├── components/
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── RestaurantList.tsx
│   ├── MenuItemCard.tsx
│   ├── CartDrawer.tsx
│   ├── OrderStatusTimeline.tsx
│   ├── MapTracker.tsx
│   ├── FaceScanner.tsx
│   ├── MFAModal.tsx
│   └── MetricsCards.tsx
├── lib/
│   ├── db.ts
│   ├── models/
│   ├── auth.ts
│   ├── stripe.ts
│   ├── socket.ts
│   ├── socket-server.ts
│   ├── metrics.ts
│   └── face.ts
├── public/
│   ├── models/
│   └── logo.png
├── docker/
│   ├── Dockerfile.web
│   └── docker-compose.yml
├── .env.example
├── next.config.mjs
├── package.json
├── tsconfig.json
└── vercel.json
```

## 🔠 Key Features Details

### Real-time Tracking
- Live order status updates via Socket.io
- Real-time delivery location tracking
- Push notifications for order updates
- Driver location updates every 5 seconds

### Payment System
- Stripe Checkout integration
- Secure payment processing
- Payment confirmation webhooks
- Refund management
- Payment history tracking

### Authentication
- Email/password login
- TOTP (Google Authenticator)
- Face recognition using face-api.js
- Backup recovery codes
- Session management with JWT

### Metrics Dashboard
- Real-time order tracking
- Revenue analytics
- User engagement metrics
- Delivery performance
- Restaurant popularity
- Custom reporting

## 🛠️ Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/food_delivery
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_jwt_secret_key_here
TOTP_SECRET=your_totp_secret_key_here

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Socket.io
SOCKET_IO_CORS_ORIGIN=http://localhost:3000

# Face Recognition
FACE_API_MODELS_PATH=./public/models

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3000
NODE_ENV=development
```

## 📋 API Endpoints

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/mfa-verify` - TOTP verification
- `POST /api/auth/face-verify` - Face recognition verification

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order by ID
- `PUT /api/orders/[id]` - Update order status

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/menu/[restaurantId]` - Get restaurant menu

### Stripe
- `POST /api/stripe/create-checkout-session` - Create checkout session
- `POST /api/stripe/webhook` - Stripe webhook handler

### Metrics
- `GET /api/metrics` - Get platform metrics
- `POST /api/metrics` - Track custom event

## 🚀 Development

### Running Tests
```bash
npm test
npm run test:unit
npm run test:e2e
```

### Building
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Docker
```bash
# Build Docker image
docker-compose build

# Run containers
docker-compose up -d

# Stop containers
docker-compose down
```

## 📦 Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Docker
```bash
# Build production image
docker build -t food-delivery-realtime:latest -f docker/Dockerfile.web .

# Run container
docker run -p 3000:3000 -e "MONGODB_URI=mongodb://..." food-delivery-realtime:latest
```

## 📊 Metrics Tracking

### Built-in Metrics
- Order count and revenue
- User registration and login events
- Payment success/failure rates
- Delivery time analytics
- Restaurant performance
- Error tracking

### Custom Metrics
```typescript
import { trackMetric } from '@/lib/metrics';

// Track custom event
trackMetric('user_login', {
  userId: user.id,
  method: 'email',
  timestamp: new Date().toISOString()
});

// Track errors
trackMetric('api_error', {
  endpoint: '/api/orders',
  error: error.message,
  timestamp: new Date().toISOString()
});
```

### Metrics Dashboard
Access metrics dashboard at `/dashboard/metrics` to view:
- Real-time order flow
- Revenue trends
- User engagement
- System health
- Performance metrics

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚫 Security

If you discover any security vulnerabilities, please report them responsibly by:
- Creating an issue with detailed description
- Contacting maintainers directly if sensitive
- Do not disclose vulnerabilities publicly

## 💻 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**realarpan** - Full-stack developer specializing in real-time applications

## 📞 Support

If you find this project helpful, consider giving it a star! 👍

For questions or suggestions, please open an issue or contact me.

## 📊 Roadmap

- [ ] Admin panel for restaurant management
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Driver app
- [ ] Order scheduling
- [ ] Loyalty program
- [ ] Referral system

## 💡 Acknowledgments

- Next.js for the excellent framework
- Socket.io for real-time communication
- Stripe for payment processing
- face-api.js for face recognition
- MongoDB for database
- All contributors and supporters

---

**Built with ❤️ by realarpan**

## Performance Optimizations

- Implemented query caching for frequently accessed data
- Added database indexing on critical fields
- Optimized Socket.io event handling for reduced latency
- Implemented Redis caching for session management

*"Delivering food, not just orders"*
