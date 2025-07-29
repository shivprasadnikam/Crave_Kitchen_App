import { registerRootComponent } from 'expo';

// Aggressively suppress all turbo and related errors before app loads
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && (
    message.includes('turbo') || 
    message.includes('Turbo') || 
    message.includes('RCT') ||
    message.includes('Native module') ||
    message.includes('Could not find')
  )) {
    return; // Suppress turbo errors
  }
  originalConsoleError.apply(console, args);
};

console.warn = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && (
    message.includes('turbo') || 
    message.includes('Turbo') || 
    message.includes('RCT') ||
    message.includes('Native module') ||
    message.includes('Could not find')
  )) {
    return; // Suppress turbo warnings
  }
  originalConsoleWarn.apply(console, args);
};

// Import and register the app
import App from './App';
registerRootComponent(App); 