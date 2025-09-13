import { useCallback, useMemo, useRef } from 'react';

// Performance optimization hook
const usePerformance = () => {
  // Memoize expensive calculations
  const useMemoizedValue = (factory, deps) => {
    return useMemo(factory, deps);
  };

  // Memoize callbacks
  const useMemorizedCallback = (callback, deps) => {
    return useCallback(callback, deps);
  };

  // Use ref to store values that don't need to trigger re-renders
  const useStableValue = (initialValue) => {
    const ref = useRef(initialValue);
    return ref;
  };

  // Throttle function calls
  const useThrottle = (callback, delay) => {
    const lastCall = useRef(0);
    const timeout = useRef(null);

    return useCallback((...args) => {
      const now = Date.now();
      
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        
        timeout.current = setTimeout(() => {
          lastCall.current = Date.now();
          callback(...args);
        }, delay - (now - lastCall.current));
      }
    }, [callback, delay]);
  };

  // Debounce function calls
  const useDebounce = (callback, delay) => {
    const timeout = useRef(null);

    return useCallback((...args) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      
      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }, [callback, delay]);
  };

  // Lazy load components
  const useLazyLoad = (importFunc) => {
    const [component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let isMounted = true;
      
      importFunc()
        .then((module) => {
          if (isMounted) {
            setComponent(module.default || module);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err);
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }, [importFunc]);

    return { component, loading, error };
  };

  return {
    useMemoizedValue,
    useMemorizedCallback,
    useStableValue,
    useThrottle,
    useDebounce,
    useLazyLoad,
  };
};

export default usePerformance;