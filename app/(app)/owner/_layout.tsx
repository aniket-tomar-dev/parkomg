import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function OwnerLayout() {
    const theme = useTheme();

    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                fontWeight: '600',
                fontSize: 18,
            },
            headerShadowVisible: false,
            headerRight: () => (
                <MaterialIcons name="notifications" size={24} color="#FFFFFF" style={{ marginRight: 16 }} />
            ),
        }}>
            <Tabs.Screen
                name="pricing"
                options={{
                    title: 'Pricing Setup',
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',

                }}
            />
            <Tabs.Screen
                name="vehicle-types"
                options={{
                    title: 'Vehicle Types',

                }}
            />
        </Tabs>
    );
}
