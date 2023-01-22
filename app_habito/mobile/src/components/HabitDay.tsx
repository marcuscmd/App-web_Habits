import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercetage } from "../utils/generate-progress-percetage";
import clsx from "clsx";
import dayjs from "dayjs";


const week_days = 7;
const screen_horizontal_padding = (32 * 2) / 5;

export const day_margin_between = 8;
export const day_size = (Dimensions.get('screen').width / week_days) - (screen_horizontal_padding + 5);


interface Props extends TouchableOpacityProps{
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
};

export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props){

    const amountAccomplishedPercetage = amountOfHabits > 0 ? generateProgressPercetage(amountOfHabits, amountCompleted) : 0;

    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

    return (
        <TouchableOpacity className={clsx("rounded-lg border-2 m-1", {
            ["bg-zinc-900 border-zinc-800"] : amountAccomplishedPercetage == 0,
            ["bg-violet-900 border-violet-700"] : amountAccomplishedPercetage > 0 && amountAccomplishedPercetage < 20,
            ["bg-violet-800 border-violet-600"] : amountAccomplishedPercetage >= 20 && amountAccomplishedPercetage < 40,
            ["bg-violet-700 border-violet-500"] : amountAccomplishedPercetage >= 40 && amountAccomplishedPercetage < 60,
            ["bg-violet-600 border-violet-400"] : amountAccomplishedPercetage >= 60 && amountAccomplishedPercetage < 80,
            ["bg-violet-500 border-violet-300"] : amountAccomplishedPercetage >= 80,
            [" border-white border-4"] : isCurrentDay,
        })}
            style={{width: day_size, height: day_size}}
            activeOpacity={0.7}
            {...rest}
        />
    )
}