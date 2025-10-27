
import React, { useState, useCallback } from 'react';
import Card from './common/Card';
import { generateLearningPath } from '../services/geminiService';
import type { LearningStep } from '../types';

const Dashboard: React.FC = () => {
  const [goal, setGoal] = useState<string>('');
  const [learningPath, setLearningPath] = useState<LearningStep[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePath = useCallback(async () => {
    if (!goal.trim()) {
      setError('Please enter a learning goal.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setLearningPath(null);

    try {
      const path = await generateLearningPath(goal);
      setLearningPath(path);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [goal]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">Welcome back, ADMIN! Let's get learning.</p>
      </div>

      <Card className="bg-primary text-white">
        <h2 className="text-2xl font-bold mb-4">Personalized Learning Path</h2>
        <p className="mb-4 opacity-90">
          Enter your learning goal, and our AI will create a customized step-by-step guide for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Learn TypeScript for web development"
            className="flex-grow p-3 rounded-md text-text-primary focus:ring-2 focus:ring-white focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleGeneratePath}
            disabled={isLoading}
            className="bg-white text-primary font-bold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Path'}
          </button>
        </div>
      </Card>

      {error && (
        <Card className="bg-red-50 border border-red-200">
          <p className="text-red-700 font-semibold text-center">{error}</p>
        </Card>
      )}

      {learningPath && (
        <Card>
          <h3 className="text-xl font-bold mb-4">Your Path to Master "{goal}"</h3>
          <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-6">
            {learningPath.map((step) => (
              <li key={step.step} className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <span className="font-bold text-primary">{step.step}</span>
                </span>
                <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  Recommended Resource:
                </p>
                <a href={step.resource} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700">
                  Learn more
                </a>
              </li>
            ))}
          </ol>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <h3 className="font-bold text-lg mb-2">Upcoming Sessions</h3>
            <p className="text-text-secondary">Maths with Mrs. Banerjee - Tomorrow at 4 PM</p>
        </Card>
        <Card>
            <h3 className="font-bold text-lg mb-2">Recent Activity</h3>
            <p className="text-text-secondary">Completed 'Intro to Python' course.</p>
        </Card>
        <Card>
            <h3 className="font-bold text-lg mb-2">Skills to Practice</h3>
            <p className="text-text-secondary">Data Structures in JavaScript</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;