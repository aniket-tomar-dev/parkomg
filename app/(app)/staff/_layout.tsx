import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function StaffLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}
        >
            <Tabs.Screen
                name="active-parkings"
                options={{

                }}
            />
            <Tabs.Screen
                name="entry"
                options={{
                    title: 'New Vehicle Entry',
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
