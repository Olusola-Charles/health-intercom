import React, { useState } from 'react';
import { Send, Search, Plus, Phone, Video, Paperclip, MoreVertical, Clock, Check, CheckCheck, Star, Archive, User, Users, Filter } from 'lucide-react';

const HealthcareMessages = ({ userRole = 'doctor', currentUser = { name: 'Dr. Sarah Smith', id: 'dr_001' } }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, starred, archived

  // Mock conversations data
  const [conversations] = useState([
    {
      id: 1,
      participant: userRole === 'doctor' ? 'John Doe (Patient)' : 'Dr. Sarah Smith',
      participantRole: userRole === 'doctor' ? 'patient' : 'doctor',
      lastMessage: 'Thank you for the prescription. When should I schedule my next appointment?',
      timestamp: '2 min ago',
      unread: true,
      starred: false,
      status: 'online',
      avatar: 'JD',
      messages: [
        {
          id: 1,
          sender: userRole === 'doctor' ? 'patient' : 'doctor',
          text: 'Hi Doctor, I wanted to follow up on my blood pressure medication.',
          timestamp: '10:30 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: userRole === 'doctor' ? 'doctor' : 'patient',
          text: 'Hello John! How are you feeling with the current dosage? Any side effects?',
          timestamp: '10:32 AM',
          status: 'read'
        },
        {
          id: 3,
          sender: userRole === 'doctor' ? 'patient' : 'doctor',
          text: 'I feel much better, no side effects. My readings have been consistently good.',
          timestamp: '10:35 AM',
          status: 'read'
        },
        {
          id: 4,
          sender: userRole === 'doctor' ? 'doctor' : 'patient',
          text: 'That\'s great news! I\'ll send you a prescription refill. Continue with the same dosage.',
          timestamp: '10:37 AM',
          status: 'read'
        },
        {
          id: 5,
          sender: userRole === 'doctor' ? 'patient' : 'doctor',
          text: 'Thank you for the prescription. When should I schedule my next appointment?',
          timestamp: '10:40 AM',
          status: 'delivered'
        }
      ]
    },
    {
      id: 2,
      participant: userRole === 'doctor' ? 'Emily Davis (Patient)' : 'Dr. Michael Johnson',
      participantRole: userRole === 'doctor' ? 'patient' : 'doctor',
      lastMessage: 'Your test results are ready for review.',
      timestamp: '1 hour ago',
      unread: false,
      starred: true,
      status: 'away',
      avatar: 'ED',
      messages: [
        {
          id: 1,
          sender: userRole === 'doctor' ? 'doctor' : 'patient',
          text: 'Your test results are ready for review.',
          timestamp: '9:15 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: userRole === 'doctor' ? 'patient' : 'doctor',
          text: 'Thank you! Are they normal?',
          timestamp: '9:20 AM',
          status: 'read'
        }
      ]
    },
    {
      id: 3,
      participant: userRole === 'doctor' ? 'Michael Chen (Patient)' : 'Dr. Amanda Wilson',
      participantRole: userRole === 'doctor' ? 'patient' : 'doctor',
      lastMessage: 'Appointment confirmed for tomorrow at 2:30 PM',
      timestamp: 'Yesterday',
      unread: false,
      starred: false,
      status: 'offline',
      avatar: 'MC',
      messages: [
        {
          id: 1,
          sender: userRole === 'doctor' ? 'patient' : 'doctor',
          text: 'Could we reschedule my appointment for tomorrow?',
          timestamp: 'Yesterday 3:45 PM',
          status: 'read'
        },
        {
          id: 2,
          sender: userRole === 'doctor' ? 'doctor' : 'patient',
          text: 'Of course! I have a slot available at 2:30 PM. Does that work for you?',
          timestamp: 'Yesterday 3:50 PM',
          status: 'read'
        },
        {
          id: 3,
          sender: userRole === 'doctor' ? 'patient' : 'doctor',
          text: 'Perfect! Thank you.',
          timestamp: 'Yesterday 3:52 PM',
          status: 'read'
        },
        {
          id: 4,
          sender: userRole === 'doctor' ? 'doctor' : 'patient',
          text: 'Appointment confirmed for tomorrow at 2:30 PM',
          timestamp: 'Yesterday 3:53 PM',
          status: 'read'
        }
      ]
    }
  ]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && conv.unread) ||
      (filter === 'starred' && conv.starred) ||
      (filter === 'archived' && conv.archived);
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        id: selectedConversation.messages.length + 1,
        sender: userRole,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      
      selectedConversation.messages.push(newMsg);
      setNewMessage('');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return <Check size={14} className="text-gray-400" />;
      case 'delivered': return <CheckCheck size={14} className="text-gray-400" />;
      case 'read': return <CheckCheck size={14} className="text-blue-500" />;
      default: return null;
    }
  };

  const getOnlineStatus = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Conversations List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
            <button
              onClick={() => setShowNewChat(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              <Plus size={20} />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {['all', 'unread', 'starred'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === filterType
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterType === 'all' ? 'All' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getOnlineStatus(conversation.status)} rounded-full border-2 border-white`}></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium truncate ${conversation.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {conversation.participant}
                    </h3>
                    <div className="flex items-center gap-1">
                      {conversation.starred && <Star size={14} className="text-yellow-400 fill-current" />}
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                  </div>
                  <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedConversation.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getOnlineStatus(selectedConversation.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.participant}</h3>
                    <p className="text-sm text-gray-500 capitalize">{selectedConversation.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100">
                    <Phone size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100">
                    <Video size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === userRole ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === userRole
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${
                      message.sender === userRole ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{message.timestamp}</span>
                      {message.sender === userRole && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100">
                  <Paperclip size={20} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>

              {/* Quick Actions for Healthcare */}
              {userRole === 'doctor' && (
                <div className="flex gap-2 mt-3">
                  <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    Send Prescription
                  </button>
                  <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    Schedule Appointment
                  </button>
                  <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    Share Test Results
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Conversation</h3>
              <button
                onClick={() => setShowNewChat(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userRole === 'doctor' ? 'Select Patient' : 'Select Doctor'}
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Choose recipient...</option>
                  {userRole === 'doctor' ? (
                    <>
                      <option value="patient1">John Doe (Patient)</option>
                      <option value="patient2">Emily Davis (Patient)</option>
                      <option value="patient3">Michael Chen (Patient)</option>
                    </>
                  ) : (
                    <>
                      <option value="doctor1">Dr. Sarah Smith (Cardiology)</option>
                      <option value="doctor2">Dr. Michael Johnson (General Practice)</option>
                      <option value="doctor3">Dr. Amanda Wilson (Dermatology)</option>
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Type your message..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewChat(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Send Message
              </button>
              <button
                onClick={() => setShowNewChat(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthcareMessages;