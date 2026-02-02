import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { getAuthFromCookie } from '@/lib/auth';
import { emitOrderUpdate } from '@/lib/socket-server';

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const { restaurantId, items, total, deliveryLocation } = body;

    const order = await Order.create({
      userId: auth.sub,
      restaurantId,
      items,
      total,
      deliveryLocation,
      status: 'pending',
    });

    // Emit to all connected clients
    emitOrderUpdate(order._id.toString(), {
      status: 'pending',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthFromCookie();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const orders = await Order.find({ userId: auth.sub }).populate('restaurantId');
    
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
