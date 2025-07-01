import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import Home from './pages/Home';
import TestPage from './pages/Test';
import RootLayout from './pages/Root';
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/test', element: <TestPage /> },
      { path: '/404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;