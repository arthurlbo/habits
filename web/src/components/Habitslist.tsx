import { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps {
    date: Date;
    onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
    possibleHabits: { id: string; title: string; created_at: string }[];
    completedHabits: string[];
}

const HabitsList = ({ date, onCompletedChange }: HabitsListProps) => {
    const [habitsInfo, setHabistInfo] = useState<HabitsInfo>();

    useEffect(() => {
        api.get("day", {
            params: {
                date: date.toISOString(),
            },
        }).then((response) => {
            setHabistInfo(response.data);
        });
    }, []);

    const handleToggleHabit = async (habitId: string) => {
        await api.patch(`/habits/${habitId}/toggle`);

        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

        let completedHabits: string[] = [];

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter((id) => id !== habitId);
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId];
        }

        setHabistInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        });

        onCompletedChange(completedHabits.length);
    };

    const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map((habit) => (
                <Checkbox.Root
                    key={habit.id}
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                    checked={habitsInfo.completedHabits.includes(habit.id)}
                    disabled={isDateInPast}
                    className="group flex items-center gap-3 focus:outline-none disabled:cursor-not-allowed"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
                        <Checkbox.Indicator>
                            <Check size={20} className="text-white" />
                        </Checkbox.Indicator>
                    </div>
                    <span className="text-xl font-semibold leading-tight text-white group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through">
                        {habit.title}
                    </span>
                </Checkbox.Root>
            ))}
        </div>
    );
};

export default HabitsList;
