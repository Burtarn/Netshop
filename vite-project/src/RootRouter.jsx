import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Spinner from './components/Spinner/Spinner'
import Footer from './components/Footer/Footer';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Cart = lazy(() => import('./pages/Cart') )
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/products', element: <Products /> },
    { path: '/services', element: <Services /> },
    { path: '/contact', element: <Contact /> },
    { path: '/cart', element: <Cart /> },
    { path: '/login', element: isAuthenticated ? <Navigate to="/profile" /> : <Login setIsAuthenticated={setIsAuthenticated} /> },
    { path: '/profile', element: <ProtectedRoute isAuthenticated={isAuthenticated}><Profile /></ProtectedRoute> },
  ];

  return (
    <Suspense fallback={<div> < Spinner /> </div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const RootRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
        < Footer />
      </Router>
    </AuthProvider>
  );
};

export default RootRouter;