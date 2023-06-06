import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Habit from '../screens/Habit';
import Home from '../screens/Home';
import New from '../screens/New';

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home} />
            <Screen name="new" component={New} />
            <Screen name="habit" component={Habit} />
        </Navigator>
    );
};

export default AppRoutes;
