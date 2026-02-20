// Storage keys
const STORAGE_KEY = 'ideaspark_profile';

// DOM Elements
const userRole = document.getElementById('userRole');
const userKnowledge = document.getElementById('userKnowledge');
const userInterests = document.getElementById('userInterests');
const userContext = document.getElementById('userContext');
const generateBtn = document.getElementById('generateBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const clearProfileBtn = document.getElementById('clearProfile');
const ideasSection = document.getElementById('ideasSection');
const ideasContainer = document.getElementById('ideasContainer');
const emptyState = document.getElementById('emptyState');

// Load saved profile
loadProfile();

// Event Listeners
generateBtn.addEventListener('click', generateIdeas);
regenerateBtn.addEventListener('click', generateIdeas);
clearProfileBtn.addEventListener('click', clearProfile);

// Auto-save profile on input
[userRole, userKnowledge, userInterests, userContext].forEach(input => {
  input.addEventListener('input', saveProfile);
});

function saveProfile() {
  const profile = {
    role: userRole.value,
    knowledge: userKnowledge.value,
    interests: userInterests.value,
    context: userContext.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function loadProfile() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const profile = JSON.parse(saved);
    userRole.value = profile.role || '';
    userKnowledge.value = profile.knowledge || '';
    userInterests.value = profile.interests || '';
    userContext.value = profile.context || '';
  }
}

function clearProfile() {
  if (confirm('Are you sure you want to clear your profile?')) {
    localStorage.removeItem(STORAGE_KEY);
    userRole.value = '';
    userKnowledge.value = '';
    userInterests.value = '';
    userContext.value = '';
    ideasSection.classList.add('hidden');
    emptyState.classList.remove('hidden');
  }
}

function generateIdeas() {
  const role = userRole.value.trim();
  const knowledge = userKnowledge.value.trim();
  const interests = userInterests.value.trim();
  const context = userContext.value.trim();

  // Validation
  if (!role && !knowledge && !interests) {
    alert('Please fill in at least one field to generate personalized ideas.');
    return;
  }

  saveProfile();

  // Parse skills and interests
  const skills = knowledge.split(',').map(s => s.trim()).filter(s => s);
  const likes = interests.split(',').map(s => s.trim()).filter(s => s);

  // Generate ideas
  const ideas = generateContextualIdeas(role, skills, likes, context);

  // Display ideas
  displayIdeas(ideas);
}

function generateContextualIdeas(role, skills, interests, context) {
  const ideas = [];

  // Project Ideas
  if (skills.length > 0 || interests.length > 0) {
    const projectIdeas = generateProjectIdeas(role, skills, interests, context);
    ideas.push(...projectIdeas);
  }

  // Learning Ideas
  if (skills.length > 0 || interests.length > 0) {
    const learningIdeas = generateLearningIdeas(role, skills, interests);
    ideas.push(...learningIdeas);
  }

  // Content Ideas
  if (role || skills.length > 0) {
    const contentIdeas = generateContentIdeas(role, skills, interests);
    ideas.push(...contentIdeas);
  }

  // Business/Side Project Ideas
  if (skills.length > 1 || (skills.length > 0 && interests.length > 0)) {
    const businessIdeas = generateBusinessIdeas(role, skills, interests);
    ideas.push(...businessIdeas);
  }

  // Hobby Fusion Ideas
  if (interests.length > 1) {
    const hobbyIdeas = generateHobbyFusionIdeas(interests, skills);
    ideas.push(...hobbyIdeas);
  }

  return ideas;
}

function generateProjectIdeas(role, skills, interests, context) {
  const ideas = [];
  const combinedSkills = [...skills];
  
  if (skills.length >= 2) {
    const skill1 = skills[0];
    const skill2 = skills[1];
    ideas.push({
      category: 'Project',
      title: `${skill1} + ${skill2} Tool`,
      description: `Build a tool that combines ${skill1.toLowerCase()} and ${skill2.toLowerCase()} to solve a specific problem. ${context ? `Perfect for: ${context}` : ''}`,
      tags: [skill1, skill2, 'Project']
    });
  }

  if (interests.length > 0 && skills.length > 0) {
    const interest = interests[0];
    const skill = skills[0];
    ideas.push({
      category: 'Project',
      title: `${interest} Platform using ${skill}`,
      description: `Create a platform for ${interest.toLowerCase()} enthusiasts using your ${skill.toLowerCase()} skills. Could be a community, tracker, or learning resource.`,
      tags: [interest, skill, 'Project']
    });
  }

  if (role) {
    ideas.push({
      category: 'Project',
      title: `Tool for ${role}s`,
      description: `Build a productivity tool specifically designed for ${role.toLowerCase()}s. Focus on solving a daily pain point you experience.`,
      tags: [role, 'Productivity', 'Project']
    });
  }

  return ideas;
}

function generateLearningIdeas(role, skills, interests) {
  const ideas = [];

  if (skills.length > 0) {
    const skill = skills[Math.floor(Math.random() * skills.length)];
    ideas.push({
      category: 'Learning',
      title: `Advanced ${skill} Techniques`,
      description: `Deep dive into advanced concepts in ${skill.toLowerCase()}. Focus on areas like optimization, best practices, and real-world applications.`,
      tags: [skill, 'Learning', 'Skill Development']
    });
  }

  if (interests.length > 0 && skills.length > 0) {
    const interest = interests[0];
    const skill = skills[0];
    ideas.push({
      category: 'Learning',
      title: `Apply ${skill} to ${interest}`,
      description: `Learn how to use ${skill.toLowerCase()} in the context of ${interest.toLowerCase()}. Explore niche applications and unique use cases.`,
      tags: [skill, interest, 'Learning']
    });
  }

  if (skills.length > 0) {
    ideas.push({
      category: 'Learning',
      title: `Complementary Skill to ${skills[0]}`,
      description: `Learn a skill that complements ${skills[0].toLowerCase()}. This could be a technical skill, design thinking, or domain knowledge.`,
      tags: ['Learning', 'Skill Development']
    });
  }

  return ideas;
}

function generateContentIdeas(role, skills, interests) {
  const ideas = [];

  if (skills.length > 0) {
    const skill = skills[0];
    ideas.push({
      category: 'Content',
      title: `"${skill} for Beginners" Series`,
      description: `Create a beginner-friendly tutorial series teaching ${skill.toLowerCase()}. Share your knowledge through blog posts, videos, or interactive guides.`,
      tags: [skill, 'Content', 'Teaching']
    });
  }

  if (role && skills.length > 0) {
    ideas.push({
      category: 'Content',
      title: `"Day in the Life of a ${role}" Blog`,
      description: `Document your experiences, challenges, and learnings as a ${role.toLowerCase()}. Share insights and tips with others in your field.`,
      tags: [role, 'Content', 'Writing']
    });
  }

  if (interests.length > 0) {
    const interest = interests[0];
    ideas.push({
      category: 'Content',
      title: `${interest} Review & Recommendations`,
      description: `Create content reviewing and recommending ${interest.toLowerCase()}-related products, services, or experiences. Build a niche audience.`,
      tags: [interest, 'Content', 'Reviews']
    });
  }

  return ideas;
}

function generateBusinessIdeas(role, skills, interests) {
  const ideas = [];

  if (skills.length >= 2) {
    const skill1 = skills[0];
    const skill2 = skills[1];
    ideas.push({
      category: 'Business',
      title: `${skill1} Consulting for ${skill2} Teams`,
      description: `Offer consulting services helping ${skill2.toLowerCase()} teams improve their ${skill1.toLowerCase()} capabilities. Package your expertise as a service.`,
      tags: [skill1, skill2, 'Consulting', 'Business']
    });
  }

  if (interests.length > 0 && skills.length > 0) {
    const interest = interests[0];
    const skill = skills[0];
    ideas.push({
      category: 'Business',
      title: `${interest} Automation Service`,
      description: `Use ${skill.toLowerCase()} to automate workflows in the ${interest.toLowerCase()} space. Target businesses or individuals in this niche.`,
      tags: [interest, skill, 'Business', 'Automation']
    });
  }

  if (skills.length > 0) {
    ideas.push({
      category: 'Business',
      title: `Premium ${skills[0]} Templates/Tools`,
      description: `Create and sell high-quality templates, boilerplates, or tools for ${skills[0].toLowerCase()}. Focus on saving people time and effort.`,
      tags: [skills[0], 'Business', 'Product']
    });
  }

  return ideas;
}

function generateHobbyFusionIdeas(interests, skills) {
  const ideas = [];

  if (interests.length >= 2) {
    const interest1 = interests[0];
    const interest2 = interests[1];
    ideas.push({
      category: 'Hobby Fusion',
      title: `${interest1} meets ${interest2}`,
      description: `Explore the intersection of ${interest1.toLowerCase()} and ${interest2.toLowerCase()}. Create content, events, or projects that combine both passions.`,
      tags: [interest1, interest2, 'Hobby', 'Creative']
    });
  }

  if (interests.length > 0 && skills.length > 0) {
    const interest = interests[Math.floor(Math.random() * interests.length)];
    ideas.push({
      category: 'Hobby Fusion',
      title: `Tech-Enhanced ${interest}`,
      description: `Use technology and your skills to enhance your ${interest.toLowerCase()} hobby. Build tools, track data, or create digital experiences around it.`,
      tags: [interest, 'Hobby', 'Tech']
    });
  }

  return ideas;
}

function displayIdeas(ideas) {
  emptyState.classList.add('hidden');
  ideasSection.classList.remove('hidden');

  // Shuffle and limit to 6 ideas
  const shuffled = ideas.sort(() => Math.random() - 0.5).slice(0, 6);

  ideasContainer.innerHTML = shuffled.map(idea => `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div class="flex items-start justify-between mb-3">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(idea.category)}">
          ${idea.category}
        </span>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">${idea.title}</h3>
      <p class="text-gray-600 text-sm leading-relaxed mb-4">${idea.description}</p>
      <div class="flex flex-wrap gap-2">
        ${idea.tags.map(tag => `
          <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">${tag}</span>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Scroll to ideas
  ideasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getCategoryColor(category) {
  const colors = {
    'Project': 'bg-blue-100 text-blue-700',
    'Learning': 'bg-purple-100 text-purple-700',
    'Content': 'bg-green-100 text-green-700',
    'Business': 'bg-amber-100 text-amber-700',
    'Hobby Fusion': 'bg-pink-100 text-pink-700'
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
}