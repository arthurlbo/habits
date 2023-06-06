import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import clsx from "clsx";

import ProgressBar from "./ProgressBar";
import HabitsList from "./Habitslist";

interface HabitDayProps {
    date: Date;
    amount?: number;
    defaultCompleted?: number;
}

const HabitDay = ({ amount = 0, defaultCompleted = 0, date }: HabitDayProps) => {
    const [completed, setCompleted] = useState(defaultCompleted);

    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

    const dayAndMonth = dayjs(date).format("DD/MM");
    const dayOffWeek = dayjs(date).format("dddd");

    const handleCompletedChange = (completed: number) => {
        setCompleted(completed);
    };

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx(
                    "h-10 w-10 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background",
                    {
                        "border-zinc-800 bg-zinc-900": completedPercentage === 0,
                        "border-violet-700 bg-violet-900": completedPercentage > 0 && completedPercentage < 20,
                        "border-violet-600 bg-violet-800": completedPercentage >= 20 && completedPercentage < 40,
                        "border-violet-500 bg-violet-700": completedPercentage >= 40 && completedPercentage < 60,
                        "border-violet-500 bg-violet-600": completedPercentage >= 60 && completedPercentage < 80,
                        "border-violet-400 bg-violet-500": completedPercentage >= 80,
                    },
                )}
            />
            <Popover.Portal>
                <Popover.Content className="flex min-w-[320px] flex-col rounded-2xl bg-zinc-900 p-6">
                    <span className="font-semibold text-zinc-400">{dayOffWeek}</span>
                    <span className="mt-1 text-3xl font-extrabold leading-tight text-white">{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <HabitsList date={date} onCompletedChange={handleCompletedChange} />

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default HabitDay;
