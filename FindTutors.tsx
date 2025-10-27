import React, { useState, useEffect, useCallback } from 'react';
import Card from './common/Card';
import Icon from './common/Icon';
import Modal from './common/Modal';
import type { Teacher } from '../types';

const mockTeachers: Teacher[] = [
  { id: 1, name: 'Priya Chatterjee', avatarUrl: 'https://picsum.photos/seed/teacher1/100/100', subjects: ['Physics', 'Bengali'], rating: 4.8, type: 'local', distance: '2.5km', bio: 'Experienced tutor with a passion for STEM and Bengali literature. I believe in making learning interactive and fun, helping students build a strong foundational understanding.', experience: '5+ years of private tutoring', qualifications: ['M.Sc. in Physics', 'Certified Bengali Teacher'], address: '18/A, Gariahat Road, Kolkata', location: { lat: 22.518, lng: 88.366 } },
  { id: 2, name: 'Arjun Banerjee', avatarUrl: 'https://picsum.photos/seed/teacher2/100/100', subjects: ['English Literature', 'History'], rating: 4.9, type: 'online', bio: 'Helping students find their voice in writing and develop critical thinking skills through the lens of history and literature, with a focus on Indian history.', experience: '8 years as a high school teacher', qualifications: ['PhD in English Literature', 'M.A. in History'] },
  { id: 3, name: 'Ananya Roy', avatarUrl: 'https://picsum.photos/seed/teacher3/100/100', subjects: ['Chemistry', 'Biology'], rating: 4.7, type: 'local', distance: '5km', bio: 'Making complex science topics easy to understand through practical examples and lab-based learning approaches.', experience: '3 years as a university teaching assistant', qualifications: ['M.Sc. in Organic Chemistry'], address: 'Sector V, Salt Lake, Kolkata', location: { lat: 22.5744, lng: 88.4358 } },
  { id: 4, name: 'Rohan Dasgupta', avatarUrl: 'https://picsum.photos/seed/teacher4/100/100', subjects: ['Computer Science', 'Mathematics'], rating: 5.0, type: 'online', bio: 'Code mentor for aspiring developers. I focus on project-based learning to build real-world skills in programming and software development.', experience: '10+ years as a Software Engineer', qualifications: ['B.Tech in Computer Science', 'Google Certified Developer'] },
];

const TutorCardSkeleton: React.FC = () => {
    const shimmerClass = "bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]";

    return (
        <Card>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className={`${shimmerClass} w-24 h-24 rounded-full flex-shrink-0`}></div>
                <div className="flex-1 text-center md:text-left w-full space-y-2">
                    <div className={`${shimmerClass} h-6 rounded w-1/2 mx-auto md:mx-0`}></div>
                    <div className={`${shimmerClass} h-4 rounded w-3/4 mx-auto md:mx-0`}></div>
                    <div className={`${shimmerClass} h-5 rounded w-1/3 mx-auto md:mx-0`}></div>
                </div>
                <div className={`${shimmerClass} h-10 rounded-lg w-full md:w-32`}></div>
            </div>
        </Card>
    );
};

const TutorCard: React.FC<{ tutor: Teacher; onChatClick: (tutor: Teacher) => void; }> = ({ tutor, onChatClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img src={tutor.avatarUrl} alt={tutor.name} className="w-24 h-24 rounded-full flex-shrink-0" />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold">{tutor.name}</h3>
          <p className="text-text-secondary">{tutor.subjects.join(', ')}</p>
          <div className="flex items-center justify-center md:justify-start my-2">
            <Icon name="star" className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 font-bold">{tutor.rating}</span>
            {tutor.type === 'local' && tutor.distance && (
              <>
                <span className="mx-2 text-gray-300">|</span>
                <Icon name="location" className="w-5 h-5 text-gray-500" />
                <span className="ml-1 text-text-secondary">{tutor.distance} away</span>
              </>
            )}
          </div>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors w-full md:w-auto"
        >
          {isExpanded ? 'Hide Profile' : 'View Profile'}
        </button>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen mt-6 pt-6 border-t border-gray-200' : 'max-h-0'}`}>
        <div>
          <h4 className="font-bold text-md text-text-primary mb-2">About Me</h4>
          <p className="text-sm text-text-secondary mb-4">{tutor.bio}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
                <h4 className="font-bold text-md text-text-primary mb-2">Experience</h4>
                <p className="text-sm text-text-secondary">{tutor.experience}</p>
            </div>
            <div>
                <h4 className="font-bold text-md text-text-primary mb-2">Qualifications</h4>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                    {tutor.qualifications.map((q, index) => <li key={index}>{q}</li>)}
                </ul>
            </div>
          </div>

          {tutor.type === 'local' && tutor.address && tutor.location && (
            <div className="mt-4">
              <h4 className="font-bold text-md text-text-primary mb-2">Location</h4>
              <p className="text-sm text-text-secondary">{tutor.address}</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${tutor.location.lat},${tutor.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-1"
              >
                View on Google Maps
                <Icon name="external-link" className="w-4 h-4" />
              </a>
            </div>
          )}

          <div className="mt-6 flex justify-end items-center gap-4">
            <button
              onClick={() => onChatClick(tutor)}
              className="flex items-center gap-2 bg-gray-100 text-text-primary font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Icon name="chat" className="w-5 h-5" />
              <span>Chat</span>
            </button>
            <button className="bg-secondary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
              Connect
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const FindTutors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'online'>('local');
  const [tutors, setTutors] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState('Fetching location...');
  const [selectedTutor, setSelectedTutor] = useState<Teacher | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  const fetchLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationStatus('Showing tutors near you.');
        },
        () => {
          setLocationStatus('Location access denied. Showing all local tutors.');
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'local') {
      fetchLocation();
    }
    
    setIsLoading(true);
    setTutors([]); // Clear previous tutors
    const timer = setTimeout(() => {
        setTutors(mockTeachers.filter(t => t.type === activeTab));
        setIsLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [activeTab, fetchLocation]);

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedTutor) return;
    alert(`Message sent to ${selectedTutor.name}!`);
    setSelectedTutor(null);
    setChatMessage('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Find Tutors & Mentors</h1>
        <p className="text-text-secondary mt-1">Connect with the best educators for your needs.</p>
      </div>

      <div className="flex border-b">
        <button
          className={`px-6 py-3 font-semibold ${activeTab === 'local' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
          onClick={() => setActiveTab('local')}
        >
          Local Teachers
        </button>
        <button
          className={`px-6 py-3 font-semibold ${activeTab === 'online' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
          onClick={() => setActiveTab('online')}
        >
          Online Mentors
        </button>
      </div>

      {activeTab === 'local' && (
        <p className="text-sm text-text-secondary flex items-center"><Icon name="location" className="w-4 h-4 mr-2"/>{locationStatus}</p>
      )}

      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => <TutorCardSkeleton key={index} />)
        ) : (
          tutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} onChatClick={setSelectedTutor} />
          ))
        )}
      </div>

      {selectedTutor && (
        <Modal
            isOpen={!!selectedTutor}
            onClose={() => {
              setSelectedTutor(null);
              setChatMessage('');
            }}
            title={`Chat with ${selectedTutor.name}`}
        >
            <p className="text-text-secondary mb-4">
                This is the start of your conversation. Send a message to get started.
            </p>
            <textarea
                className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                rows={4}
                placeholder={`Type your message to ${selectedTutor.name}...`}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
            ></textarea>
            <div className="text-right mt-4">
                <button 
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Send Message
                </button>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default FindTutors;