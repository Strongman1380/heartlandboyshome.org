// Game Data Structure
const GAME_DATA = {
    categories: [
        {
            id: 'everyday-choices',
            name: 'Everyday Choices',
            description: 'Daily decisions and routine situations',
            color: '#10b981'
        },
        {
            id: 'social-situations',
            name: 'Social Situations',
            description: 'Interactions with peers and adults',
            color: '#3b82f6'
        },
        {
            id: 'school-work',
            name: 'School & Work',
            description: 'Academic and professional scenarios',
            color: '#f59e0b'
        },
        {
            id: 'family-relationships',
            name: 'Family & Relationships',
            description: 'Family dynamics and personal relationships',
            color: '#ef4444'
        },
        {
            id: 'money-management',
            name: 'Money Management',
            description: 'Financial decisions and budgeting',
            color: '#8b5cf6'
        },
        {
            id: 'health-safety',
            name: 'Health & Safety',
            description: 'Personal health and safety decisions',
            color: '#06b6d4'
        }
    ],

    scenarios: [
        // Everyday Choices - Level 1
        {
            id: 'EC-001',
            title: 'Morning Routine',
            category: 'everyday-choices',
            level: 1,
            scenario: 'You woke up 15 minutes late for school. Your alarm didn\'t go off, and you have a test first period that you studied hard for. You need to decide how to handle this situation.',
            social_skills: ['Time Management', 'Responsibility', 'Planning'],
            difficulty: 1
        },
        {
            id: 'EC-002',
            title: 'Chore Responsibilities',
            category: 'everyday-choices',
            level: 1,
            scenario: 'It\'s your turn to do dishes, but your favorite TV show is starting in 5 minutes. Your house parent asked you to have them done before dinner, which is in 2 hours.',
            social_skills: ['Responsibility', 'Time Management', 'Following Rules'],
            difficulty: 1
        },
        {
            id: 'EC-003',
            title: 'Personal Hygiene',
            category: 'everyday-choices',
            level: 1,
            scenario: 'You\'re running late for a group activity, but you haven\'t showered yet and you feel like you need one. The group is leaving in 10 minutes.',
            social_skills: ['Personal Care', 'Time Management', 'Social Awareness'],
            difficulty: 1
        },

        // Social Situations - Level 1
        {
            id: 'SS-001',
            title: 'New Roommate',
            category: 'social-situations',
            level: 1,
            scenario: 'A new resident just moved into your room. They seem shy and haven\'t talked to anyone yet. You notice they\'re sitting alone during free time.',
            social_skills: ['Empathy', 'Communication', 'Inclusion'],
            difficulty: 1
        },
        {
            id: 'SS-002',
            title: 'Group Conflict',
            category: 'social-situations',
            level: 1,
            scenario: 'Two of your friends are arguing about what game to play during recreation time. They both want you to take their side and are getting upset.',
            social_skills: ['Conflict Resolution', 'Neutrality', 'Problem Solving'],
            difficulty: 1
        },
        {
            id: 'SS-003',
            title: 'Peer Pressure',
            category: 'social-situations',
            level: 1,
            scenario: 'Some residents are planning to stay up past lights-out to watch a movie. They\'re asking you to join them, but you know it\'s against the rules.',
            social_skills: ['Decision Making', 'Peer Resistance', 'Rule Following'],
            difficulty: 1
        },

        // School & Work - Level 1
        {
            id: 'SW-001',
            title: 'Homework Challenge',
            category: 'school-work',
            level: 1,
            scenario: 'You have a math assignment due tomorrow that you don\'t understand. You\'ve been working on it for an hour and are getting frustrated.',
            social_skills: ['Help Seeking', 'Persistence', 'Academic Responsibility'],
            difficulty: 1
        },
        {
            id: 'SW-002',
            title: 'Group Project',
            category: 'school-work',
            level: 1,
            scenario: 'You\'re assigned to work on a group project with three classmates. One person isn\'t doing their share of the work, and the project is due next week.',
            social_skills: ['Teamwork', 'Communication', 'Problem Solving'],
            difficulty: 1
        },

        // Family & Relationships - Level 1
        {
            id: 'FR-001',
            title: 'Family Visit',
            category: 'family-relationships',
            level: 1,
            scenario: 'Your family is coming to visit this weekend, but you\'re still upset about something that happened during their last visit. You\'re not sure if you want to see them.',
            social_skills: ['Emotional Regulation', 'Communication', 'Forgiveness'],
            difficulty: 1
        },
        {
            id: 'FR-002',
            title: 'Friend\'s Problem',
            category: 'family-relationships',
            level: 1,
            scenario: 'Your close friend tells you they\'re having problems at home and asks you not to tell anyone. You\'re worried about them and think an adult should know.',
            social_skills: ['Loyalty', 'Help Seeking', 'Confidentiality'],
            difficulty: 1
        },

        // Money Management - Level 1
        {
            id: 'MM-001',
            title: 'Allowance Decision',
            category: 'money-management',
            level: 1,
            scenario: 'You just received your weekly allowance of $10. You want to buy a snack that costs $3, but you\'re also saving up for a video game that costs $25.',
            social_skills: ['Budgeting', 'Delayed Gratification', 'Goal Setting'],
            difficulty: 1
        },
        {
            id: 'MM-002',
            title: 'Found Money',
            category: 'money-management',
            level: 1,
            scenario: 'You found $5 on the floor in the common room. No one is around, and you\'re not sure who it belongs to.',
            social_skills: ['Honesty', 'Integrity', 'Problem Solving'],
            difficulty: 1
        },

        // Health & Safety - Level 1
        {
            id: 'HS-001',
            title: 'Feeling Sick',
            category: 'health-safety',
            level: 1,
            scenario: 'You wake up with a headache and feel nauseous. You have school today and an important test, but you don\'t feel well.',
            social_skills: ['Self-Advocacy', 'Health Awareness', 'Decision Making'],
            difficulty: 1
        },
        {
            id: 'HS-002',
            title: 'Safety Concern',
            category: 'health-safety',
            level: 1,
            scenario: 'You notice that a window in your room doesn\'t lock properly. It\'s on the second floor, and you\'re concerned about security.',
            social_skills: ['Safety Awareness', 'Reporting', 'Problem Solving'],
            difficulty: 1
        },

        // Level 2 Scenarios (More Complex)
        {
            id: 'EC-004',
            title: 'Technology Balance',
            category: 'everyday-choices',
            level: 2,
            scenario: 'You\'ve been spending a lot of time on your phone lately, and your grades are starting to slip. Your house parent mentioned limiting screen time, but hasn\'t made it a rule yet.',
            social_skills: ['Self-Regulation', 'Priority Setting', 'Academic Responsibility'],
            difficulty: 2
        },
        {
            id: 'SS-004',
            title: 'Bullying Situation',
            category: 'social-situations',
            level: 2,
            scenario: 'You witness another resident being picked on by a group of older kids at school. The victim is someone you don\'t know well, but you can see they\'re upset.',
            social_skills: ['Courage', 'Advocacy', 'Moral Reasoning'],
            difficulty: 2
        },
        {
            id: 'SW-003',
            title: 'Job Interview',
            category: 'school-work',
            level: 2,
            scenario: 'You have an opportunity to interview for a part-time job at a local store. You\'ve never had a job interview before and are nervous about what to say and how to act.',
            social_skills: ['Professional Communication', 'Self-Presentation', 'Confidence'],
            difficulty: 2
        },
        {
            id: 'FR-003',
            title: 'Relationship Conflict',
            category: 'family-relationships',
            level: 2,
            scenario: 'You and your best friend had a big argument about something important to both of you. It\'s been a week, and neither of you has apologized. You miss the friendship but feel hurt.',
            social_skills: ['Conflict Resolution', 'Pride Management', 'Relationship Repair'],
            difficulty: 2
        },
        {
            id: 'MM-003',
            title: 'Emergency Expense',
            category: 'money-management',
            level: 2,
            scenario: 'Your phone screen cracked and needs to be repaired for $50. You have $30 saved up, but you were planning to use that money for a friend\'s birthday gift next week.',
            social_skills: ['Financial Planning', 'Priority Setting', 'Problem Solving'],
            difficulty: 2
        },
        {
            id: 'HS-003',
            title: 'Peer Risk Behavior',
            category: 'health-safety',
            level: 2,
            scenario: 'Some residents are talking about trying to sneak out of the facility at night to meet friends. They\'re asking if you want to come along.',
            social_skills: ['Risk Assessment', 'Peer Resistance', 'Safety Awareness'],
            difficulty: 2
        }
    ],

    worksheetSteps: [
        {
            id: 1,
            title: 'Identify the Problem',
            description: 'What is the main problem or decision you need to make?',
            prompt: 'Describe the situation in your own words. What exactly needs to be decided?'
        },
        {
            id: 2,
            title: 'Consider Your Options',
            description: 'What are the different choices you could make?',
            prompt: 'List at least 3 different ways you could handle this situation.'
        },
        {
            id: 3,
            title: 'Think About Consequences',
            description: 'What might happen with each choice?',
            prompt: 'For each option you listed, write down what you think might happen (both good and bad).'
        },
        {
            id: 4,
            title: 'Consider Others',
            description: 'How might your decision affect other people?',
            prompt: 'Who else might be affected by your choice? How might they feel?'
        },
        {
            id: 5,
            title: 'Make Your Decision',
            description: 'Which option do you think is best and why?',
            prompt: 'Choose the option you think is best and explain your reasoning.'
        },
        {
            id: 6,
            title: 'Plan Your Action',
            description: 'How will you carry out your decision?',
            prompt: 'What specific steps will you take to implement your decision?'
        }
    ],

    pointValues: {
        green: 5,
        yellow: 3,
        red: 1
    },

    gameModes: {
        standard: {
            name: 'Standard Challenge',
            description: 'Teams take turns selecting scenarios and completing worksheets',
            duration: '30-45 minutes',
            maxTeams: 4,
            rounds: 3,
            timeLimit: null
        },
        tournament: {
            name: 'Tournament Mode',
            description: 'Bracket-style competition with progressive difficulty',
            duration: '45-60 minutes',
            maxTeams: 4,
            rounds: 4,
            timeLimit: null
        },
        skillBuilding: {
            name: 'Skill Building',
            description: 'Focus on specific social skills and competencies',
            duration: '20-30 minutes',
            maxTeams: 4,
            rounds: 2,
            timeLimit: null
        },
        quickDecision: {
            name: 'Quick Decision',
            description: 'Timed responses focusing on immediate judgment',
            duration: '15-20 minutes',
            maxTeams: 4,
            rounds: 5,
            timeLimit: 60
        }
    },

    socialSkills: [
        'Time Management',
        'Responsibility',
        'Planning',
        'Following Rules',
        'Personal Care',
        'Social Awareness',
        'Empathy',
        'Communication',
        'Inclusion',
        'Conflict Resolution',
        'Neutrality',
        'Problem Solving',
        'Decision Making',
        'Peer Resistance',
        'Rule Following',
        'Help Seeking',
        'Persistence',
        'Academic Responsibility',
        'Teamwork',
        'Emotional Regulation',
        'Forgiveness',
        'Loyalty',
        'Confidentiality',
        'Budgeting',
        'Delayed Gratification',
        'Goal Setting',
        'Honesty',
        'Integrity',
        'Self-Advocacy',
        'Health Awareness',
        'Safety Awareness',
        'Reporting',
        'Self-Regulation',
        'Priority Setting',
        'Courage',
        'Advocacy',
        'Moral Reasoning',
        'Professional Communication',
        'Self-Presentation',
        'Confidence',
        'Pride Management',
        'Relationship Repair',
        'Financial Planning',
        'Risk Assessment'
    ],

    teamColors: ['green', 'yellow', 'red', 'blue'],
    
    defaultSettings: {
        textSize: 'medium',
        highContrast: false,
        defaultGameMode: 'standard',
        timerDuration: 60,
        soundEnabled: true,
        animationsEnabled: true
    }
};

// Utility functions for data access
const DataUtils = {
    getScenariosByCategory: (categoryId, level = null) => {
        return GAME_DATA.scenarios.filter(scenario => {
            const matchesCategory = scenario.category === categoryId;
            const matchesLevel = level ? scenario.level === level : true;
            return matchesCategory && matchesLevel;
        });
    },

    getScenarioById: (scenarioId) => {
        return GAME_DATA.scenarios.find(scenario => scenario.id === scenarioId);
    },

    getCategoryById: (categoryId) => {
        return GAME_DATA.categories.find(category => category.id === categoryId);
    },

    getRandomScenario: (categoryId, level = null, excludeIds = []) => {
        const scenarios = DataUtils.getScenariosByCategory(categoryId, level)
            .filter(scenario => !excludeIds.includes(scenario.id));
        
        if (scenarios.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * scenarios.length);
        return scenarios[randomIndex];
    },

    getScenariosBySkill: (skillName) => {
        return GAME_DATA.scenarios.filter(scenario => 
            scenario.social_skills.includes(skillName)
        );
    },

    getScenariosByLevel: (level) => {
        return GAME_DATA.scenarios.filter(scenario => scenario.level === level);
    },

    getAllCategories: () => {
        return GAME_DATA.categories;
    },

    getAllSocialSkills: () => {
        return GAME_DATA.socialSkills;
    },

    getWorksheetSteps: () => {
        return GAME_DATA.worksheetSteps;
    },

    getPointValue: (tokenColor) => {
        return GAME_DATA.pointValues[tokenColor] || 0;
    },

    getGameMode: (modeId) => {
        return GAME_DATA.gameModes[modeId];
    },

    validateScenarioData: () => {
        const errors = [];
        
        // Check for duplicate IDs
        const ids = GAME_DATA.scenarios.map(s => s.id);
        const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
        if (duplicateIds.length > 0) {
            errors.push(`Duplicate scenario IDs: ${duplicateIds.join(', ')}`);
        }

        // Check for valid categories
        const validCategoryIds = GAME_DATA.categories.map(c => c.id);
        GAME_DATA.scenarios.forEach(scenario => {
            if (!validCategoryIds.includes(scenario.category)) {
                errors.push(`Invalid category '${scenario.category}' in scenario ${scenario.id}`);
            }
        });

        // Check for valid social skills
        GAME_DATA.scenarios.forEach(scenario => {
            scenario.social_skills.forEach(skill => {
                if (!GAME_DATA.socialSkills.includes(skill)) {
                    errors.push(`Invalid social skill '${skill}' in scenario ${scenario.id}`);
                }
            });
        });

        return errors;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAME_DATA, DataUtils };
}