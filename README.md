This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Approach & Architecture

### **Overview**
This project implements a **NASA Mars Rover simulation** using modern React/Next.js architecture with TypeScript. The application allows users to input rover commands and automatically processes them to determine final rover positions on a plateau.

### **Core Problem Solved**
The application simulates NASA's Mars Rover problem where:
- Multiple rovers are placed on a plateau grid
- Each rover receives movement commands (L=Left turn, R=Right turn, M=Move forward)
- Rovers must stay within plateau boundaries
- Final positions are calculated and displayed

### **Technical Architecture**

#### **1. Component-Based Design**
- **`Input` Component**: Reusable textarea with label support and controlled state
- **`Output` Component**: Displays processed results with placeholder states
- **`HomeSection` Component**: Main orchestrator combining input/output with business logic

#### **2. Separation of Concerns**
```
src/
├── components/          # Reusable UI components
├── pageComponents/      # Page-specific components with business logic
├── utils/              # Pure utility functions (debounce, etc.)
├── config/             # Constants and configuration
└── styles/             # SCSS modules and styling
```

#### **3. Type Safety & Constants**
- **TypeScript interfaces** for Position, Command, Direction types
- **Named constants** instead of magic numbers (DEBOUNCE_DELAY_MS, ERROR_MESSAGES)
- **Const assertions** for command validation arrays

#### **4. State Management**
- **Local React state** for output management
- **Debounced input processing** just because I thought it was cooler than having a CTA
- **Controlled components** for predictable data flow

### **Key Features Implemented**

#### **1. Debounced Input Processing**
- Automatically processes input after 2-second delay
- Prevents excessive processing during rapid typing
- Generic TypeScript implementation for reusability

#### **2. Rover Movement Logic**
- **Direction mapping**: N→W→S→E rotation system
- **Movement deltas**: Coordinate-based movement calculations
- **Boundary validation**: Prevents rovers from leaving plateau
- **Command validation**: Filters invalid commands gracefully

#### **3. Error Handling**
- **Input validation**: Checks for proper format and data types
- **Boundary checking**: Validates plateau coordinates and rover positions
- **Direction validation**: Ensures valid compass directions
- **User-friendly error messages**: Clear feedback for invalid inputs

#### **4. Testing Strategy**
- **Jest + React Testing Library** for component testing
- **User-centric tests** that simulate real user interactions
- **Async testing** with proper debounce timeout handling
- **Flexible text matching** using regex patterns for robustness

### **Code Quality Practices**

#### **1. No Magic Numbers**
- All constants extracted to configuration files
- Named constants for delays, error messages, and validation arrays
- Type-safe constant usage throughout the application

#### **2. Modular Styling**
- **SCSS modules** for component-scoped styling
- **Imported style variables** for consistency
- **Responsive design** considerations

### **Development Workflow**
1. **Component-first approach**: Built reusable components before business logic
2. **Incremental testing**: Added tests as features were implemented
3. **Type safety**: Used TypeScript throughout for better developer experience
4. **Error handling**: Implemented validation and error states


### **Time Taken**
- 5.5 Hours


