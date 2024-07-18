import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameDay
} from 'date-fns';
import styled from 'styled-components';

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const Day = styled.div`
  width: 2rem;
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarCell = styled.div`
  padding: 1rem;
  text-align: center;
  background: ${(props) => (props.isToday ? '#007bff' : 'transparent')};
  color: ${(props) => (props.isToday ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background: #e6e6e6;
  }
`;

const StudyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <CalendarHeader>
        <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          이전
        </Button>
        <div>{format(currentMonth, 'yyyy년 MM월')}</div>
        <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          다음
        </Button>
      </CalendarHeader>
    );
  };

  const renderDaysOfWeek = () => {
    const days = [];
    const startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <Day key={i}>{format(addDays(startDate, i), 'EEE')}</Day>
      );
    }

    return <DaysOfWeek>{days}</DaysOfWeek>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');

        days.push(
          <CalendarCell
            key={day}
            isToday={isSameDay(day, new Date())}
            onClick={() => setSelectedDate(day)}
          >
            <span>{formattedDate}</span>
          </CalendarCell>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day}>{days}</div>
      );

      days = [];
    }

    return <CalendarGrid>{rows}</CalendarGrid>;
  };

  return (
    <div>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
      <div>
        <h2>선택된 날짜: {format(selectedDate, 'yyyy년 MM월 dd일')}</h2>
      </div>
    </div>
  );
};

export default StudyCalendar;
