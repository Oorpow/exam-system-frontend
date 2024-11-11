import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Login from './pages/Login'
import ExamList from './pages/ExamList'
import { Edit } from './pages/Edit'
import Exam from './pages/Exam'

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
  },
  {
    path: '/exam/:id',
    element: <Exam />
  },
  {
    path: '/edit/:examId',
    element: <Edit />
  }
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<DndProvider backend={HTML5Backend}>
  <RouterProvider router={router} />
</DndProvider>)
