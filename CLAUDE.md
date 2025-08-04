- Use `bun` for package manager
- Use `bunx --bun shadcn@latest add <component>` to add new shadcn/ui component
- Use `bunx --bun <package/command>` instead of npx
- Use bash -c for cd
- NEVER try to run the project your self, ask the user to run

## Project Brief
this project is personal ui exploration project, this will be a playground for creating UI/UX, the UI is scoped in modules

## Project Structure

```
src/
├── pages/
│   ├── app/
│   │   └── App.tsx (homepage/public app)
│   └── modules/
│       ├── layout.tsx (modules layout wrapper)
│       ├── dashboard/
│       │   ├── dashboard.tsx
│       │   └── components/ (module spesific components)
│       │       ├── stats-cards.tsx
│       │       ├── top-places-card.tsx
│       │       └── recent-reviews-card.tsx
│       ├── places/
│       │   ├── places.tsx
│       │   └── components/
│       │       ├── places-table.tsx
│       │       ├── place-form.tsx
│       │       └── place-filters.tsx
├── components/ (globally used components)
│   └── ui/ (shadcn/ui components)
├── lib/ (helper functions)
│   ├── utils.ts
│   └── constants.ts
├── store/ (valtio stores)
│   ├── places-store.ts
├── services/ (external services)
├── hooks/ (custom hooks)
└── types/ (TypeScript types)
    └── index.ts
```

## Guidelines

- **pages/**: Feature-based organization. Each page has its own components folder for page-specific components
- **components/**: Only globally shared components (mainly shadcn/ui)
- **services/**: External API calls and integrations
- **store/**: Valtio state management
- **hooks/**: Custom React hooks
- **types/**: TypeScript type definitions
