// Animation utilities and performance optimizations

// CSS transition classes
export const transitions = {
  default: 'transition-all duration-200 ease-in-out',
  slow: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  bounce: 'transition-all duration-300 ease-out',
};

// Animation variants for framer-motion or similar libraries
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideInLeft: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  },
  slideInRight: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
  slideInUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
};

// Performance optimization utilities
export const performance = {
  // Debounce function to limit how often a function can be called
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function to limit how often a function can be called
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Memoization function to cache expensive function calls
  memoize: (fn) => {
    const cache = {};
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache[key]) {
        return cache[key];
      }
      const result = fn(...args);
      cache[key] = result;
      return result;
    };
  },

  // Lazy loading image component configuration
  lazyLoadConfig: {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px',
  },

  // Intersection Observer for lazy loading
  createIntersectionObserver: (callback, options = {}) => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      return new IntersectionObserver(callback, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options,
      });
    }
    return null;
  },
};

// CSS animation keyframes
export const keyframes = {
  pulse: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `,
  spin: `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

// Export utility functions for adding animations
export const addAnimation = (element, animationClass) => {
  if (element && element.classList) {
    element.classList.add(animationClass);
  }
};

export const removeAnimation = (element, animationClass) => {
  if (element && element.classList) {
    element.classList.remove(animationClass);
  }
};

export const toggleAnimation = (element, animationClass) => {
  if (element && element.classList) {
    element.classList.toggle(animationClass);
  }
};

export default {
  transitions,
  animations,
  performance,
  keyframes,
  addAnimation,
  removeAnimation,
  toggleAnimation,
};