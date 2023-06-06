import dayjs from 'dayjs';

export const generateDateFromYearBeginning = () => {
    const firstDayOffTheYear = dayjs().startOf('year');
    const today = new Date();

    const dates = [];

    let compareDate = firstDayOffTheYear;

    while (compareDate.isBefore(today)) {
        dates.push(compareDate.toDate());
        compareDate = compareDate.add(1, 'day');
    }

    return dates;
};
