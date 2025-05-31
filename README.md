# ZenithFlix – Streaming Platform UI (Test Task)

This project implements the core interface of a fictional streaming platform called **ZenithFlix**, built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/zenithflix.git
cd zenithflix
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Run tests

```bash
npm test
```

---

## 🧱 Architectural Decisions

- **Next.js (App Router)** is used for routing and modern React conventions (Server Components, Client Components).
- **Tailwind CSS** is used for styling with a focus on dark theme, utility-first design, and responsiveness.
- **TypeScript** ensures strict typing throughout the app; no `any` types are used.
- **Component architecture** is modular, with reusable components like `ContentCard` and `ContentModal`.
- **Context API** is used to manage user watch history (`WatchHistoryContext`) without backend storage.
- **Custom hooks** like `useTrendingContent` and `useWatchHistory` encapsulate logic and improve reusability.
- **Accessibility**: All modals include ARIA labels, keyboard navigation (`Escape` to close, focusable buttons), and screen reader support.
- **Performance**: Used `React.memo`, `useCallback`, and minimized re-renders for performant UI updates.

---

## 🤔 Assumptions

- Content data (Trending and Watch History) is mocked; no external API like TMDB is called.
- Watch history is managed in-memory (could be extended to localStorage or persisted via backend).
- User authentication is not in scope.
- Mobile responsiveness and accessibility are treated as priorities.
- English is used as the only supported locale.

---

## 🧪 Testing

- Unit tests are written using **Jest** and **React Testing Library**.
- Coverage includes interaction, modal behavior, and user actions.
- `jest.setup.ts` includes `@testing-library/jest-dom` for extended assertions.

---

## 📄 License

This project is intended for evaluation purposes only and is not licensed for commercial use.
