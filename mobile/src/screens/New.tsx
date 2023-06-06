import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { api } from '../lib/axios';

import BackButton from '../components/BackButton';
import Checkbox from '../components/Checkbox';
import colors from 'tailwindcss/colors';

const avaliableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
];

const New = () => {
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);

    const handleToggleWeekDay = (weekDayIndex: number) => {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays((prevState) =>
                prevState.filter((weekDay) => weekDay !== weekDayIndex)
            );
        } else {
            setWeekDays((prevState) => [...prevState, weekDayIndex]);
        }
    };

    const handleCrateNewHabit = async () => {
        try {
            if (!title.trim() || weekDays.length === 0) {
                return Alert.alert(
                    'Novo hábito',
                    'Informe o nome do hábito e escolha a periodicidade.'
                );
            }

            await api.post('/habits', {
                title,
                weekDays,
            });

            setTitle('');
            setWeekDays([]);

            Alert.alert('Novo hábito', 'Hábito criado com sucesso !');
        } catch (error) {
            Alert.alert('Ops', 'Não foi póssivel criar o novo hábito.');
        }
    };

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento ?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-4 text-white text-base">
                    Qual a recorrência ?
                </Text>

                {avaliableWeekDays.map((weekDay, index) => (
                    <Checkbox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => handleToggleWeekDay(index)}
                    />
                ))}

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-lg mt-6"
                    activeOpacity={0.7}
                    onPress={handleCrateNewHabit}
                >
                    <Feather name="check" size={20} color={colors.white} />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default New;
