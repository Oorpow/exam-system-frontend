import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Login from './pages/Login'
import ExamList from './pages/ExamList'
import { Edit } from './pages/Edit'
import Exam from './pages/Exam'
import Score from './pages/Score'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>home</div>,
  },
  {
    path: '/login',
    element: <Login />
  },
  // 考卷列表
  {
    path: '/exams',
    element: <ExamList />
  },
  // 考试页
  {
    path: '/exam/:id',
    element: <Exam />
  },
  // 编辑页
  {
    path: '/edit/:examId',
    element: <Edit />
  },
  // 成绩页
  {
    path: '/score/:id',
    element: <Score />
  }
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<DndProvider backend={HTML5Backend}>
  <RouterProvider router={router} />
</DndProvider>)
