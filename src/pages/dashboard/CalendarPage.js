import { useState } from 'react';
import { format } from 'date-fns'; 
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, List, ListItem, ListItemText, Typography, styled } from '@mui/material';
import { TableStack } from '../../components/@dashboard/table';
import palette from '../../theme/palette';

const CalendarPage = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState([]);

  const handleEventClick = (selected) => {
    setSelectedDate([selected.event]);
  };

  const StyledListItem = styled(ListItem)({
    backgroundColor: `${palette.maincolor.primary_light}`,
    color: '#fff',
    margin: '10px 0',
    borderRadius: '2px',
  });

  return (
    <Box m="20px">
      <TableStack nameStack={t('calendar')}  />

      <Box display="flex" justifyContent="space-between">
        {selectedDate.length > 0 && (
          <Box backgroundColor="rgba(249,250,251,0.8)" flex="1 1 20%" p="15px" borderRadius="4px">
            <Typography variant="h5">{t('events.event')}</Typography>
            <List>
              {selectedDate.map((event) => (
                <StyledListItem
                  key={event.id}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {format(new Date(event.start), 'dd/MM/yyyy')} {format(new Date(event.end - 1), 'dd/MM/yyyy')}
                      </Typography>
                    }
                  />
                </StyledListItem>
              ))}
            </List>
          </Box>
        )}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="80vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
            }}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            eventLimit={2}
            eventClick={handleEventClick}
            eventsSet={(events) => setSelectedDate(events)}
            initialEvents={[
              {
                id: '12315',
                title: t('cal1'),
                start: '2023-07-12',
                end: '2023-07-13',
                backgroundColor: '#4cceac',
              },
              {
                id: '12316',
                title:  t('cal2'),
                start: '2023-07-12',
                end: '2023-07-13',
                backgroundColor: '#ff0000',
              },
              {
                id: '5123',
                title:  t('cal3'),
                start: '2023-07-28',
                end: '2023-07-31',
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarPage;
