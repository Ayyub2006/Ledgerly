import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const CategoryPage = lazy(() => import('../pages/category/CategoryPage'));
const ExpensePage = lazy(() => import('../pages/expense/ExpensePage'));
const IncomePage = lazy(() => import('../pages/income/IncomePage'));
const BudgetPage = lazy(() => import('../pages/budget/BudgetPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const NotFound = lazy(() => import('../pages/error/NotFound'));

const withSuspense = (Element) => (
  <Suspense fallback={<LoadingSpinner label="Loading…" minHeight="100vh" />}>{Element}</Suspense>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/login" element={withSuspense(<Login />)} />
    <Route path="/register" element={withSuspense(<Register />)} />

    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={withSuspense(<Dashboard />)} />
        <Route path="/categories" element={withSuspense(<CategoryPage />)} />
        <Route path="/expenses" element={withSuspense(<ExpensePage />)} />
        <Route path="/income" element={withSuspense(<IncomePage />)} />
        <Route path="/budget" element={withSuspense(<BudgetPage />)} />
        <Route path="/profile" element={withSuspense(<ProfilePage />)} />
      </Route>
    </Route>

    <Route path="*" element={withSuspense(<NotFound />)} />
  </Routes>
);

export default AppRoutes;
