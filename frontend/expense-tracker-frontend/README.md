# Ledgerly — Personal Expense Tracker (Frontend)

A React 19 + Vite + Material UI frontend for the Personal Expense Tracker Spring Boot API.

## Stack

React 19 · Vite · Material UI v7 · React Router DOM · React Hook Form · Axios · React Toastify · Recharts · JWT auth via Context API

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` and talks to the backend at the URL configured in `.env`:

```
VITE_API_BASE_URL=http://localhost:8084
```

## Backend CORS — required, one-time change

The backend already has every endpoint this app needs (per your `api-docs.pdf` / OpenAPI spec) — nothing about the API contracts changes. The **only** backend change needed is enabling CORS so the browser (running on `localhost:5173`) is allowed to call the API (running on `localhost:8084`). This is a Spring Security configuration addition, not a change to any controller, service, or business logic.

Add a CORS configuration bean, e.g. in your `SecurityConfig`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

Then wire it into your `SecurityFilterChain`:

```java
http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
    // ...rest of your existing security config
```

If you're using `@CrossOrigin` annotations on controllers instead, add `@CrossOrigin(origins = "http://localhost:5173")` to each `@RestController` — but the `SecurityConfig` bean above is the cleaner single-point fix if Spring Security is managing the filter chain (which it is here, per Brain.md).

## Project structure

```
src/
  components/   layout, common, cards, tables, dialogs
  pages/        auth, dashboard, category, expense, income, budget, profile, error
  services/     one file per API resource (axios calls only)
  context/      AuthContext, ColorModeContext
  hooks/        useAuth
  routes/       ProtectedRoute, AppRoutes
  theme/        MUI theme tokens
  utils/        formatters, JWT decode
```

## Notes on API coverage

Built directly against the OpenAPI spec you provided. Two honest gaps worth knowing about:

- **Budgets**: the API only exposes "get current month" and "create-or-update" — there's no list-all or delete endpoint, so the Budget page manages a single current-month record rather than a full CRUD list.
- **Categories**: the API has no `/page` or `/search` endpoint (unlike Expenses and Income), so search and pagination on the Categories page are done client-side against the full category list.
- **Profile**: there's no `/api/users` update or change-password endpoint in the spec. The Profile page's forms are fully built and validated, but submitting them shows a note that a backend endpoint needs to be added — they're wired and ready to connect once one exists.

## Build

```bash
npm run build
npm run preview
```
