import { Buffer } from 'buffer';

// Make Buffer available globally before any other imports
if (typeof globalThis !== 'undefined') {
  (globalThis as any).Buffer = Buffer;
}
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}
