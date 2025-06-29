# Kalluba - Digital Assets Marketplace

## Overview

Kalluba is a modern digital marketplace application built for trading premium accounts, subscriptions, gift cards, and software licenses. The application features a full-stack architecture with a React frontend, Express backend, PostgreSQL database, and Replit authentication integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with proper error handling

### Database Architecture
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Connection pooling for optimal performance

## Key Components

### Authentication System
- Replit Auth integration for secure user authentication
- Session-based authentication with PostgreSQL session store
- User profile management with marketplace-specific fields
- Protected routes and API endpoints

### Database Schema
- **Users**: Core user data with marketplace metrics (wallet balance, ratings, sales history)
- **Categories**: Product categorization system
- **Listings**: Digital asset listings with pricing and metadata
- **Orders**: Transaction management with status tracking
- **Wallet Transactions**: Financial transaction history
- **Reviews**: User rating and review system
- **Sessions**: Authentication session storage

### UI/UX Design
- Dark theme with custom Kalluba brand colors (navy, gold, blue)
- Responsive design for mobile and desktop
- Component-based architecture using shadcn/ui
- Custom gradient designs and animations
- Accessibility-compliant components

### API Structure
- RESTful endpoints for all major operations
- Authentication middleware for protected routes
- Proper error handling and status codes
- JSON request/response format
- Rate limiting and security headers

## Data Flow

1. **User Authentication**: Users authenticate via Replit Auth, creating sessions stored in PostgreSQL
2. **Marketplace Browsing**: Frontend fetches listings data via API endpoints
3. **Transaction Processing**: Orders are created and managed through the database with status tracking
4. **Wallet Management**: Financial transactions are recorded and wallet balances updated
5. **Real-time Updates**: TanStack Query manages cache invalidation and data synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **express**: Web framework
- **passport**: Authentication middleware

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **tsx**: TypeScript execution
- **esbuild**: Production bundling

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- tsx for backend development with auto-restart
- Environment variable configuration
- Replit-specific development tooling

### Production
- Vite build for optimized frontend bundle
- esbuild for backend bundling
- Static file serving via Express
- Environment-based configuration

### Database
- Neon PostgreSQL for serverless scaling
- Drizzle migrations for schema management
- Connection pooling for performance
- Backup and recovery strategies

## Changelog

Changelog:
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.