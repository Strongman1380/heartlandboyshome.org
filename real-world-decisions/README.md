# Real World Decisions - Interactive Game

An interactive decision-making game designed for group home settings with multiple teams competing. Optimized for smart boards and touch interfaces.

## Features

### Core Functionality
- **Multi-Team Support**: 1-4 teams with up to 4 players each
- **Interactive Scenarios**: 20+ real-world decision scenarios across 6 categories
- **Decision Worksheets**: 6-step guided decision-making process
- **Staff Evaluation**: Token-based scoring system (Green/Yellow/Red)
- **Multiple Game Modes**: Standard, Tournament, Skill Building, and Quick Decision

### Smart Board Optimized
- **Touch-First Design**: Large touch targets (48px minimum)
- **High Contrast Mode**: Accessibility support
- **Responsive Layout**: Works on screens from tablets to smart boards
- **Fullscreen Support**: F11 for immersive experience
- **Landscape Orientation**: Optimized for wide screens

### Progressive Web App (PWA)
- **Offline Support**: Works without internet connection
- **Installable**: Can be installed on devices like a native app
- **Auto-Save**: Game state saved automatically
- **Cross-Platform**: Works on Windows, macOS, iOS, Android

## Quick Start

### 1. Basic Setup
1. Upload the `real-world-decisions` folder to your web server
2. Navigate to `https://your-domain.com/real-world-decisions/`
3. The app will load and be ready to use

### 2. Smart Board Setup
1. Open the app in fullscreen mode (F11)
2. Adjust text size in Settings if needed
3. Enable high contrast mode for better visibility
4. Use touch gestures for navigation

### 3. Starting a Game
1. Click "Start New Game" from the main menu
2. Select number of teams (1-4)
3. Enter team names and player names
4. Choose a game mode or use default
5. Click "Start Game"

## Game Modes

### Standard Challenge (30-45 minutes)
- Teams take turns selecting scenario categories
- Each team completes a decision worksheet
- Staff evaluates responses with token system
- 3 rounds with progressive difficulty

### Tournament Mode (45-60 minutes)
- Bracket-style competition
- 4 rounds with increasing difficulty
- Championship round for final teams
- Trophy system for winners

### Skill Building Mode (20-30 minutes)
- Focus on specific social skills
- 2 rounds of targeted practice
- Connects to treatment goals
- Progress tracking available

### Quick Decision Mode (15-20 minutes)
- Timed responses (30-60 seconds)
- 5 fast-paced rounds
- Immediate judgment focus
- Great for warm-ups

## Scenario Categories

1. **Everyday Choices** - Daily decisions and routines
2. **Social Situations** - Peer interactions and relationships
3. **School & Work** - Academic and professional scenarios
4. **Family & Relationships** - Family dynamics and personal bonds
5. **Money Management** - Financial decisions and budgeting
6. **Health & Safety** - Personal health and safety choices

## Decision Worksheet Process

Each scenario follows a 6-step decision-making framework:

1. **Identify the Problem** - What needs to be decided?
2. **Consider Your Options** - What are the different choices?
3. **Think About Consequences** - What might happen with each choice?
4. **Consider Others** - How might your decision affect other people?
5. **Make Your Decision** - Which option is best and why?
6. **Plan Your Action** - How will you implement your decision?

## Scoring System

### Token Values
- **Green Token**: 5 points - Excellent decision-making
- **Yellow Token**: 3 points - Good decision with minor issues
- **Red Token**: 1 point - Poor decision or needs improvement

### Evaluation Criteria
Staff evaluate based on:
- Quality of reasoning
- Consideration of consequences
- Empathy for others affected
- Practicality of solution
- Social skills demonstrated

## Technical Requirements

### Minimum Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for initial load
- Touch screen or mouse/keyboard input

### Recommended for Smart Boards
- Screen resolution: 1920x1080 or higher
- Touch-enabled display
- Chrome browser in fullscreen mode
- Stable internet connection

### Server Requirements
- Static file hosting (no server-side processing needed)
- HTTPS recommended for PWA features
- Gzip compression for faster loading

## Installation Options

### Option 1: Web Server Upload
1. Upload all files to your web server
2. Ensure proper MIME types are set
3. Access via web browser

### Option 2: Local Development
```bash
# Serve locally using Python
python -m http.server 8000

# Or using Node.js
npx http-server

# Then visit http://localhost:8000/real-world-decisions/
```

### Option 3: PWA Installation
1. Visit the app in a supported browser
2. Look for "Install" prompt or menu option
3. Follow browser-specific installation steps
4. App will be available offline

## Customization

### Adding New Scenarios
Edit `js/data.js` and add new scenario objects:

```javascript
{
    id: 'NEW-001',
    title: 'Your Scenario Title',
    category: 'everyday-choices',
    level: 1,
    scenario: 'Your scenario description...',
    social_skills: ['Skill1', 'Skill2'],
    difficulty: 1
}
```

### Modifying Categories
Update the `categories` array in `js/data.js`:

```javascript
{
    id: 'new-category',
    name: 'New Category',
    description: 'Category description',
    color: '#hexcolor'
}
```

### Adjusting Settings
Default settings can be modified in `js/data.js`:

```javascript
defaultSettings: {
    textSize: 'large',        // small, medium, large, extra-large
    highContrast: true,       // true/false
    defaultGameMode: 'standard',
    timerDuration: 90,        // seconds
    soundEnabled: false,      // true/false
    animationsEnabled: true   // true/false
}
```

## Accessibility Features

### Built-in Support
- **Screen Reader Compatible**: ARIA labels and live regions
- **Keyboard Navigation**: Full keyboard support with Tab/Shift+Tab
- **High Contrast Mode**: Enhanced visibility option
- **Scalable Text**: Multiple text size options
- **Touch Optimization**: Large touch targets and gestures

### Keyboard Shortcuts
- **F11**: Toggle fullscreen
- **Escape**: Go back/cancel current action
- **Tab/Shift+Tab**: Navigate between elements
- **Enter**: Activate buttons and submit forms
- **Ctrl+H**: Show help (when implemented)

## Troubleshooting

### Common Issues

**App won't load**
- Check internet connection
- Clear browser cache
- Try different browser
- Ensure JavaScript is enabled

**Touch not working on smart board**
- Calibrate touch screen
- Try different browser
- Check touch drivers
- Restart browser

**Scenarios not displaying**
- Check browser console for errors
- Verify all JavaScript files loaded
- Clear browser cache
- Check for ad blockers

**PWA won't install**
- Use HTTPS connection
- Try Chrome or Edge browser
- Check manifest.json is accessible
- Clear browser data

### Performance Optimization

**For Smart Boards**
- Use Chrome browser
- Enable hardware acceleration
- Close unnecessary tabs
- Use fullscreen mode
- Ensure stable network connection

**For Tablets/Mobile**
- Use landscape orientation
- Adjust text size in settings
- Enable high contrast if needed
- Close background apps

## Data Export

Game results can be exported as JSON files containing:
- Team information and scores
- Individual scenario responses
- Evaluation results and comments
- Game statistics and duration
- Social skills practiced

## Security Considerations

### Staff Authentication
- Default credentials: username `staff`, password `heartland2024`
- Change credentials in `js/ui.js` staffLogin function
- Consider implementing proper authentication for production

### Data Privacy
- All data stored locally in browser
- No data transmitted to external servers
- Clear browser data to remove all game history
- Export function available for record keeping

## Support and Updates

### Getting Help
- Check this README for common solutions
- Review browser console for error messages
- Test in different browsers
- Contact technical support if needed

### Future Updates
- Additional scenarios and categories
- Enhanced reporting features
- Integration with existing systems
- Advanced analytics and progress tracking

## License

This application is developed for Heartland Boys Home. All rights reserved.

## Version History

### v1.0.0 (Current)
- Initial release
- 20+ scenarios across 6 categories
- 4 game modes
- PWA support
- Smart board optimization
- Accessibility features

---

For technical support or feature requests, please contact the development team.