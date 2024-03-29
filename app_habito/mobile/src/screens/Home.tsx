import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, day_size } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';

import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S',
]
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 18 * 4;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

type SummaryProps = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>


export function Home() {

    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<SummaryProps | null>(null);

    const { navigate } = useNavigation();

    async function fetchData() {
        try {
            setLoading(true);
            const response = await api.get('/summary');
            setSummary(response.data);
            
        } catch (error) {
            Alert.alert('Ops', 'Não foi possivel carregar o sumario de habitos');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchData();
    }, []));

    if (loading) {
        return (
            <Loading />
        );
    }


    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text key={`${weekDay}-${i}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: day_size }}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {
                    summary &&
                    <View className="flex-row flex-wrap">
                        {
                            datesFromYearStart.map(date => {
                                const dayWithHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day')
                                })
                                
                                return(
                                <HabitDay
                                    key={date.toISOString()}
                                    date={date}
                                    amountOfHabits={dayWithHabits?.amount}
                                    amountCompleted={dayWithHabits?.completed}
                                    onPress={() => navigate('habit', { date: date.toISOString() })} 
                                />
                                )
                        })
                        }




                        {
                            amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                                <View key={index}
                                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-50"
                                    style={{ width: day_size, height: day_size }} />
                            ))
                        }
                    </View>
                }
            </ScrollView>
        </View>

    )
}