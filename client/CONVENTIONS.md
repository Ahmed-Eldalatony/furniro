# React + TypeScript Project Conventions

## 11. Project Structure

The React project will also follow a modular, feature-based structure within the `src` directory.

```
.
├── .env                # Environment variables (local, not committed)
├── .env.example        # Example environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts      # Vite configuration (or webpack.config.js for Webpack)
├── src
│   ├── __mocks__       # Manual mocks for testing
│   ├── api             # Base API client setup (e.g., Axios instance)
│   ├── assets          # Static assets (images, fonts, etc.)
│   ├── components      # Reusable UI components (agnostic of features)
│   │   ├── Button
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── common      # More generic components (e.g., Loader, Modal)
│   ├── config          # Application configuration (e.g., API base URL)
│   ├── features        # Feature-specific code (pages, components, services, repositories)
│   │   ├── auth        # Example Feature: Authentication
│   │   │   ├── components    # Feature-specific components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks         # Feature-specific custom hooks
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── index.ts
│   │   │   ├── pages         # Pages (often composed of components and hooks)
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── repositories  # Data access logic for this feature
│   │   │   │   ├── auth.repository.ts
│   │   │   │   └── index.ts
│   │   │   ├── services      # Business logic for this feature
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── types         # Feature-specific types and interfaces
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts      # Barrel file for the auth feature
│   │   └── user        # Another Example Feature: User Management
│   │       ├── components
│   │       ├── hooks
│   │       ├── pages
│   │       ├── repositories
│   │       ├── services
│   │       └── types
│   ├── hooks          # Generic reusable hooks (e.g., useDebounce)
│   ├── layout        # Application layout components (e.g., Header, Footer, Sidebar)
│   ├── providers     # React Context providers (e.g., AuthProvider, ServiceProvider)
│   ├── routes        # React Router configuration
│   ├── store         # Global state management (e.g., Redux, Zustand, Jotai)
│   ├── types         # Global or shared TypeScript type definitions and interfaces
│   ├── utils         # Utility functions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point (renders App)
```

**Key Principles for Structure:**

* **Feature-Based:** The primary organizing principle is by feature (`src/features`). Each feature directory contains all the code related to that specific functionality (components, hooks, services, repositories, pages, types).
* **Separation of Concerns (Component -> Hook -> Service -> Repository):**
    * **Components:** Responsible for rendering UI based on props and state. They should be kept as "dumb" as possible, focusing on presentation.
    * **Hooks:** Encapsulate component logic, state management, and side effects (like data fetching). Feature-specific hooks live within the feature, while generic hooks live in `src/hooks`.
    * **Services:** Contain the core business logic for a feature. They orchestrate interactions, often calling repositories. Services should not directly interact with React state or components.
    * **Repositories:** Encapsulate data access logic, abstracting the API calls away from services. They are responsible for fetching and potentially transforming raw data from the backend.
* **Reusable Components:** Components in `src/components` are generic UI elements that can be used across different features.
* **Pages:** Components that represent a full page in the application, typically residing within a feature folder (`src/features/[feature-name]/pages`). They often compose feature-specific components and hooks.
* **Co-location of Tests:** Tests (`.test.tsx`, `.test.ts`) should be co-located with the files they test.
* **Barrel Files (`index.ts`):** Use `index.ts` files within directories to re-export entities for cleaner imports.

## 12. Naming Conventions

* **Folders:** `kebab-case` (e.g., `user-profiles`, `__tests__`).
* **Files:**
    * React Components: `PascalCase.tsx` (e.g., `LoginForm.tsx`).
    * Hooks: `useCamelCase.ts` (e.g., `useLogin.ts`).
    * Services: `camelCase.service.ts` (e.g., `auth.service.ts`).
    * Repositories: `camelCase.repository.ts` (e.g., `auth.repository.ts`).
    * Types/Interfaces: `camelCase.types.ts` or `ICamelCase.ts` (e.g., `auth.types.ts`, `IAuthService.ts`).
    * Test files: `name.test.ts` or `name.test.tsx` (e.g., `auth.service.test.ts`, `LoginForm.test.tsx`).
    * Other files: `camelCase.ts` or `kebab-case.ts`. Be consistent within a directory.
* **Components & Hooks:** `PascalCase` for components, `camelCase` prefixed with `use` for hooks.
* **Variables & Functions:** `camelCase`.
* **Constants:** `UPPER_SNAKE_CASE`.
* **Interfaces & Types:** `PascalCase` (often prefixed with `I` for interfaces, e.g., `IAuthService`).

## 13. TypeScript Best Practices

* **Strict Mode:** Enable all strict options in `tsconfig.json` (`"strict": true`).
* **Explicit Types:**
    * Always define prop types for React components using Interfaces or Types.
    * Define return types for functions, especially in services and repositories.
    * Use interfaces or types for API response shapes and data structures.
* **`interface` vs `type`:**
    * Prefer `interface` for defining object shapes and for public APIs that can be extended.
    * Use `type` for utility types, union types, intersection types, or aliasing primitive types.
* **Avoid `any`:** Use `unknown` when the type is truly unknown and perform type checking before use. Use specific types whenever possible.
* **Readonly:** Use `readonly` for properties that should not be reassigned.
* **Enums:** Use string enums or `as const` objects.
* **Modules:** Use ES Modules (`import`/`export`).
* **Path Aliases:** Configure path aliases in `tsconfig.json` for cleaner imports (e.g., `@/*` pointing to `src/*`).

## 14. React Best Practices

* **Functional Components and Hooks:** Prefer functional components with Hooks over class components.
* **Props:** Use prop types (TypeScript interfaces/types) to define the expected props for components. Destructure props at the top of the component.
* **State Management:** Choose a state management solution based on project needs (e.g., React Context for simple global state, Zustand, Jotai, or Redux for more complex state). Centralize global state in `src/store`. Feature-specific local state should be managed within components or feature hooks.
* **Data Fetching:**
    * Perform data fetching logic within custom hooks (often feature-specific hooks like `useFetchUser`).
    * These hooks should interact with the Service layer, which in turn interacts with the Repository layer.
    * Consider using a library like `React Query` or `SWR` for caching, revalidation, and managing asynchronous data flow. These libraries can integrate well with your Service/Repository pattern.
* **Error Handling:**
    * Handle API errors within the Repository layer and propagate them as custom error types.
    * Handle errors from services in the hooks or components, providing user feedback.
    * Use Error Boundaries for catching rendering errors.
* **Forms:** Use a form library like `React Hook Form` or `Formik` for managing form state, validation, and submission.
* **Routing:** Use `React Router` for defining application routes in `src/routes`.
* **Component Composition:** Favor composition over inheritance. Build complex UIs by composing smaller, simpler components.
* **Avoid Prop Drilling:** Use React Context or a state management library to avoid passing props down many levels.
* **Keys in Lists:** Always provide unique `key` props when rendering lists of elements.

## 15. Service and Repository Layers in React

Aligning with the backend, the frontend will have distinct Service and Repository layers.

### Repositories

* Located in `src/features/[feature-name]/repositories/`.
* Responsible for making API calls using a configured API client (e.g., Axios instance from `src/api`).
* Translate raw API responses into the application's domain models/types.
* Do not contain business logic or interact with React state.
* Sufix repository files with `.repository.ts`.
* Example:

```typescript
// src/features/auth/repositories/auth.repository.ts
import { api } from '@/api'; // Your configured Axios instance or fetch wrapper
import { LoginCredentials, AuthTokens } from '../types/auth.types';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  // other auth related data access methods
}

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await api.post<AuthTokens>('/auth/login', credentials);
    return response.data;
  }

  // implement other methods
}
```

### Services

* Located in `src/features/[feature-name]/services/`.
* Contain the business logic for a feature.
* Interact with one or more repositories to fetch or mutate data.
* Can perform data transformations or orchestrate multiple repository calls.
* Do not interact directly with API calls or React state.
* Sufix service files with `.service.ts`.
* Example:

```typescript
// src/features/auth/services/auth.service.ts
import { IAuthRepository } from '../repositories/auth.repository';
import { LoginCredentials, AuthTokens } from '../types/auth.types';

export interface IAuthService {
  authenticate(credentials: LoginCredentials): Promise<AuthTokens>;
  // other auth related business logic methods
}

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async authenticate(credentials: LoginCredentials): Promise<AuthTokens> {
    // Add any business logic here before calling the repository
    // e.g., validate credentials format (though DTOs handle this on backend)
    const tokens = await this.authRepository.login(credentials);
    // Add any business logic here after getting tokens
    // e.g., store tokens in local storage
    return tokens;
  }

  // implement other methods
}
```

## 16. Dependency Injection (DI)

Similar to the backend, dependency injection is crucial for decoupling and testability. In React, DI can be achieved through various means:

* **Manual DI (Constructor Injection):** Pass dependencies (like repository instances to services) via constructors. This is suitable for simple cases and testing.
    ```typescript
    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository);
    ```
* **React Context:** Use React Context to provide instances of services or repositories down the component tree. This is a common pattern for providing dependencies to components or hooks without prop drilling. Create providers in `src/providers/`.
    ```typescript
    // src/providers/ServiceProvider.tsx
    import React, { createContext, useContext } from 'react';
    import { AuthRepository } from '@/features/auth/repositories/auth.repository';
    import { AuthService } from '@/features/auth/services/auth.service';

    interface IServicesContext {
      authService: AuthService;
      // Add other services here
    }

    const ServiceContext = createContext<IServicesContext | undefined>(undefined);

    export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      // Instantiate repositories and services here
      const authRepository = new AuthRepository();
      const authService = new AuthService(authRepository);

      const services: IServicesContext = {
        authService,
        // Initialize other services
      };

      return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
    };

    export const useServices = () => {
      const context = useContext(ServiceContext);
      if (context === undefined) {
        throw new Error('useServices must be used within a ServiceProvider');
      }
      return context;
    };

    // In App.tsx or a root component:
    // <ServiceProvider>
    //   <App />
    // </ServiceProvider>

    // In a hook or component:
    // const { authService } = useServices();
    // authService.authenticate(...)
    ```
* **Custom Hooks:** Custom hooks can encapsulate the retrieval of dependencies and the execution of logic, effectively acting as injectors for components.
* **Libraries:** For larger applications, consider dedicated DI libraries (though they might add complexity).

**Convention:** Prefer using React Context (`ServiceProvider`) to provide service instances to hooks and components. Instantiate repositories and services at a higher level in the application tree (e.g., within the `ServiceProvider`).

## 17. Testing

* **Libraries:** Use `@testing-library/react` for testing components and `jest` or `vitest` for running tests and testing non-React code (services, repositories, hooks).
* **File Naming:** `*.test.ts` or `*.test.tsx`. Co-locate tests with the code they test.
* **Unit Tests:**
    * Test individual functions, services, repositories, and hooks in isolation.
    * Mock dependencies (e.g., mock repository methods when testing a service, mock API calls when testing a repository).
* **Component Tests:**
    * Test React components from the user's perspective using `@testing-library/react`.
    * Focus on component behavior and output given different props and user interactions.
    * Mock or provide necessary context and dependencies (e.g., using testing providers or by mocking hooks that consume services).
* **Integration Tests:**
    * Test the interaction between components and hooks, or between hooks and services/repositories.
* **End-to-End (E2E) Tests:** Use libraries like Cypress or Playwright to test the application flow from the user's perspective in a real browser.

## 18. Linting and Formatting

* Use Biome for linting and formatting React and TypeScript code, configured via `biome.json`.
* Include recommended configurations for React and TypeScript.

## 19. State Management Conventions

* **Global State:** Use the chosen global state management library for application-wide state (e.g., user authentication status, theme settings). Define actions/mutations and selectors clearly.
* **Feature State:** Manage state specific to a feature within that feature's directory, often using `useState`, `useReducer`, or feature-specific hooks.
* **Component State:** Use `useState` or `useReducer` for state that is local to a single component and doesn't need to be shared.

## 20. API Communication

* Centralize API client setup (e.g., Axios instance with interceptors for error handling, authentication tokens) in `src/api/`.
* All HTTP requests should originate from the Repository layer, using this centralized API client.

These conventions aim to bring a similar level of structure, testability, and separation of concerns to your React frontend as you have established in your Express.js backend, facilitating maintainability and scalability.
