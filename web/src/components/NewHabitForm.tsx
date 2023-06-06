import { FormEvent, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

import { api } from "../lib/axios";

const avaliableWeekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
];

const NewHabitForm = () => {
    const [title, setTitle] = useState("");
    const [weekDays, setWeekDays] = useState<number[]>([]);

    const createNewHabit = async (event: FormEvent) => {
        event.preventDefault();

        if (!title || weekDays.length === 0) {
            return alert("Prencha o formulário");
        }

        try {
            const response = await api.post("/habits", {
                title,
                weekDays,
            });

            response.status === 200 && alert("Hábito criado com sucesso !");
        } catch (error) {
            alert("Ops");
        }

        setWeekDays([]);
        setTitle("");
    };

    const handleToggleWeekDay = (weekDay: number) => {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
            setWeekDays(weekDaysWithRemovedOne);
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay];
            setWeekDays(weekDaysWithAddedOne);
        }
    };

    return (
        <form onSubmit={createNewHabit} className="mt-6 flex w-full flex-col text-white">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu compromentimento ?
            </label>

            <input
                type="text"
                id="title"
                placeholder="Ex: exercícios, dormir bem, etc..."
                className="mt-3 rounded-lg bg-zinc-800 p-4 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="" className="mt-4 font-semibold leading-tight">
                Qual a recorrência ?
            </label>

            <div className="mt-3 flex flex-col gap-2">
                {avaliableWeekDays.map((weekDay, index) => (
                    <Checkbox.Root
                        key={weekDay}
                        className="group flex items-center gap-3 focus:outline-none"
                        checked={weekDays.includes(index)}
                        onCheckedChange={() => handleToggleWeekDay(index)}
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white" />
                            </Checkbox.Indicator>
                        </div>
                        <span className="leading-tight text-white ">{weekDay}</span>
                    </Checkbox.Root>
                ))}
            </div>

            <button
                type="submit"
                className="focus:ring-green -600 mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    );
};

export default NewHabitForm;
