import { Stack } from 'expo-router';

export default function OwnerLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="dashboard"
                options={{
                    title: 'ParkOMG',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="pricing"
                options={{
                    title: 'Pricing Setup',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="vehicle-types"
                options={{
                    title: 'Vehicle Types',
                    headerShown: false
                }}
            />
        </Stack>
    );
}
