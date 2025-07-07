import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import Home from './pages/Home';
import TestPage from './pages/Test';
import RootLayout from './pages/Root';
import NotFound from "./pages/NotFound";
import Game from "./pages/Game";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      // {path: '/', element: <Home/>},
      {path: '/', element: import('./pages/Home').then(module => <module.default/>)},
      //1. todo Винести імпорт сторінок в функцію
      {path: '/test', element: <TestPage/>},
      {path: '/game', element: <Game/>},
      {path: '/404', element: <NotFound/>},
      {path: '*', element: <Navigate to="/404" replace/>},
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
