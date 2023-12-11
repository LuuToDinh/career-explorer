import { Navigate, useRoutes } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginCandidatePage from './pages/auth/LoginCandidatePage';
import LoginAdminPage from './pages/auth/LoginAdminAuthPage';
import Page404 from './pages/dashboard/Page404';
import RecruimentPage from './pages/dashboard/RecruitmentPage';
import ManageAccount from './pages/dashboard/ManageAccount/ManageAccount';
import ManageAccountAdd from './pages/dashboard/ManageAccount/ManageAccountAdd';
import ManageDetail from './pages/dashboard/ManageAccount/ManageDetail';
import InterviewersPage from './pages/dashboard/InterviewerPage';
import Event from './pages/dashboard/EventPage/Event';
import EventDetail from './pages/dashboard/EventPage/EventDetail';
import EventAdd from './pages/dashboard/EventPage/EventAdd';
import EventEdit from './pages/dashboard/EventPage/EventEdit';

import InterviewListPage from './pages/interviewer/interviewListPage';
import InterviewInforCandidate from './pages/interviewer/inforCandidate';
import InterviewQuestion from './pages/interviewer/ManageQuestion';

import RecruitmentDetail from './pages/dashboard/Recruitments/RecruitmentDetail';
import RecruitmentCreatePage from './pages/dashboard/Recruitments/RecruitmentCreate';
import RecruitmentEdit from './pages/dashboard/Recruitments/RecruitmentEdit';
import JobFinding from './pages/candidate/JobFinding';
import BlackList from './pages/dashboard/BlackList/BlackList';
import BlackListCreate from './pages/dashboard/BlackList/BlackListCreate';
import BlackListDetail from './pages/dashboard/BlackList/BlackListDetail';
import Home from './pages/candidate/HomePage';
import AboutUs from './pages/candidate/AboutUs';

import InterviewerDetail from './pages/dashboard/Interviewer/InterviewerDetail';
import CandidateListPage from './pages/dashboard/CandidateListPage';
import CandidateDetail from './pages/dashboard/CandidateList/CandidateDetail';
import CandidateResult from './pages/dashboard/CandidateList/CandidateResult';
import CandidateSchedule from './pages/dashboard/CandidateList/CandidateSchedule';
import CalendarPage from './pages/dashboard/CalendarPage';
import Dashboard from './pages/dashboard/Dashboard';
import History from './pages/candidate/History';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPassPage from './pages/auth/ForgotPassPage';
import SecurityCode from './pages/auth/SecurityCodePage';
import { storage } from './services/storage';
import InterviewerMark from './pages/interviewer/InterviewerMark';
import CandidateLayout from './layouts/candidate/CandidateLayout';
import InterviewerLayout from './layouts/interviewer/InterviewerLayout';
import Profile from './pages/dashboard/Profile';
import EventCandidate from './pages/candidate/Event/Event';
import EventDetailCandidate from './pages/candidate/Event/EventDetail';
import { decodeJwt } from './utils/deCode';
import CandidateInfo from './pages/candidate/CandidateInfo';
import ProfileEdit from './pages/dashboard/ProfileEdit';
import CandidateProfileEdit from './pages/candidate/ProfileEdit/ProfileEdit';
import JobDetail from './pages/candidate/JobDetail';
import ChangePass from './pages/dashboard/ChangePass';
import ManageCv from './pages/candidate/ManageCv/ManageCv';

export default function Router() {
  const token = storage.getCache('access_token');
  const isLogin = Boolean(token);

  const [role, setRole] = useState(() => {
    if (token) {
      const { Roles } = decodeJwt(token);
      return Roles[0];
    }
    return null;
  });

  const setRoleFromToken = useCallback(() => {
    if (token) {
      const { Roles } = decodeJwt(token);
      setRole(Roles[0]);
    } else {
      setRole(null);
    }
  }, [token]);

  useEffect(() => {
    setRoleFromToken();
  }, [setRoleFromToken]);

  console.log(role);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element:
        (role === 'ADMIN' || role === 'RECRUITMENTER') && isLogin ? (
          <DashboardLayout />
        ) : role !== 'candidate' ? (
          <LoginAdminPage />
        ) : (
          <Navigate to="/candidate/home" />
        ),
      children: [
        { path: 'app', element: <Dashboard /> },
        { element: <Navigate to="/dashboard/app" />, index: true },
        {
          path: 'recruitment',
          children: [
            {
              path: '',
              element: <RecruimentPage />,
            },
            {
              path: 'detail/:id',
              element: <RecruitmentDetail />,
            },
            {
              path: 'edit/:id?',
              element: <RecruitmentEdit />,
            },
            {
              path: 'create',
              element: <RecruitmentCreatePage />,
            },
          ],
        },
        {
          path: 'candidatelists',
          children: [
            { path: '', element: <CandidateListPage /> },
            { path: 'detail/:id', element: <CandidateDetail /> },
            { path: 'schedule/:id', element: <CandidateSchedule /> },
            { path: 'result/:id', element: <CandidateResult /> },
          ],
        },
        {
          path: 'blacklists',
          children: [
            { path: '', element: <BlackList /> },
            { path: 'create', element: <BlackListCreate /> },
            { path: 'detail/:id', element: <BlackListDetail /> },
          ],
        },
        {
          path: 'interviewers',
          element: <InterviewersPage />,
          children: [{ path: 'detail/:id', element: <InterviewerDetail /> }],
        },

        {
          path: 'accounts',
          element: role === 'RECRUITMENTER' ? <Navigate to="/dashboard/404" /> : <ManageAccount />,
          children: [
            { path: 'create', element: <ManageAccountAdd /> },
            { path: 'detail/:id', element: <ManageDetail /> },
          ],
        },
        {
          path: 'event',

          children: [
            { path: '', element: <Event /> },
            { path: 'create', element: <EventAdd /> },
            { path: 'detail/:id', element: <EventDetail /> },
            { path: 'edit/:id', element: <EventEdit /> },
          ],
        },
        {
          path: 'changepass',
          element: <ChangePass />,
        },
        {
          path: 'profile',
          children: [
            { path: '', element: <Profile /> },
            { path: 'edit', element: <ProfileEdit /> },
          ],
        },
      ],
    },

    {
      path: '/candidate',
      element: <CandidateLayout />,
      children: [
        { path: 'home', element: <Home /> },
        { element: <Navigate to="/candidate/home" />, index: true },
        {
          path: 'aboutus',
          element: <AboutUs />,
        },
        {
          path: 'history',
          element: <History />,
        },
        {
          path: 'managecv',
          element: <ManageCv />,
        },
        {
          path: 'jobFinding',
          element: <JobFinding />,
        },
        {
          path: 'jobDetail/:id',
          element: <JobDetail />,
        },

        {
          path: 'event',
          element: <EventCandidate />,
          children: [
            {
              path: 'detail/:id',
              element: <EventDetailCandidate />,
            },
          ],
        },
        {
          path: 'profile',
          element: <CandidateInfo />,
        },
        { path: 'profileEdit', element: <CandidateProfileEdit /> },
        {
          path: 'login',
          element:
            role === 'ADMIN' || (role === 'CANDIDATE' && isLogin) ? (
              <Navigate to="/candidate/home" />
            ) : (
              <LoginCandidatePage />
            ),
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'forgotpass',
          element: <ForgotPassPage />,
        },
        {
          path: 'security',
          element: <SecurityCode />,
        },
        {
          path: 'changepass',
          element: <ChangePass />,
        },
      ],
    },

    {
      path: '/interviewer',
      element: role === 'INTERVIEWER' && isLogin ? <InterviewerLayout /> : <LoginAdminPage />,
      children: [
        {
          path: 'list',
          element: <InterviewListPage />,
          children: [{ path: 'detail/:id', element: <InterviewInforCandidate /> }],
        },
        { element: <Navigate to="/interviewer/list" />, index: true },
        {
          path: 'mark/:interviewId/:cvApplyId',
          element: <InterviewerMark />,
        },
        {
          path: 'question',
          element: <InterviewQuestion />,
        },
        {
          path: 'schedule',
          element: <CalendarPage />,
        },
        {
          path: 'profile',
          children: [
            { path: '', element: <Profile /> },
            { path: 'edit', element: <ProfileEdit /> },
          ],
        },
        {
          path: 'changepass',
          element: <ChangePass />,
        },
      ],
    },
    {
      path: '/',
      element: (
        <>
          {isLogin && (role === 'ADMIN' || role === 'RECRUITMENTER') && <Navigate to="/dashboard/app" replace />}
          {isLogin && role === 'CANDIDATE' && <Navigate to="/candidate/home" replace />}
          {isLogin && role === 'INTERVIEWER' && <Navigate to="/interviewer/list" replace />}
          {!isLogin && <Navigate to="/candidate/home" />}
        </>
      ),
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);

  return routes;
}
