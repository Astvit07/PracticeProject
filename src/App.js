import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import { loadPage } from './utils/loadPage';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: loadPage('Home') },
      { path: '/test', element:loadPage ('Test') },
      { path: '/game', element: loadPage ('Game') },
      { path: '/404', element: loadPage ('NotFound') },
      { path: '*', element: <Navigate to="/404" replace /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
