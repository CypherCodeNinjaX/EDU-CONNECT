
import React from 'react';
import Card from './common/Card';

const Rewards: React.FC = () => {
  const achievements = [
    { title: 'Course Completer', description: 'Finish your first course', unlocked: true },
    { title: 'Top Learner', description: 'Be in the top 10% for a month', unlocked: true },
    { title: 'Skill Sharer', description: 'Offer a skill in the marketplace', unlocked: false },
    { title: 'Collaborator', description: 'Complete a project with a peer', unlocked: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Rewards & Financial Aid</h1>
        <p className="text-text-secondary mt-1">Track your progress and explore support options.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-primary text-white text-center">
          <p className="text-lg opacity-90">Your Edu-Coins Balance</p>
          <p className="text-5xl font-bold my-2">1,250</p>
          <button className="mt-4 bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
            Redeem Rewards
          </button>
        </Card>
        <Card className="bg-secondary text-white text-center">
          <p className="text-lg opacity-90">Loan Assistance</p>
          <p className="text-xl font-semibold my-2">Financial support for your educational journey.</p>
          <button className="mt-4 bg-white text-secondary font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
            Learn More
          </button>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((ach, index) => (
            <div key={index} className={`p-4 border rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg ${ach.unlocked ? 'border-secondary' : 'border-gray-300'}`}>
              <div className={`text-4xl mb-2 ${ach.unlocked ? 'text-secondary' : 'text-gray-400'}`}>
                {ach.unlocked ? '🏆' : '🔒'}
              </div>
              <p className={`font-bold ${ach.unlocked ? 'text-text-primary' : 'text-gray-500'}`}>{ach.title}</p>
              <p className="text-xs text-text-secondary">{ach.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Rewards;