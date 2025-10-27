
import React, { useState } from 'react';
import Card from './common/Card';
import Modal from './common/Modal';
import type { User, Project } from '../types';

const mockUser: User = {
  name: 'ADMIN',
  avatarUrl: 'https://picsum.photos/seed/user1/200/200',
  email: 'admin@educonnect.com',
  level: 'Administrator'
};

const initialProjects: Project[] = [
  { id: 1, title: 'AI-Powered Chatbot', description: 'A customer service chatbot built with Python and TensorFlow.', imageUrl: 'https://picsum.photos/seed/project1/400/300', tags: ['Python', 'AI', 'TensorFlow'] },
  { id: 2, title: 'React Dashboard App', description: 'A data visualization dashboard for tracking user metrics.', imageUrl: 'https://picsum.photos/seed/project2/400/300', tags: ['React', 'TypeScript', 'D3.js'] },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <Card className="flex flex-col">
        <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded-t-lg" />
        <div className="p-4">
            <h4 className="text-lg font-bold">{project.title}</h4>
            <p className="text-text-secondary text-sm my-2 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </div>
    </Card>
);

const ProfileHub: React.FC = () => {
    const [projects, setProjects] = useState(initialProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '', tags: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title.trim() || !newProject.description.trim()) return;
        const projectToAdd: Project = {
            id: Date.now(),
            ...newProject,
            imageUrl: newProject.imageUrl || `https://picsum.photos/seed/project${Date.now()}/400/300`,
            tags: newProject.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        };
        setProjects(prev => [projectToAdd, ...prev]);
        setIsModalOpen(false);
        setNewProject({ title: '', description: '', imageUrl: '', tags: '' });
    };
    
    const isFormInvalid = !newProject.title.trim() || !newProject.description.trim();

  return (
    <div className="space-y-8">
        <Card className="!p-0">
            <div className="h-32 bg-primary rounded-t-xl"></div>
            <div className="p-6">
                <div className="flex items-end -mt-20">
                    <img src={mockUser.avatarUrl} alt={mockUser.name} className="w-32 h-32 rounded-full border-4 border-white" />
                    <div className="ml-4">
                        <h1 className="text-3xl font-bold text-text-primary">{mockUser.name}</h1>
                        <p className="text-text-secondary">{mockUser.level}</p>
                    </div>
                </div>
            </div>
        </Card>
        
        <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Projects & Innovations</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-secondary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Add New Project
                </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add a New Project">
            <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-text-primary">Project Title</label>
                    <input type="text" name="title" id="title" value={newProject.title} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-primary">Description</label>
                    <textarea name="description" id="description" value={newProject.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-text-primary">Image URL (Optional)</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={newProject.imageUrl} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" placeholder="A placeholder image will be used if empty" />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-text-primary">Tags (comma-separated)</label>
                    <input type="text" name="tags" id="tags" value={newProject.tags} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., React, AI, TypeScript" />
                </div>
                <div className="text-right">
                    <button 
                        type="submit" 
                        disabled={isFormInvalid}
                        className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Add Project
                    </button>
                </div>
            </form>
        </Modal>
    </div>
  );
};

export default ProfileHub;