/*
 * Service for connecting to WebSocket to receive real-time message notifications
 * This is a simplified WebSocket service focused on message notifications only
 */

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Singleton WebSocket client instance
let stompClient = null;

/**
 * Connect to the message notification WebSocket
 * @param {number|string} userId - The ID of the user to receive notifications for
 * @param {Function} onMessageCallback - Function to call when a message notification is received
 */
export const connectToMessageSocket = (userId, onMessageCallback) => {
  if (stompClient && stompClient.active) {
    console.log('Message WebSocket already connected');
    return;
  }
  
  console.log('Connecting to message WebSocket for userId:', userId);
  
  // Create STOMP client
  stompClient = new Client({
    // Create WebSocket connection using SockJS
    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    
    // Reconnection settings
    reconnectDelay: 5000,
    
    // Heartbeat settings to keep connection alive
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    
    // Connection established handler
    onConnect: (frame) => {
      console.log('STOMP message connected:', frame);
      
      // Subscribe to personal message notifications channel
      stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
        console.log('Received message notification:', message);
        try {
          // Parse and forward message data to callback
          const messageData = JSON.parse(message.body);
          onMessageCallback(messageData);
        } catch (e) {
          console.error('Error parsing message:', e);
        }
      });
    },
    
    // Error handlers
    onStompError: (frame) => {
      console.error('STOMP message error:', frame);
    },
    
    onWebSocketClose: (event) => {
      console.log('WebSocket message closed:', event);
    },
    
    onWebSocketError: (event) => {
      console.error('WebSocket message error:', event);
    }
  });

  // Activate the connection
  stompClient.activate();
};

/**
 * Disconnect from the message notification WebSocket
 * Should be called when component unmounts or user logs out
 */
export const disconnectFromMessageSocket = () => {
  if (stompClient && stompClient.active) {
    console.log('Disconnecting from message WebSocket');
    stompClient.deactivate();
    stompClient = null;
  }
};