/*eslint-disable*/
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '../../sections/@dashboard/app';

import { TableStack } from '../../components/@dashboard/table';
import { GetTotalInterviewAction, GetTotalInterviewTodayAction, GetTotalCVApplyAction, GetRatioCVApplyAction, GetAccessDayAction } from '../../redux/actions/ReportAction';
import { GetUserIdAction } from '../../redux/actions/UserAction';
import { storage } from '../../services/storage';
import { decodeJwt } from '../../utils/deCode';

export default function Dashboard() {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const token = storage.getCache('access_token');
  const { UserId } = decodeJwt(token);

  const dispatch = useDispatch();
  const totalInterview = useSelector((state) => state.report.totalInterview);
  const totalInterviewToday = useSelector((state) => state.report.totalInterviewToday);
  const totalCVApply = useSelector((state) => state.report.totalCVApply);
  const ratioCVApply = useSelector((state) => state.report.ratioCVApply);
  const accessDay = useSelector((state) => state.report.accessDay);
  const profile = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(GetTotalInterviewAction());
    dispatch(GetTotalInterviewTodayAction());
    dispatch(GetTotalCVApplyAction());
    dispatch(GetRatioCVApplyAction());
    dispatch(GetAccessDayAction());
    dispatch(GetUserIdAction(UserId));
  }, []);

  const { failed, pass, wait_interview } = ratioCVApply
  const { fullName } = profile
  const { dateList, accessList } = accessDay

  return (
    <>
      {location.pathname !== '/dashboard/app' ? (<Outlet />) :
        (
          <>
            <Helmet>
              <title> {t("homepage")} </title>
            </Helmet>

            <Container maxWidth="xl">
              <TableStack nameStack={`${t("hello")}, ${fullName}!`} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <AppWidgetSummary title={t("allCan")} total={totalCVApply !== 0 ? totalCVApply : '0'} color={'secondary'} icon={'mdi:account'} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <AppWidgetSummary title={t("allInterview")} total={totalInterview !== 0 ? totalInterview : '0'} color="error" icon={'entypo:chat'} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <AppWidgetSummary title={t("todayInterview")} total={totalInterviewToday !== 0 ? totalInterviewToday : '0'} color="warning" icon={'entypo:chat'} />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                  <AppWebsiteVisits
                    title={t("visit")}
                    chartLabels={dateList}
                    chartData={[
                      {
                        type: 'line',
                        fill: 'solid',
                        data: accessList,
                      },
                    ]}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <AppCurrentVisits
                    title={t("ratioInterview")}
                    chartData={[
                      { label: t("passed"), value: pass ? pass : 0 },
                      { label: t("failed"), value: failed ? failed : 0},
                      { label: t("list.filterStatus_notInterviewed"), value: wait_interview ? wait_interview : 0 },
                    ]}
                    chartColors={[
                      theme.palette.maincolor.success,
                      theme.palette.maincolor.danger,
                      theme.palette.maincolor.secondary,
                    ]}
                  />
                </Grid>
              </Grid>
            </Container>
          </>
        )}
    </>
  );
}
