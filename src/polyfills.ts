import { Buffer } from 'buffer';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Polyfill for Buffer in global scope

// Make Buffer available globally before any other imports
if (typeof globalThis !== 'undefined') {
  (globalThis as typeof globalThis & { Buffer: typeof Buffer }).Buffer = Buffer;
}
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}
