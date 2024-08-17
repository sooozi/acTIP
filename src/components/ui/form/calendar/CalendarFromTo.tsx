// @ts-nocheck

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '@/src/components/icon/IconSVG';
import styles from './CalendarFromTo.module.css';

import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isAfter,
  parse,
  isBefore,
} from 'date-fns';

interface CalendarFromToProps {
  label?: string;
  start?: string;
  end?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CalendarFromTo = ({
  label,
  start,
  end,
  onChange,
}: CalendarFromToProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<{
    start: unknown;
    end: unknown;
  }>({
    start: null,
    end: null,
  });

  const [clickCount, setClickCount] = useState(0);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <>
        <div className="header">
          <div>
            <div onClick={prevMonth}>
              <ArrowLeft />
            </div>
          </div>
          <div>
            <span>{format(currentMonth, dateFormat)}</span>
          </div>
          <div onClick={nextMonth}>
            <ArrowRight />
          </div>
        </div>
      </>
    );
  };

  const renderTableHeader = () => {
    const days = [];
    const daysName = ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i}>
          <div>{daysName[i]}</div>
        </div>
      );
    }

    return <div className="tableHeader">{days}</div>;
  };

  const renderTableBody = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];

    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        rows.push(
          <div key={day} onClick={() => onDateClick(cloneDay)}>
            <div
              className={
                !isSameMonth(day, monthStart)
                  ? 'overMonth'
                  : isSameDay(day, selectedDates.start)
                    ? 'selectedStart'
                    : isSameDay(day, selectedDates.end)
                      ? 'selectedEnd'
                      : isWithinRange(
                            day,
                            selectedDates.start,
                            selectedDates.end
                          )
                        ? 'selectedRange'
                        : ''
              }
            >
              {formattedDate}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
    }
    return <div className="tableBody">{rows}</div>;
  };

  const isWithinRange = (day, start, end) => {
    return start && end && isAfter(day, start) && isBefore(day, end);
  };

  const onDateClick = (day: unknown) => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 0) {
      setSelectedDates({ start: day, end: null });
    } else if (clickCount === 1) {
      setSelectedDates((prevDates) => {
        if (day < prevDates.start) {
          return { start: day, end: prevDates.start };
        } else {
          return { ...prevDates, end: day };
        }
      });
    } else if (clickCount === 2) {
      setSelectedDates({ start: null, end: null });
      setClickCount(0);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  useEffect(() => {
    onChange(selectedDates);
  }, [selectedDates]);

  useEffect(() => {
    const s = start ? parse(start, 'yyyy-MM-dd', new Date()) : null;
    const e = end ? parse(end, 'yyyy-MM-dd', new Date()) : null;

    setSelectedDates({
      start: s,
      end: e,
    });
  }, [start, end]);

  return (
    <div className="calendarFromTo">
      {label && <label>{label}</label>}
      {renderHeader()}
      {renderTableHeader()}
      {renderTableBody()}
    </div>
  );
};

export default CalendarFromTo;
