import { create } from 'zustand'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

export const useSocketStore = create((set, get) => ({
  // State
  socket: null,
  isConnected: false,
  connectionError: null,
  notifications: [],
  unreadCount: 0,

  // Actions
  connect: () => {
    const { socket: existingSocket } = get()
    
    // Don't create multiple connections
    if (existingSocket?.connected) {
      return
    }

    try {
      const socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })

      // Connection events
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id)
        set({ 
          socket, 
          isConnected: true, 
          connectionError: null 
        })
        
        // Join user-specific room if authenticated
        const authStore = JSON.parse(localStorage.getItem('saleshostel-auth') || '{}')
        if (authStore.state?.user) {
          const { user } = authStore.state
          socket.emit('join-role-room', user.role)
          socket.emit('join-user-room', user._id)
        }
      })

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason)
        set({ isConnected: false })
        
        if (reason === 'io server disconnect') {
          // Server disconnected, try to reconnect
          socket.connect()
        }
      })

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        set({ 
          connectionError: error.message,
          isConnected: false 
        })
      })

      // Business event listeners
      socket.on('order-updated', (data) => {
        const { addNotification } = get()
        addNotification({
          type: 'order',
          title: 'Order Updated',
          message: `Order #${data.orderNumber} status changed to ${data.status}`,
          data: data,
          timestamp: new Date().toISOString()
        })
        
        toast.success(`Order #${data.orderNumber} ${data.status}`)
      })

      socket.on('order-status-changed', (data) => {
        const { addNotification } = get()
        addNotification({
          type: 'order',
          title: 'Order Status Update',
          message: `Your order #${data.orderNumber} is now ${data.status}`,
          data: data,
          timestamp: new Date().toISOString()
        })
        
        // Show different toast based on status
        const statusMessages = {
          confirmed: 'Order confirmed! We\'re preparing your items.',
          preparing: 'Your order is being prepared.',
          ready: 'Your order is ready for pickup!',
          'out-for-delivery': 'Your order is on the way!',
          delivered: 'Order delivered successfully!',
          cancelled: 'Your order has been cancelled.'
        }
        
        const message = statusMessages[data.status] || `Order ${data.status}`
        const toastType = data.status === 'cancelled' ? 'error' : 'success'
        
        toast[toastType](message)
      })

      socket.on('inventory-updated', (data) => {
        // Handle inventory updates
        console.log('Inventory updated:', data)
      })

      socket.on('low-stock-alert', (data) => {
        const { addNotification } = get()
        addNotification({
          type: 'inventory',
          title: 'Low Stock Alert',
          message: `${data.productName} (${data.packageType}) is running low: ${data.currentStock} left`,
          data: data,
          timestamp: new Date().toISOString()
        })
        
        toast.error(`Low stock: ${data.productName}`)
      })

      socket.on('new-supply-received', (data) => {
        const { addNotification } = get()
        addNotification({
          type: 'supply',
          title: 'New Supply Received',
          message: `Supply from ${data.supplierName} has been received`,
          data: data,
          timestamp: new Date().toISOString()
        })
        
        toast.success('New supply received')
      })

      // Custom notification event
      socket.on('notification', (notification) => {
        const { addNotification } = get()
        addNotification(notification)
        
        // Show toast based on notification type
        const toastType = notification.type === 'error' ? 'error' : 
                         notification.type === 'warning' ? 'error' : 'success'
        toast[toastType](notification.message)
      })

      set({ socket })
    } catch (error) {
      console.error('Failed to create socket connection:', error)
      set({ connectionError: error.message })
    }
  },

  disconnect: () => {
    const { socket } = get()
    if (socket) {
      socket.disconnect()
      set({ 
        socket: null, 
        isConnected: false, 
        connectionError: null 
      })
    }
  },

  // Emit events
  emitOrderUpdate: (orderData) => {
    const { socket } = get()
    if (socket?.connected) {
      socket.emit('order-update', orderData)
    }
  },

  emitInventoryUpdate: (inventoryData) => {
    const { socket } = get()
    if (socket?.connected) {
      socket.emit('inventory-update', inventoryData)
    }
  },

  emitLowStockAlert: (alertData) => {
    const { socket } = get()
    if (socket?.connected) {
      socket.emit('low-stock-alert', alertData)
    }
  },

  emitNewSupply: (supplyData) => {
    const { socket } = get()
    if (socket?.connected) {
      socket.emit('new-supply', supplyData)
    }
  },

  // Notification management
  addNotification: (notification) => {
    const { notifications } = get()
    const newNotification = {
      id: Date.now() + Math.random(),
      read: false,
      ...notification
    }
    
    set({ 
      notifications: [newNotification, ...notifications].slice(0, 50), // Keep only last 50
      unreadCount: get().unreadCount + 1
    })
  },

  markNotificationAsRead: (notificationId) => {
    const { notifications } = get()
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    )
    
    const unreadCount = updatedNotifications.filter(n => !n.read).length
    
    set({ 
      notifications: updatedNotifications,
      unreadCount
    })
  },

  markAllNotificationsAsRead: () => {
    const { notifications } = get()
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }))
    
    set({ 
      notifications: updatedNotifications,
      unreadCount: 0
    })
  },

  removeNotification: (notificationId) => {
    const { notifications } = get()
    const updatedNotifications = notifications.filter(n => n.id !== notificationId)
    const unreadCount = updatedNotifications.filter(n => !n.read).length
    
    set({ 
      notifications: updatedNotifications,
      unreadCount
    })
  },

  clearAllNotifications: () => {
    set({ 
      notifications: [],
      unreadCount: 0
    })
  },

  // Utility functions
  getUnreadNotifications: () => {
    const { notifications } = get()
    return notifications.filter(n => !n.read)
  },

  getNotificationsByType: (type) => {
    const { notifications } = get()
    return notifications.filter(n => n.type === type)
  },

  // Connection status helpers
  isSocketConnected: () => {
    const { socket, isConnected } = get()
    return socket?.connected && isConnected
  },

  reconnect: () => {
    const { disconnect, connect } = get()
    disconnect()
    setTimeout(connect, 1000)
  }
}))

// Auto-connect when store is created (if user is authenticated)
if (typeof window !== 'undefined') {
  const authStore = JSON.parse(localStorage.getItem('saleshostel-auth') || '{}')
  if (authStore.state?.isAuthenticated) {
    useSocketStore.getState().connect()
  }
}