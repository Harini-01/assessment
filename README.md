# Genoshi Chat UI

A modern, responsive chat interface built with React and Tailwind CSS, featuring fluid animations and an intuitive design. This project demonstrates advanced React patterns, state management techniques, and modern UI/UX principles.

## Deployed website
https://chat-qlgeiiqjh-harinis-projects-d31e144a.vercel.app/

## 🎯 Core Features

### Chat Interface
- **Real-time Chat Simulation**
  - Typewriter effect for bot messages
  - Smooth message transitions
  - Message timestamps
  - Interactive message actions

### UI/UX Features
- **Responsive Design**
  - Mobile-first approach
  - Resizable sidebar (200px - 480px)
  - Collapsible navigation
  - Fluid animations

- **Theme System**
  - Dark/Light mode toggle
  - System preference detection
  - Persistent theme storage
  - Smooth theme transitions

- **Chat Management**
  - Multiple chat sessions
  - Chat history persistence
  - Delete conversation feature
  - Session switching

## 🛠 Technical Implementation

### Architecture
```
src/
├── components/            # UI Components
│   ├── ChatBubble        # Message display with animations
│   ├── ChatHistoryItem   # History management
│   ├── EmptyState        # Initial user guidance
│   ├── ResizeHandle      # Sidebar resize functionality
│   └── TypingBubble      # Loading indicators
├── contexts/             # Global State
│   └── ThemeContext      # Theme management
└── hooks/               # Custom Hooks
    └── useTypewriter    # Typing animation logic
```

### Key Technical Decisions

#### 1. State Management
- **Local State**: Used for ephemeral UI states
- **Context API**: Theme and global settings
- **Refs**: Performance-critical animations
```javascript
// Example of optimized state management
const [messages, setMessages] = useState([]);
const hasAnimatedRef = useRef(false);
const { theme, toggleTheme } = useTheme();
```

#### 2. Performance Optimizations
- React.memo for pure components
- useCallback for event handlers
- Virtualization for long chat histories
- Debounced resize handlers

#### 3. Animation Strategy
- Framer Motion for complex animations
- CSS transitions for simple effects
- RAF for performance-critical animations
- Optimized re-renders using refs

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

### Installation Steps

1. **Clone the Repository**
```bash
git clone <repository-url>
cd genoshi-chat
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Create .env file
cp .env.example .env

# Update environment variables if needed
```

4. **Start Development Server**
```bash
npm start
```

5. **Build for Production**
```bash
npm run build
```

The application will be available at `http://localhost:3000`

## 💡 Design Decisions

### Visual Design
- **Color Scheme**
  - Primary: Violet/Purple gradient (accessibility-friendly)
  - Secondary: Neutral grays for readability
  - Accent: Strategic use of gradients for hierarchy

- **Typography**
  - System fonts for performance
  - 16px base size for readability
  - 1.5 line height for comfortable reading

- **Layout**
  - Three-column responsive design
  - Flexible content areas
  - Mobile-first breakpoints

### Component Architecture
- **Atomic Design Principles**
- **Compound Components Pattern**
- **Render Props for Flexibility**

## 🔍 Code Quality

### Best Practices
- ESLint for code consistency
- Prettier for formatting
- TypeScript-like props validation
- Comprehensive error handling

### Testing Strategy
- Unit tests for utilities
- Integration tests for components
- E2E testing capability

## 🌟 Technical Highlights

1. **Custom Hooks**
   - useTypewriter for animations
   - useTheme for theme management
   - useChat for message handling

2. **Performance**
   - Optimized re-renders
   - Lazy loading
   - Code splitting
   - Asset optimization

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - High contrast mode
