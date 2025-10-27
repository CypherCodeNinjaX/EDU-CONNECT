
import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import Modal from './common/Modal';
import type { Skill } from '../types';

const mockSkills: Skill[] = [
    { id: 1, title: 'I can teach Python basics', description: '2-hour introductory session to Python for beginners.', type: 'offering', author: 'Aarav Chowdhury', authorAvatar: 'https://picsum.photos/seed/user1/100/100', price: '₹1500' },
    { id: 2, title: 'Need help with essay writing', description: 'Looking for someone to proofread my 1500-word history essay.', type: 'requesting', author: 'Ananya Reddy', authorAvatar: 'https://picsum.photos/seed/user2/100/100', exchange: 'Can teach Spanish' },
    { id: 3, title: 'Graphic Design for Social Media', description: 'I will create 5 social media posts for your project.', type: 'offering', author: 'Vikram Singh', authorAvatar: 'https://picsum.photos/seed/user3/100/100', price: '₹3500' },
    { id: 4, title: 'Looking for a Calculus tutor', description: 'Struggling with derivatives and integrals. Need weekly sessions.', type: 'requesting', author: 'Rohan Mehra', authorAvatar: 'https://picsum.photos/seed/user4/100/100', price: '₹1200/hour' },
];

const SkillCard: React.FC<{ skill: Skill; onContact: (skill: Skill) => void; }> = ({ skill, onContact }) => (
    <Card className="flex flex-col">
        <div className="flex items-center mb-4">
            <img src={skill.authorAvatar} alt={skill.author} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <p className="font-semibold">{skill.author}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${skill.type === 'offering' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                    {skill.type === 'offering' ? 'Offering' : 'Requesting'}
                </span>
            </div>
        </div>
        <h3 className="text-lg font-bold mb-2 flex-grow">{skill.title}</h3>
        <p className="text-text-secondary text-sm mb-4 h-16">{skill.description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t">
            <p className="font-bold text-primary">{skill.price || skill.exchange}</p>
            <button 
                onClick={() => onContact(skill)}
                className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors">
                Contact
            </button>
        </div>
    </Card>
);

const SkillCardSkeleton: React.FC = () => {
    const shimmerClass = "bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]";
    return (
        <Card>
            <div className="flex items-center mb-4">
                <div className={`${shimmerClass} w-12 h-12 rounded-full mr-4`}></div>
                <div className="w-1/2 space-y-2">
                    <div className={`${shimmerClass} h-5 rounded w-full`}></div>
                    <div className={`${shimmerClass} h-4 rounded w-1/3`}></div>
                </div>
            </div>
            <div className={`${shimmerClass} h-6 rounded w-3/4 mb-2`}></div>
            <div className={`${shimmerClass} h-4 rounded w-full mb-1`}></div>
            <div className={`${shimmerClass} h-4 rounded w-full mb-4`}></div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t">
                <div className={`${shimmerClass} h-6 rounded w-1/4`}></div>
                <div className={`${shimmerClass} h-10 rounded-lg w-1/3`}></div>
            </div>
        </Card>
    );
};

const SkillMarketplace: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
      if (!contactMessage.trim() || !selectedSkill) return;
      alert(`Message sent to ${selectedSkill.author} regarding "${selectedSkill.title}"!`);
      setSelectedSkill(null);
      setContactMessage('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Skill Marketplace</h1>
        <p className="text-text-secondary mt-1">Exchange your talents, learn new skills, and earn.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => <SkillCardSkeleton key={index} />)
        ) : (
            mockSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} onContact={setSelectedSkill} />
            ))
        )}
      </div>

      {selectedSkill && (
        <Modal
            isOpen={!!selectedSkill}
            onClose={() => {
              setSelectedSkill(null);
              setContactMessage('');
            }}
            title={`Contact ${selectedSkill.author}`}
        >
            <p className="mb-2"><span className="font-bold">Skill:</span> {selectedSkill.title}</p>
            <p className="text-text-secondary mb-4">{selectedSkill.description}</p>
            <textarea
                className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                rows={4}
                placeholder={`Your message regarding "${selectedSkill.title}"...`}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
            ></textarea>
            <div className="text-right mt-4">
                <button 
                  onClick={handleSendMessage}
                  disabled={!contactMessage.trim()}
                  className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Send
                </button>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default SkillMarketplace;