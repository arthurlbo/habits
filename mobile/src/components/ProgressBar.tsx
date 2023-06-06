import { View } from 'react-native';
import { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

interface Props {
    progress?: number;
}

const ProgressBar = ({ progress = 0 }: Props) => {
    const sharedProgress = useSharedValue(progress);

    const style = useAnimatedStyle(() => {
        return {
            width: `${sharedProgress.value}%`,
        };
    });

    useEffect(() => {
        sharedProgress.value = withDelay(200, withTiming(progress));
    }, [progress]);

    return (
        <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
            <Animated.View
                className="h-3 rounded-xl bg-violet-600"
                style={style}
            />
        </View>
    );
};

export default ProgressBar;
