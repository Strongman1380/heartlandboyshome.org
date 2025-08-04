// Game State Management
class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.teams = [];
        this.currentTeamIndex = 0;
        this.currentRound = 1;
        this.gameMode = 'standard';
        this.selectedCategory = null;
        this.currentScenario = null;
        this.worksheetResponses = {};
        this.usedScenarios = [];
        this.gameStartTime = null;
        this.gameEndTime = null;
        this.isGameActive = false;
        this.isPaused = false;
        this.staffLoggedIn = false;
        this.currentEvaluation = null;
        this.gameHistory = [];
    }

    // Team Management
    addTeam(teamData) {
        const team = {
            id: this.teams.length + 1,
            name: teamData.name || `Team ${this.teams.length + 1}`,
            color: GAME_DATA.teamColors[this.teams.length] || 'blue',
            players: teamData.players || [],
            score: 0,
            scenarios: [],
            tokens: { green: 0, yellow: 0, red: 0 }
        };
        this.teams.push(team);
        return team;
    }

    removeTeam(teamId) {
        this.teams = this.teams.filter(team => team.id !== teamId);
        // Reassign IDs to maintain sequence
        this.teams.forEach((team, index) => {
            team.id = index + 1;
        });
    }

    getCurrentTeam() {
        return this.teams[this.currentTeamIndex] || null;
    }

    nextTeam() {
        this.currentTeamIndex = (this.currentTeamIndex + 1) % this.teams.length;
        if (this.currentTeamIndex === 0) {
            this.currentRound++;
        }
    }

    // Game Flow
    startGame() {
        this.isGameActive = true;
        this.gameStartTime = new Date();
        this.currentRound = 1;
        this.currentTeamIndex = 0;
        console.log('Game started with', this.teams.length, 'teams');
    }

    endGame() {
        this.isGameActive = false;
        this.gameEndTime = new Date();
        this.calculateFinalScores();
        console.log('Game ended');
    }

    pauseGame() {
        this.isPaused = !this.isPaused;
        console.log('Game', this.isPaused ? 'paused' : 'resumed');
    }

    // Scenario Management
    selectCategory(categoryId) {
        this.selectedCategory = categoryId;
        console.log('Category selected:', categoryId);
    }

    drawScenario() {
        if (!this.selectedCategory) {
            console.error('No category selected');
            return null;
        }

        const currentTeam = this.getCurrentTeam();
        if (!currentTeam) {
            console.error('No current team');
            return null;
        }

        // Get appropriate level based on game mode and round
        const level = this.getScenarioLevel();
        
        const scenario = DataUtils.getRandomScenario(
            this.selectedCategory, 
            level, 
            this.usedScenarios
        );

        if (!scenario) {
            console.error('No available scenarios for category:', this.selectedCategory);
            return null;
        }

        this.currentScenario = scenario;
        this.usedScenarios.push(scenario.id);
        currentTeam.scenarios.push(scenario.id);
        
        console.log('Scenario drawn:', scenario.title);
        return scenario;
    }

    getScenarioLevel() {
        // Determine scenario level based on game mode and round
        switch (this.gameMode) {
            case 'tournament':
                return Math.min(this.currentRound, 3); // Progressive difficulty
            case 'skill-building':
                return 1; // Focus on fundamentals
            case 'quick-decision':
                return Math.min(Math.floor(this.currentRound / 2) + 1, 2);
            default:
                return Math.min(Math.floor((this.currentRound + 1) / 2), 2);
        }
    }

    // Worksheet Management
    initializeWorksheet() {
        this.worksheetResponses = {};
        GAME_DATA.worksheetSteps.forEach(step => {
            this.worksheetResponses[step.id] = '';
        });
    }

    updateWorksheetResponse(stepId, response) {
        this.worksheetResponses[stepId] = response;
    }

    getWorksheetResponse(stepId) {
        return this.worksheetResponses[stepId] || '';
    }

    isWorksheetComplete() {
        return GAME_DATA.worksheetSteps.every(step => 
            this.worksheetResponses[step.id] && 
            this.worksheetResponses[step.id].trim().length > 0
        );
    }

    // Evaluation Management
    startEvaluation() {
        const currentTeam = this.getCurrentTeam();
        this.currentEvaluation = {
            teamId: currentTeam.id,
            scenario: this.currentScenario,
            responses: { ...this.worksheetResponses },
            token: null,
            points: 0,
            comments: '',
            timestamp: new Date()
        };
    }

    assignToken(tokenColor) {
        if (!this.currentEvaluation) return;
        
        this.currentEvaluation.token = tokenColor;
        this.currentEvaluation.points = DataUtils.getPointValue(tokenColor);
    }

    addStaffComments(comments) {
        if (!this.currentEvaluation) return;
        this.currentEvaluation.comments = comments;
    }

    submitEvaluation() {
        if (!this.currentEvaluation || !this.currentEvaluation.token) {
            console.error('Evaluation incomplete');
            return false;
        }

        const currentTeam = this.getCurrentTeam();
        
        // Update team score and tokens
        currentTeam.score += this.currentEvaluation.points;
        currentTeam.tokens[this.currentEvaluation.token]++;

        // Store evaluation in game history
        this.gameHistory.push({ ...this.currentEvaluation });

        console.log(`Evaluation submitted: ${this.currentEvaluation.token} token (${this.currentEvaluation.points} points)`);
        
        // Clear current evaluation
        this.currentEvaluation = null;
        
        return true;
    }

    // Scoring
    calculateFinalScores() {
        // Sort teams by score (descending)
        this.teams.sort((a, b) => b.score - a.score);
        
        // Assign ranks
        this.teams.forEach((team, index) => {
            team.rank = index + 1;
        });

        return this.teams;
    }

    getTeamRankings() {
        return [...this.teams].sort((a, b) => b.score - a.score);
    }

    // Game Statistics
    getGameStats() {
        const duration = this.gameEndTime && this.gameStartTime ? 
            this.gameEndTime - this.gameStartTime : 
            new Date() - this.gameStartTime;

        return {
            duration: Math.floor(duration / 1000 / 60), // minutes
            rounds: this.currentRound,
            totalScenarios: this.usedScenarios.length,
            averageScore: this.teams.reduce((sum, team) => sum + team.score, 0) / this.teams.length,
            categoriesUsed: [...new Set(this.gameHistory.map(eval => eval.scenario.category))].length,
            skillsPracticed: [...new Set(this.gameHistory.flatMap(eval => eval.scenario.social_skills))].length
        };
    }

    // Data Export
    exportGameData() {
        return {
            gameInfo: {
                mode: this.gameMode,
                startTime: this.gameStartTime,
                endTime: this.gameEndTime,
                duration: this.getGameStats().duration
            },
            teams: this.teams.map(team => ({
                ...team,
                players: team.players.map(player => ({ name: player })) // Remove sensitive data
            })),
            evaluations: this.gameHistory,
            statistics: this.getGameStats()
        };
    }

    // Save/Load State
    saveToLocalStorage() {
        try {
            const gameData = {
                teams: this.teams,
                currentTeamIndex: this.currentTeamIndex,
                currentRound: this.currentRound,
                gameMode: this.gameMode,
                usedScenarios: this.usedScenarios,
                gameHistory: this.gameHistory,
                isGameActive: this.isGameActive,
                gameStartTime: this.gameStartTime
            };
            localStorage.setItem('realWorldDecisions_gameState', JSON.stringify(gameData));
            console.log('Game state saved');
        } catch (error) {
            console.error('Failed to save game state:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('realWorldDecisions_gameState');
            if (savedData) {
                const gameData = JSON.parse(savedData);
                Object.assign(this, gameData);
                console.log('Game state loaded');
                return true;
            }
        } catch (error) {
            console.error('Failed to load game state:', error);
        }
        return false;
    }

    clearSavedState() {
        localStorage.removeItem('realWorldDecisions_gameState');
        console.log('Saved game state cleared');
    }
}

// Timer Management
class GameTimer {
    constructor(duration = 60) {
        this.duration = duration;
        this.remaining = duration;
        this.isRunning = false;
        this.intervalId = null;
        this.callbacks = {
            tick: [],
            complete: [],
            warning: []
        };
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.remaining--;
            
            // Trigger tick callbacks
            this.callbacks.tick.forEach(callback => callback(this.remaining));
            
            // Warning at 10 seconds
            if (this.remaining === 10) {
                this.callbacks.warning.forEach(callback => callback());
            }
            
            // Timer complete
            if (this.remaining <= 0) {
                this.stop();
                this.callbacks.complete.forEach(callback => callback());
            }
        }, 1000);
    }

    stop() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset(newDuration = null) {
        this.stop();
        if (newDuration) {
            this.duration = newDuration;
        }
        this.remaining = this.duration;
    }

    pause() {
        if (this.isRunning) {
            this.stop();
            return true; // Was running
        }
        return false; // Was not running
    }

    resume() {
        if (!this.isRunning && this.remaining > 0) {
            this.start();
        }
    }

    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }

    off(event, callback) {
        if (this.callbacks[event]) {
            const index = this.callbacks[event].indexOf(callback);
            if (index > -1) {
                this.callbacks[event].splice(index, 1);
            }
        }
    }

    getTimeString() {
        const minutes = Math.floor(this.remaining / 60);
        const seconds = this.remaining % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Settings Management
class GameSettings {
    constructor() {
        this.settings = { ...GAME_DATA.defaultSettings };
        this.loadSettings();
    }

    get(key) {
        return this.settings[key];
    }

    set(key, value) {
        this.settings[key] = value;
        this.applySettings();
        this.saveSettings();
    }

    setMultiple(newSettings) {
        Object.assign(this.settings, newSettings);
        this.applySettings();
        this.saveSettings();
    }

    reset() {
        this.settings = { ...GAME_DATA.defaultSettings };
        this.applySettings();
        this.saveSettings();
    }

    applySettings() {
        const body = document.body;
        
        // Text size
        body.classList.remove('text-small', 'text-medium', 'text-large', 'text-extra-large');
        body.classList.add(`text-${this.settings.textSize}`);
        
        // High contrast
        body.classList.toggle('high-contrast', this.settings.highContrast);
        
        // Apply other settings as needed
        console.log('Settings applied:', this.settings);
    }

    saveSettings() {
        try {
            localStorage.setItem('realWorldDecisions_settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('realWorldDecisions_settings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                this.settings = { ...GAME_DATA.defaultSettings, ...parsed };
                this.applySettings();
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    }
}

// Global game instances
let gameState = new GameState();
let gameTimer = new GameTimer();
let gameSettings = new GameSettings();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameState, GameTimer, GameSettings };
}