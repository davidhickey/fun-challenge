# Token Swap

A modern web application for token swapping built with Next.js, React, and TypeScript.

## Design Choices

- using Uniswap UI as a reference for the design
- maintaining a seperation of concerns between the frontend and the backend by using React custom hooks and Next.js API routes to fetch data from the Funkit API.
- leveraging tanstack query for state management and caching of data
- utilizing shadcn ui for the design system instead of handrolling components
- using a debounce function to prevent unnecessary re-renders and API calls when the user is typing in the input field
- error and validation states for failed API calls and invalid input

## If I had more time...

 - create an input for token amount to swap
 - create a button that reverses the sell and buy tokens
 - use a library for crypto currency icons
 - implement logic that factors in cost of gas for the swap


## Features

- Modern UI built with React, Shadcn, and Tailwind CSS
- Type-safe development with TypeScript
- Efficient state management with React Query
- Responsive design with Shadcn UI components
- Blockchain API integration with Funkit

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: React, TypeScript
- **UI Components**: 
  - Shadcn UI
  - Tailwind CSS
- **State Management**: TanStack React Query
- **API**: Funkit API within Next.js API routes
- **Blockchain**: Funkit
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd token-swap
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Project Structure

```
token-swap/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── lib/             # Utility functions and shared logic
├── public/          # Static assets
└── ...
```

## Development

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Next.js for server-side rendering and routing
