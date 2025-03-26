# Legal Dashboard UI Challenge

A responsive dashboard for legal practice management built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.

## Project Overview

This project implements a legal practice management dashboard with the following key features:

- Case management with status tracking
- Document version control and management  
- Time tracking and billable hours
- Role-based access control
- Responsive desktop UI

### Core Features

- **Case Summary Widget**: Track active, pending and closed cases
- **Recent Documents Widget**: View and manage legal documents with versioning
- **Time Tracking Widget**: Monitor billable hours by attorney
- **Role-based Navigation**: Different menu items based on user role
- **User Profile Management**: Header with user profile dropdown

## Tech Stack

- Next.js with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Jest and React Testing Library for testing

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Test Credentials

Use these credentials to test different user roles in the application:

### Admin User
- Email: admin@legaltech.com
- Password: admin123

### Regular User
- Email: user@legaltech.com 
- Password: user123

## Project Structure

The project is organized into the following key directories:

- `src/app`: Contains the main application components
- `src/components`: Reusable React components
- `src/lib`: Utility functions and constants
- `src/store`: Redux store setup
- `src/types`: TypeScript type definitions

## Testing

The project includes unit tests using Jest and React Testing Library.

To run the tests:

```bash
npm test
```