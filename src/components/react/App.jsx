import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    listenerName: '',
    listenerLocation: '',
    holidayMessage: '',
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleFormSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/messages', formData);
      setFormData({
        listenerName: '',
        listenerLocation: '',
        holidayMessage: '',
      });
      // Fetch messages again after submission if needed
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  return (
    <div>
      <h1>Christmas Card App</h1>
      <MessageForm
        formData={formData}
        setFormData={setFormData}
        onMessageSubmit={handleFormSubmit} 
      />
      <MessageList messages={messages} />
    </div>
  );
};

export default App;

