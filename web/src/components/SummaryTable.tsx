import { useEffect, useState } from "react";

import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../lib/axios";

import HabitDay from "./HabitDay";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();
const minimusSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimusSummaryDatesSize - summaryDates.length;

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[];

const SummaryTable = () => {
    const [summary, setSummary] = useState<Summary>([]);

    useEffect(() => {
        api.get("/summary").then((response) => {
            setSummary(response.data);
        });
    }, []);

    return (
        <div className="flex w-full">
            <div className="grid grid-flow-row grid-rows-7 gap-3">
                {weekDays.map((weekDay, i) => (
                    <div
                        key={`${weekDay} - ${i}`}
                        className="flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400"
                    >
                        {weekDay}
                    </div>
                ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-3">
                {summary.length > 0 &&
                    summaryDates.map((date) => {
                        const dayInSummary = summary.find((day) => {
                            return dayjs(date).isSame(day.date, "day");
                        });

                        return (
                            <HabitDay
                                key={date.toString()}
                                date={date}
                                amount={dayInSummary?.amount}
                                defaultCompleted={dayInSummary?.completed}
                            />
                        );
                    })}
                {amountOfDaysToFill > 0 &&
                    Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                        <div
                            key={i}
                            className="h-10 w-10 cursor-not-allowed rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40"
                        />
                    ))}
            </div>
        </div>
    );
};

export default SummaryTable;
