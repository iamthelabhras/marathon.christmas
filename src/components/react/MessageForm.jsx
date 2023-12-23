import React from 'react';

const MessageForm = ({ formData, setFormData, onMessageSubmit }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit(); // Call the function provided by App
    // Clear form after submission if needed
    setFormData({
      listenerName: '',
      listenerLocation: '',
      holidayMessage: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Listener Name:
        <input
          type="text"
          name="listenerName"
          value={formData.listenerName}
          onChange={handleChange}
        />
      </label>
      <label>
        Listener Location:
        <input
          type="text"
          name="listenerLocation"
          value={formData.listenerLocation}
          onChange={handleChange}
        />
      </label>
      <label>
        Holiday Message:
        <textarea
          name="holidayMessage"
          value={formData.holidayMessage}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit Message</button>
    </form>
  );
};

export default MessageForm;

