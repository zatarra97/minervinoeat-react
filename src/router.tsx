import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RestaurantDetail from './Pages/RestaurantDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/restaurant/:id',
    element: <RestaurantDetail />,
  },
]); 