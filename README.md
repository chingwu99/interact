# Interact

A modern social media platform that enables users to share thoughts, build connections, and interact with others. Built with [Next.js](https://nextjs.org/) for a seamless user experience.

## Tech Stack

- **Framework**: Next.js 15.1.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **API Requests**: Next.js fetch, Axios
- **UI Components**: React Icons, React Spinners
- **Notifications**: React Hot Toast
- **File Upload**: React Dropzone

## Getting Started

### Prerequisites

- Node.js >= 22.12.0
- pnpm (recommended) or npm or yarn

### Installation

```bash
# Using pnpm
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### Development

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build

```bash
pnpm build
# or
npm run build
# or
yarn build
```

### Production

```bash
pnpm start
# or
npm run start
# or
yarn start
```

## Project Structure

```
├── action/         # Server Actions
├── api/           # API Routes
├── app/           # Next.js App Directory
├── components/    # React Components
├── hooks/         # Custom React Hooks
├── providers/     # React Context Providers
├── public/        # Static Assets
├── services/      # API Services
├── type/          # TypeScript Types
└── utils/         # Utility Functions
```

## Development Tools

- **ESLint**: Code Quality
- **Prettier**: Code Formatting
- **Husky**: Git Hooks
- **lint-staged**: Pre-commit Code Checking

## Code Standards

This project uses ESLint and Prettier to ensure code quality. The following checks are automatically performed before committing:

- ESLint checks
- Prettier formatting

## Deployment

This project can be easily deployed to the [Vercel](https://vercel.com) platform.

## License

This is a private project. Unauthorized use is prohibited.
