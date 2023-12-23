import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      <h2>Number of Christmas Messages: {messages.length}</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.listenerName}</strong> from {message.listenerLocation}: {message.holidayMessage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;

