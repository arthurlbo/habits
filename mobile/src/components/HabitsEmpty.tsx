import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

const HabitsEmpty = () => {
    const { navigate } = useNavigation();

    return (
        <Text className="text-zinc-400 text-base">
            Você ainda não esta monitorando nenhum hábito{' '}
            <Text
                className="text-violet-400 text-base underline active:violet-500"
                onPress={() => navigate('new')}
            >
                Começe criando um !
            </Text>
        </Text>
    );
};

export default HabitsEmpty;
