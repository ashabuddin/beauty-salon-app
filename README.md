# Beauty Salon App
## Project Structure

```
beauty-salon-app/
│
├── .env
├── package.json
├── server.js
├── config/
│   └── db.js
│   └── logger.js
│   └── multer.js
│   └── redis.js
├── controllers/
│   └── auth.js
│   └── customer.js
│   └── owner.js
│   └── admin.js
│   └── notification.js
│   └── billing.js
│   └── photo.js
│   └── revenue.js
│   └── analytics.js
├── middleware/
│   └── auth.js
├── models/
│   └── User.js
│   └── Service.js
│   └── Booking.js
│   └── Salon.js
│   └── Billing.js
│   └── Photo.js
│   └── Revenue.js
├── routes/
│   └── auth.js
│   └── customer.js
│   └── index.js
│   └── owner.js
│   └── admin.js
│   └── notification.js
│   └── billing.js
│   └── photo.js
│   └── revenue.js
│   └── analytics.js
└── utils/
    └── payment.js
    └── sms.js
    └── cloudinary.js
    └── rateLimit.js
    └── hashPass.js
```
