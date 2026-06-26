import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

export async function GET() {
  const result: any = { status: 'running' };

  // 1. Test Firebase
  try {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
    privateKey = privateKey.replace(/\\n/g, '\n');

    if (privateKey && !privateKey.includes('BEGIN PRIVATE KEY')) {
      privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
    }

    result.firebase = {
      hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      hasPrivateKey: !!privateKey,
      privateKeyLength: privateKey.length,
      privateKeyStart: privateKey.substring(0, 30).replace(/\n/g, '\\n'),
      privateKeyEnd: privateKey.substring(privateKey.length - 30).replace(/\n/g, '\\n'),
    };
    
    // Try to init if not already
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
      result.firebase.initialized = true;
    } else {
      result.firebase.alreadyInitialized = true;
    }

  } catch (error: any) {
    result.firebaseError = { message: error.message, stack: error.stack };
  }

  // 2. Test Prisma
  try {
    const userCount = await db.user.count();
    result.prisma = { success: true, userCount };
  } catch (error: any) {
    result.prismaError = { message: error.message, stack: error.stack, name: error.name };
  }

  return NextResponse.json(result);
}
