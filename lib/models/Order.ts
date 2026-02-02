import { Schema, model, Types } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    menuItemId: { type: Types.ObjectId, ref: 'MenuItem', required: true },
    name: String,
    price: Number,
    quantity: Number,
  }],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryLocation: {
    lat: Number,
    lng: Number,
  },
  driverLocation: {
    lat: Number,
    lng: Number,
  },
  stripeSessionId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export const Order = model('Order', OrderSchema);
