import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';

const Routes = () => {
    return (
        <View className="flex-1 bg-background">
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    );
};

export default Routes;
