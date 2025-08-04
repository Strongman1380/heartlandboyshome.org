// UI Management Functions

// Screen Management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Initialize screen-specific content
        initializeScreen(screenId);
    }
}

function initializeScreen(screenId) {
    switch (screenId) {
        case 'team-setup':
            initializeTeamSetup();
            break;
        case 'game-screen':
            initializeGameScreen();
            break;
        case 'worksheet-screen':
            initializeWorksheetScreen();
            break;
        case 'evaluation-screen':
            initializeEvaluationScreen();
            break;
        case 'scoreboard-screen':
            initializeScoreboardScreen();
            break;
        case 'settings':
            initializeSettingsScreen();
            break;
    }
}

// Team Setup Functions
function setTeamCount(count) {
    // Update active button
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Generate team cards
    generateTeamCards(count);
    
    // Update start button state
    updateStartButtonState();
}

function generateTeamCards(count) {
    const container = document.getElementById('teams-container');
    container.innerHTML = '';
    
    // Clear existing teams from game state
    gameState.teams = [];
    
    for (let i = 1; i <= count; i++) {
        const teamCard = createTeamCard(i);
        container.appendChild(teamCard);
    }
}

function createTeamCard(teamNumber) {
    const colors = ['green', 'yellow', 'red', 'blue'];
    const color = colors[teamNumber - 1];
    
    const card = document.createElement('div');
    card.className = `team-card team-${teamNumber}`;
    card.innerHTML = `
        <div class="team-header">
            <div class="team-color ${color}"></div>
            <h3>Team ${teamNumber}</h3>
        </div>
        <div class="form-group">
            <label for="team-${teamNumber}-name">Team Name</label>
            <input type="text" id="team-${teamNumber}-name" placeholder="Enter team name" 
                   value="Team ${teamNumber}" onchange="updateTeamName(${teamNumber}, this.value)">
        </div>
        <div class="form-group">
            <label>Players</label>
            <div class="players-list">
                <input type="text" placeholder="Player 1" onchange="updatePlayer(${teamNumber}, 1, this.value)">
                <input type="text" placeholder="Player 2" onchange="updatePlayer(${teamNumber}, 2, this.value)">
                <input type="text" placeholder="Player 3" onchange="updatePlayer(${teamNumber}, 3, this.value)">
                <input type="text" placeholder="Player 4" onchange="updatePlayer(${teamNumber}, 4, this.value)">
            </div>
        </div>
    `;
    
    // Add team to game state
    gameState.addTeam({
        name: `Team ${teamNumber}`,
        players: ['', '', '', '']
    });
    
    return card;
}

function updateTeamName(teamNumber, name) {
    const team = gameState.teams.find(t => t.id === teamNumber);
    if (team) {
        team.name = name || `Team ${teamNumber}`;
    }
    updateStartButtonState();
}

function updatePlayer(teamNumber, playerIndex, name) {
    const team = gameState.teams.find(t => t.id === teamNumber);
    if (team) {
        team.players[playerIndex - 1] = name;
    }
    updateStartButtonState();
}

function updateStartButtonState() {
    const startBtn = document.getElementById('start-game-btn');
    const hasValidTeams = gameState.teams.length > 0 && 
                         gameState.teams.every(team => team.name.trim().length > 0);
    
    startBtn.disabled = !hasValidTeams;
}

function initializeTeamSetup() {
    // Set default team count to 2
    setTeamCount(2);
}

// Game Mode Selection
function selectGameMode(modeId) {
    gameState.gameMode = modeId;
    console.log('Game mode selected:', modeId);
    
    // Visual feedback
    document.querySelectorAll('.mode-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.mode-card').classList.add('selected');
    
    // Auto-advance to team setup after short delay
    setTimeout(() => {
        showScreen('team-setup');
    }, 500);
}

// Game Screen Functions
function initializeGameScreen() {
    updateGameHeader();
    updateTeamScores();
    generateCategoryButtons();
    resetScenarioDisplay();
    updateActionButtons();
}

function updateGameHeader() {
    const currentTeam = gameState.getCurrentTeam();
    const teamElement = document.getElementById('current-team');
    const roundElement = document.getElementById('current-round');
    
    if (currentTeam) {
        teamElement.textContent = `${currentTeam.name}'s Turn`;
    }
    roundElement.textContent = gameState.currentRound;
}

function updateTeamScores() {
    const container = document.getElementById('team-scores-list');
    container.innerHTML = '';
    
    gameState.teams.forEach((team, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.className = `team-score team-${team.id}`;
        if (index === gameState.currentTeamIndex) {
            scoreElement.classList.add('active');
        }
        
        scoreElement.innerHTML = `
            <div class="team-name">${team.name}</div>
            <div class="score">${team.score}</div>
        `;
        
        container.appendChild(scoreElement);
    });
}

function generateCategoryButtons() {
    const container = document.getElementById('category-buttons');
    container.innerHTML = '';
    
    GAME_DATA.categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category.name;
        button.onclick = () => selectCategory(category.id);
        
        container.appendChild(button);
    });
}

function selectCategory(categoryId) {
    gameState.selectCategory(categoryId);
    
    // Update button states
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    updateActionButtons();
}

function updateActionButtons() {
    const drawBtn = document.getElementById('draw-btn');
    const worksheetBtn = document.getElementById('worksheet-btn');
    
    drawBtn.disabled = !gameState.selectedCategory;
    worksheetBtn.disabled = !gameState.currentScenario;
}

function drawScenario() {
    const scenario = gameState.drawScenario();
    if (scenario) {
        displayScenario(scenario);
        updateActionButtons();
    }
}

function displayScenario(scenario) {
    const container = document.getElementById('scenario-display');
    const category = DataUtils.getCategoryById(scenario.category);
    
    container.innerHTML = `
        <div class="scenario-card">
            <div class="scenario-header">
                <div class="scenario-title">${scenario.title}</div>
                <div class="scenario-meta">
                    <span><i class="fas fa-tag"></i> ${category.name}</span>
                    <span><i class="fas fa-signal"></i> Level ${scenario.level}</span>
                </div>
            </div>
            <div class="scenario-content">
                ${scenario.scenario}
            </div>
            <div class="social-skills">
                ${scenario.social_skills.map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                ).join('')}
            </div>
        </div>
    `;
}

function resetScenarioDisplay() {
    const container = document.getElementById('scenario-display');
    container.innerHTML = `
        <div class="scenario-placeholder">
            <i class="fas fa-cards-blank"></i>
            <p>Select a category to draw a scenario card</p>
        </div>
    `;
}

// Worksheet Functions
function showWorksheet() {
    gameState.initializeWorksheet();
    showScreen('worksheet-screen');
}

function initializeWorksheetScreen() {
    displayWorksheetScenario();
    generateWorksheetSteps();
    showWorksheetStep(1);
}

function displayWorksheetScenario() {
    const container = document.getElementById('worksheet-scenario');
    const scenario = gameState.currentScenario;
    
    if (scenario) {
        const category = DataUtils.getCategoryById(scenario.category);
        container.innerHTML = `
            <h3>${scenario.title}</h3>
            <p><strong>Category:</strong> ${category.name} | <strong>Level:</strong> ${scenario.level}</p>
            <p>${scenario.scenario}</p>
        `;
    }
}

function generateWorksheetSteps() {
    const container = document.getElementById('worksheet-form');
    container.innerHTML = '';
    
    GAME_DATA.worksheetSteps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'worksheet-step';
        stepElement.id = `step-${step.id}`;
        
        stepElement.innerHTML = `
            <div class="step-title">${step.title}</div>
            <div class="step-description">${step.description}</div>
            <div class="form-group">
                <textarea id="response-${step.id}" placeholder="${step.prompt}" 
                         onchange="updateWorksheetResponse(${step.id}, this.value)"></textarea>
            </div>
        `;
        
        container.appendChild(stepElement);
    });
}

let currentWorksheetStep = 1;

function showWorksheetStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.worksheet-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStep = document.getElementById(`step-${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
        currentWorksheetStep = stepNumber;
        
        // Update progress
        document.getElementById('worksheet-step').textContent = 
            `Step ${stepNumber} of ${GAME_DATA.worksheetSteps.length}`;
        
        // Update navigation buttons
        updateWorksheetNavigation();
    }
}

function updateWorksheetNavigation() {
    const prevBtn = document.getElementById('prev-step-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const submitBtn = document.getElementById('submit-worksheet-btn');
    
    prevBtn.disabled = currentWorksheetStep === 1;
    
    if (currentWorksheetStep === GAME_DATA.worksheetSteps.length) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function previousStep() {
    if (currentWorksheetStep > 1) {
        showWorksheetStep(currentWorksheetStep - 1);
    }
}

function nextStep() {
    if (currentWorksheetStep < GAME_DATA.worksheetSteps.length) {
        showWorksheetStep(currentWorksheetStep + 1);
    }
}

function updateWorksheetResponse(stepId, response) {
    gameState.updateWorksheetResponse(stepId, response);
}

function submitWorksheet() {
    if (!gameState.isWorksheetComplete()) {
        alert('Please complete all sections of the worksheet before submitting.');
        return;
    }
    
    gameState.startEvaluation();
    showScreen('evaluation-screen');
}

// Evaluation Functions
function initializeEvaluationScreen() {
    displayEvaluationContent();
    resetTokenSelection();
    clearStaffComments();
}

function displayEvaluationContent() {
    const currentTeam = gameState.getCurrentTeam();
    const scenario = gameState.currentScenario;
    
    // Update header
    document.getElementById('evaluation-team').textContent = 
        `Evaluating ${currentTeam.name}`;
    
    // Display scenario
    const scenarioContainer = document.getElementById('evaluation-scenario');
    const category = DataUtils.getCategoryById(scenario.category);
    scenarioContainer.innerHTML = `
        <h3>Scenario: ${scenario.title}</h3>
        <p><strong>Category:</strong> ${category.name} | <strong>Level:</strong> ${scenario.level}</p>
        <div class="scenario-text">${scenario.scenario}</div>
        <div class="social-skills">
            <strong>Social Skills:</strong>
            ${scenario.social_skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('')}
        </div>
    `;
    
    // Display responses
    const responseContainer = document.getElementById('evaluation-response');
    let responseHTML = '<h3>Team Responses</h3>';
    
    GAME_DATA.worksheetSteps.forEach(step => {
        const response = gameState.getWorksheetResponse(step.id);
        responseHTML += `
            <div class="response-section">
                <h4>${step.title}</h4>
                <p class="response-text">${response || 'No response provided'}</p>
            </div>
        `;
    });
    
    responseContainer.innerHTML = responseHTML;
}

function resetTokenSelection() {
    document.querySelectorAll('.token-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function assignToken(tokenColor) {
    gameState.assignToken(tokenColor);
    
    // Update button states
    document.querySelectorAll('.token-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function clearStaffComments() {
    document.getElementById('staff-comments').value = '';
}

function submitEvaluation() {
    const comments = document.getElementById('staff-comments').value;
    gameState.addStaffComments(comments);
    
    if (gameState.submitEvaluation()) {
        // Move to next team or end game
        if (shouldContinueGame()) {
            gameState.nextTeam();
            showScreen('game-screen');
            initializeGameScreen();
        } else {
            gameState.endGame();
            showScreen('scoreboard-screen');
        }
    } else {
        alert('Please assign a token before submitting the evaluation.');
    }
}

function shouldContinueGame() {
    const gameMode = DataUtils.getGameMode(gameState.gameMode);
    return gameState.currentRound <= gameMode.rounds;
}

// Scoreboard Functions
function initializeScoreboardScreen() {
    displayFinalScores();
    displayGameSummary();
}

function displayFinalScores() {
    const container = document.getElementById('final-scores');
    const rankings = gameState.getTeamRankings();
    
    container.innerHTML = '';
    
    rankings.forEach((team, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.className = `final-score team-${team.id}`;
        if (index === 0) {
            scoreElement.classList.add('winner');
        }
        
        scoreElement.innerHTML = `
            <div class="team-info">
                <div class="team-rank">#${index + 1}</div>
                <div class="team-details">
                    <h3>${team.name}</h3>
                    <p>Tokens: ${team.tokens.green}🟢 ${team.tokens.yellow}🟡 ${team.tokens.red}🔴</p>
                </div>
            </div>
            <div class="team-final-score">${team.score}</div>
        `;
        
        container.appendChild(scoreElement);
    });
}

function displayGameSummary() {
    const stats = gameState.getGameStats();
    const gameMode = DataUtils.getGameMode(gameState.gameMode);
    
    document.getElementById('game-summary').innerHTML = `
        <p><strong>Game Mode:</strong> ${gameMode.name}</p>
        <p><strong>Duration:</strong> ${stats.duration} minutes</p>
        <p><strong>Rounds Completed:</strong> ${stats.rounds}</p>
        <p><strong>Scenarios Used:</strong> ${stats.totalScenarios}</p>
        <p><strong>Skills Practiced:</strong> ${stats.skillsPracticed}</p>
    `;
}

// Settings Functions
function initializeSettingsScreen() {
    loadCurrentSettings();
}

function loadCurrentSettings() {
    document.getElementById('default-game-mode').value = gameSettings.get('defaultGameMode');
    document.getElementById('timer-duration').value = gameSettings.get('timerDuration');
    document.getElementById('text-size').value = gameSettings.get('textSize');
    document.getElementById('high-contrast').checked = gameSettings.get('highContrast');
}

function saveSettings() {
    const newSettings = {
        defaultGameMode: document.getElementById('default-game-mode').value,
        timerDuration: parseInt(document.getElementById('timer-duration').value),
        textSize: document.getElementById('text-size').value,
        highContrast: document.getElementById('high-contrast').checked
    };
    
    gameSettings.setMultiple(newSettings);
    
    // Show confirmation
    showNotification('Settings saved successfully!', 'success');
}

function resetSettings() {
    gameSettings.reset();
    loadCurrentSettings();
    showNotification('Settings reset to default values.', 'info');
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function exportResults() {
    const gameData = gameState.exportGameData();
    const dataStr = JSON.stringify(gameData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `real-world-decisions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Game results exported successfully!', 'success');
}

// Game Control Functions
function startGame() {
    gameState.startGame();
    showScreen('game-screen');
}

function pauseGame() {
    gameState.pauseGame();
    showNotification(gameState.isPaused ? 'Game paused' : 'Game resumed', 'info');
}

function endGame() {
    if (confirm('Are you sure you want to end the current game?')) {
        gameState.endGame();
        showScreen('scoreboard-screen');
    }
}

function startNewGame() {
    if (confirm('Start a new game? Current progress will be lost.')) {
        gameState.reset();
        showScreen('main-menu');
    }
}

// Staff Authentication
function staffLogin() {
    const username = document.getElementById('staff-username').value;
    const password = document.getElementById('staff-password').value;
    
    // Simple authentication (in production, this should be more secure)
    if (username === 'staff' && password === 'heartland2024') {
        gameState.staffLoggedIn = true;
        showNotification('Staff login successful!', 'success');
        showScreen('main-menu');
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

// Touch and Accessibility Enhancements
function addTouchSupport() {
    // Add touch event listeners for better mobile/tablet support
    document.addEventListener('touchstart', function(e) {
        // Handle touch start
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        // Handle touch move
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        // Handle touch end
    }, { passive: true });
}

// Keyboard Navigation
function addKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Escape':
                // Handle escape key (go back, close modals, etc.)
                break;
            case 'Enter':
                // Handle enter key for form submissions
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                // Handle arrow keys for navigation
                break;
        }
    });
}

// Initialize UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    addTouchSupport();
    addKeyboardSupport();
});