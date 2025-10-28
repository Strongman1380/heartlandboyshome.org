---
description: Repository Information Overview
alwaysApply: true
---

# Repository Information Overview

## Repository Summary
A professional static website for Heartland Boys Home, a residential treatment facility for youth in Geneva, Nebraska. The repository contains the main website and a separate "Real World Decisions" interactive game application designed for group home settings.

## Repository Structure
- **Root Directory**: Main website HTML files and configuration
- **css/**: Main website stylesheets
- **js/**: Main website JavaScript files
- **images/**: Website images and assets
- **real-world-decisions/**: Interactive decision-making game as a Progressive Web App (PWA)
- **.firebase/**: Firebase hosting cache and configuration
- **public/**: Additional public assets

### Main Repository Components
- **Static Website**: HTML/CSS/JS website with Google Forms integration
- **Real World Decisions**: Interactive PWA game for decision-making training
- **Deployment Configurations**: Vercel and Firebase hosting setups

## Projects

### Main Website
**Configuration File**: package.json

#### Language & Runtime
**Language**: HTML5, CSS3, JavaScript (ES6+)
**Version**: Static website with no specific runtime requirements
**Package Manager**: npm (minimal usage)
**Node Version**: >=16.0.0 (specified in package.json)

#### Build & Installation
```bash
# No build process needed - static site
# Local development server options:
python -m http.server 8000
# or
npx http-server
```

#### Deployment
**Primary Method**: Vercel deployment (configured in vercel.json)
**Alternative**: Firebase hosting (configured in firebase.json)
**Configuration Files**:
- vercel.json: URL rewrites, headers, caching rules
- firebase.json: Firebase hosting configuration
- .htaccess: Apache server configuration (fallback)

### Real World Decisions PWA
**Configuration File**: manifest.json

#### Language & Runtime
**Language**: HTML5, CSS3, JavaScript (ES6+)
**Version**: PWA with offline capabilities
**Build System**: None required (static PWA)

#### Structure
- **index.html**: Main entry point
- **css/styles.css**: Styling for the application
- **js/**: Application JavaScript files
  - app.js: Main application logic
  - game.js: Game mechanics
  - ui.js: User interface components
  - data.js: Game scenarios and configuration

#### PWA Features
**Manifest**: Full PWA manifest with icons and configuration
**Service Worker**: Offline caching and PWA functionality
**Cache Strategy**: Cache-first for offline support
**Installation**: Installable on devices as a native-like app

#### Usage & Operations
```bash
# Serve locally using Python
python -m http.server 8000
# Or using Node.js
npx http-server
# Then visit http://localhost:8000/real-world-decisions/
```

#### Customization
- Scenarios can be added by editing js/data.js
- Categories can be modified in the categories array
- Default settings configurable in js/data.js