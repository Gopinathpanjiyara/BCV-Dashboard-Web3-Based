# BVC Dashboard

A modern, futuristic organizational dashboard featuring a stunning dark theme with 3D animations and neumorphic design elements. Built with React, Framer Motion, and Tailwind CSS.

## ✨ Features

- 🎨 Modern dark theme with 3D neumorphic design
  - Smooth animations and transitions
  - Interactive hover effects
  - Gradient accents and depth
  - Hardware-accelerated transforms

- 🔐 Secure Authentication
  - Beautiful 3D animated login page
  - Persistent session management
  - Protected routes
  - User profile management

- 👥 Candidate Management
  - Quick candidate addition
  - Document verification status tracking
  - Real-time status updates
  - Detailed candidate profiles

- 📊 Interactive Dashboard
  - Status overview cards
  - Recent verifications tracking
  - Search and filter capabilities
  - Time-based analytics

- 📁 Document Management
  - Drag-and-drop file upload
  - Multiple file types support
  - Document status tracking
  - Verification workflow

- ⚡ Performance Optimized
  - Hardware-accelerated animations
  - Optimized asset loading
  - Smooth transitions
  - Responsive design

## 📊 Dashboard Features

### Overview Page
- **Status Cards**
  - Total Candidates counter
  - Verified documents status
  - Pending verifications
  - Flagged items tracking
- **Recent Verifications**
  - Interactive candidate cards
  - Status indicators
  - Document count display
  - Time tracking
- **Quick Actions**
  - Search functionality
  - Time-based filters (7/30/90 days)
  - Share link generation
  - Direct navigation to details

### Verification Status
- **Candidate Cards**
  - Personal information display
  - Document verification progress
  - Status indicators (Verified/Pending/Flagged)
  - Interactive hover states
- **Detailed Modal View**
  - Comprehensive candidate information
  - Document status tracking
  - Verification progress indicator
  - Notes and remarks section
- **Document Management**
  - Multiple file type support
  - Status tracking per document
  - Verification workflow
  - Progress visualization

### Add Candidate
- **Form Sections**
  - Personal information
  - Document upload interface
  - Additional details
  - Status management
- **File Upload**
  - Drag-and-drop support
  - Multi-file handling
  - Type validation
  - Upload progress tracking

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bvc-dashboard.git
cd bvc-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **State Management**: React Context
- **Routing**: React Router

## 🎯 Key Design Principles

- **Modern UI/UX**: Implements a consistent 3D design language with smooth animations
- **Accessibility**: Maintains WCAG compliance with proper focus states and semantic HTML
- **Performance**: Utilizes hardware acceleration and optimized animations
- **Responsiveness**: Fully responsive design that works on all device sizes

## 🎨 Design System

### Visual Elements
- **Theme**: Dark mode with neumorphic 3D elements
- **Colors**: Primary gradient accents with transparent overlays
- **Shadows**: Dynamic shadows for depth and elevation
- **Corners**: Consistent rounded corners (rounded-xl)

### Animation Patterns
- **Transitions**: Smooth 300ms duration with easing
- **Hover Effects**: 
  - Primary buttons: Sliding gradient shine
  - Secondary elements: Vertical line indicators
  - Scale transforms: Limited to 1.02 for subtlety
- **3D Effects**: 
  - Subtle tilt animations (2-5 degrees)
  - Spring physics for natural motion
  - Hardware-accelerated transforms

### Interactive Components
- **Buttons**: 
  - Primary: Gradient background with shine effect
  - Secondary: Subtle hover indicators
  - Focus states with ring effects
- **Input Fields**: 
  - Clean borders with gradient transitions
  - Hover and focus state animations
- **Cards**: 
  - Neumorphic shadows
  - Hover lift effects
  - Content fade-ins

### Performance
- GPU-accelerated animations
- Progressive loading patterns
- Optimized spring animations
- Minimal rotation angles
- Staggered transitions

## 🔑 Authentication

Default test credentials:
- Username: `test`
- Password: `test`

## 📝 License

[MIT License](LICENSE)

## 🛠️ Development

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher

### Environment Setup
1. Create a `.env` file in the root directory:
```bash
REACT_APP_API_URL=http://localhost:3000
```

### Scripts
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

### Project Structure
```
src/
├── components/       # Reusable UI components
├── contexts/        # React context providers
├── pages/          # Page components
├── styles/         # Global styles and Tailwind config
└── utils/          # Helper functions and constants
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Follow the style guide:
   - Use the established design system
   - Maintain animation consistency
   - Follow performance guidelines
   - Add proper documentation
4. Commit your changes
```bash
git commit -m 'Add some amazing feature'
```
5. Push to the branch
```bash
git push origin feature/amazing-feature
```
6. Open a Pull Request

## 🐛 Bug Reports

Please report bugs by opening a new issue. Include:
- Browser and OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📫 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/bvc-dashboard](https://github.com/yourusername/bvc-dashboard)
