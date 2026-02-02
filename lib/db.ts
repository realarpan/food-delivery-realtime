import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not set');
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// @ts-expect-error attach to global
let cached: Cached = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  // @ts-expect-error
  global.mongoose = cached;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: 'food_delivery' })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export function disconnectDB() {
  if (cached.conn) {
    cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

export const mongoDB = {
  connect: connectDB,
  disconnect: disconnectDB,
};
