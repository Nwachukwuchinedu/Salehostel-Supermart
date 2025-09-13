import { useState, useEffect, useRef } from 'react';

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const connect = () => {
      try {
        // In a real implementation, you would use a library like socket.io-client
        // For this example, we'll simulate a WebSocket connection
        const ws = new WebSocket(url);
        
        ws.onopen = () => {
          setSocket(ws);
          setConnected(true);
          setError(null);
          console.log('WebSocket connected');
        };

        ws.onclose = () => {
          setConnected(false);
          console.log('WebSocket disconnected');
          // Attempt to reconnect after 3 seconds
          reconnectTimeoutRef.current = setTimeout(connect, 3000);
        };

        ws.onerror = (err) => {
          setError(err);
          console.error('WebSocket error:', err);
        };

        // Clean up any existing reconnect timeout
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      } catch (err) {
        setError(err);
        console.error('Failed to create WebSocket connection:', err);
      }
    };

    connect();

    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socket && connected) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  };

  return { socket, connected, error, sendMessage };
};

export default useSocket;