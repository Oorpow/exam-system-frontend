import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom'
import Login from './pages/Login'
import ExamList from './pages/ExamList'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>home</div>,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/exams',
    element: <ExamList />
  }
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<RouterProvider router={router} />)
