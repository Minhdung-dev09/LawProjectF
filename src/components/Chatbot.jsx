import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/chatServices';
import { FaUser, FaRobot, FaPaperPlane } from 'react-icons/fa';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý AI chuyên về văn bản pháp luật. Tôi có thể giúp gì cho bạn?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputMessage);
      const assistantMessage = {
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] sm:h-[500px] md:h-[600px] bg-gray-50">
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' ? 'bg-gray-500' : 'bg-gray-400'
              }`}
            >
              {message.role === 'user' ? (
                <FaUser className="text-white text-xs sm:text-sm" />
              ) : (
                <FaRobot className="text-white text-xs sm:text-sm" />
              )}
            </div>
            <div
              className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-3 sm:p-4 ${
                message.role === 'user'
                  ? 'bg-gray-500 text-white'
                  : 'bg-white shadow-md text-gray-700'
              }`}
            >
              <p className="text-sm sm:text-base">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-400 flex items-center justify-center">
              <FaRobot className="text-white text-xs sm:text-sm" />
            </div>
            <div className="bg-white shadow-md rounded-2xl p-3 sm:p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2 sm:space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
          >
            <span>Gửi</span>
            <FaPaperPlane className="text-xs sm:text-sm" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;