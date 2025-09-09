# Health Management System

A comprehensive patient management system built with React, TypeScript, and modern web technologies.

### Prerequisites

- Node.js (version 14 or higher)
- "npm" or "yarn" package manager

### Installation & Setup

1. **Clone the repository**
   git clone git@github.com:abhishek-orion/health-management.git
   cd health-management

2. **Install dependencies**
   "npm install"

3. **Start the development server**
   "npm start"
   The application will be available at `http://localhost:1234`

### Build for Production

```bash
npm run build
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Demo Credentials

- **Admin User:** `admin@aisel.com` / `admin@123`
- **Regular User:** `user@aisel.com` / `user@123`

## Theming System

The application features a comprehensive theming system with light and dark mode support.

### Theme Features

- **Automatic Theme Detection**: Respects system preference (light/dark mode)
- **Manual Theme Toggle**: Users can manually switch between themes
- **Persistent Theme**: User preference is stored in localStorage
- **System Sync**: Automatically updates when system theme changes

### Color System

The theme uses a modern color palette with semantic naming:

- **Primary Colors**: Accessible blue palette for primary actions
- **Success Colors**: Green palette for positive feedback
- **Error Colors**: Red palette for errors and destructive actions  
- **Warning Colors**: Amber palette for warnings and alerts
- **Neutral Colors**: Grayscale palette for general UI elements

### Design Tokens

Centralized design tokens are available at `src/lib/design-tokens.ts`:

```typescript
import { spacing, borderRadius, elevation } from '@/lib/design-tokens';

// Usage in components
<div className={`${spacing.md} ${borderRadius.lg} ${elevation.raised}`}>
```

### CSS Variables

All theme values are available as CSS custom properties:

```css
.custom-component {
  background-color: var(--background);
  color: var(--foreground);
  border-color: var(--border);
}
```

## Reusable UI Components

The application includes a comprehensive component library built with accessibility and design consistency in mind.

### Core Components

#### Button Component
- **Variants**: neutral, primary, success, error, warning, outline, link
- **Sizes**: sm, default, lg, icon
- **Features**: Focus management, keyboard navigation, loading states

```tsx
<Button variant="primary" size="lg">
  Save Patient
</Button>
```

#### Modal Component
- **Sizes**: sm, md, lg, xl
- **Features**: Escape key handling, overlay click to close, focus trap
- **Accessibility**: ARIA labels, role attributes

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Edit Patient">
  {/* Modal content */}
</Modal>
```

#### Typography Component
- **Types**: h1-h6, p, span
- **Features**: Consistent styling, customizable colors
- **Font**: Inter typeface for optimal readability

```tsx
<Text type="h2" className="text-center">
  Patient Details
</Text>
```

### Form Components

- **Input**: Text inputs with validation states
- **Checkbox**: Accessible checkboxes with proper labeling  
- **Form**: Form wrapper with validation integration
- **Label**: Consistent form labels

### Data Display Components

- **Card**: Container component with elevation variants
- **Table**: Sortable, searchable data tables
- **Accordion**: Collapsible content sections
- **Avatar**: User profile images with fallbacks
- **Skeleton**: Loading state placeholders

### Navigation Components

- **Tabs**: Keyboard navigable tab interface
- **Pagination**: Page navigation with mobile support
- **Sidebar**: Collapsible navigation menu

### Feedback Components

- **LoadingSpinner**: Loading state indicators
- **Skeleton Components**: Content loading placeholders

## Error Handling

Comprehensive error handling system with multiple layers of error management.

### Error Boundary

Global error boundary catches JavaScript errors and provides user-friendly fallbacks:

```tsx
<ErrorBoundary fallback={<CustomErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

### HTTP Error Handling

Centralized error handling for API requests with `useErrorHandler` hook:

**Error Types Supported:**
- **401 Unauthorized**: Redirects to login
- **403 Forbidden**: Shows access denied message
- **404 Not Found**: Resource not found handling
- **500 Server Error**: Internal server error with retry options
- **Network Errors**: Connection issues with retry functionality
- **Timeout Errors**: Request timeout handling

```tsx
const { error, handleError, clearError } = useErrorHandler();

try {
  await apiCall();
} catch (err) {
  handleError(err, 'Failed to load patients');
}
```

### Error Display Components

Specialized error components for different error types:

- `UnauthorizedError`: Login required messages
- `ForbiddenError`: Access denied with contact options
- `NetworkError`: Connection issues with retry
- `ServerError`: Server problems with retry
- `NotFoundError`: Resource not found
- `GenericError`: Fallback for unknown errors

### HOC for Error Handling

`withErrorHandling` HOC wraps components with automatic error handling:

```tsx
const SafeComponent = withErrorHandling(YourComponent, {
  fallback: <ErrorFallback />,
  onError: (error) => console.error(error)
});
```

## Key Features

### Authentication & Authorization

- **JWT-based Authentication**: Secure token-based auth system
- **Role-based Access Control**: Admin and user roles
- **Protected Routes**: Route-level authentication guards
- **Session Management**: Automatic token refresh and logout
- **Persistent Sessions**: Optional "remember me" functionality

### Patient Management

- **CRUD Operations**: Create, read, update, delete patients
- **Advanced Search**: Search by name, email, phone, gender
- **Sorting & Filtering**: Multi-column sorting with ascending/descending order
- **Pagination**: Efficient data loading with pagination controls
- **Data Validation**: Form validation using Zod schemas

### API Simulation

Mock Service Worker (MSW) provides realistic API simulation:

- **RESTful Endpoints**: Full CRUD operations
- **Authentication Simulation**: Login/logout with token management
- **Data Persistence**: In-memory data store for development
- **Error Simulation**: Realistic error responses for testing

### Performance Optimizations

- **Code Splitting**: Lazy loading of route components
- **Component Lazy Loading**: On-demand component loading
- **React Suspense**: Loading states for async components
- **Efficient Re-renders**: Optimized state management

### Responsive Design

- **Mobile-First**: Responsive design with mobile considerations
- **Adaptive UI**: Components adapt to different screen sizes
- **Touch-Friendly**: Mobile-optimized interactions
- **Accessibility**: WCAG 2.1 AA compliance

### Development Tools

- **TypeScript**: Full type safety across the application
- **ESLint**: Code linting and formatting rules
- **Parcel**: Fast build tool and development server
- **PostCSS**: CSS processing and optimization

### State Management

- **React Context**: Centralized state management
- **Custom Hooks**: Reusable state logic
- **Local Storage**: Persistent user preferences
- **Form State**: React Hook Form integration

### Monitoring & Logging

- **Error Logging**: Comprehensive error tracking
- **Console Logging**: Development debugging tools
- **Performance Monitoring**: Component render tracking

## Project Structure

```
src/
   components/          # Reusable UI components
      ui/             # Base UI component library
      ErrorBoundary/  # Error handling components
      ErrorStates/    # Error display components
      ...             # Feature-specific components
   contexts/           # React context providers
      AuthContext/    # Authentication state
      ThemeContext/   # Theme management
      PatientContext/ # Patient data management
   hooks/              # Custom React hooks
   lib/                # Utility libraries
   mocks/              # MSW API mocking
   schemas/            # Validation schemas
   screens/            # Main application screens
   services/           # API service layer
   styles/             # Global styles and themes
   types/              # TypeScript type definitions
   utils/              # Helper utilities
```

## API Endpoints

The application uses MSW to simulate the following endpoints:

- `POST /api/login` - User authentication
- `POST /api/logout` - User logout
- `GET /api/patients` - Get patients list (with pagination/search)
- `GET /api/patients/:id` - Get specific patient
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient
