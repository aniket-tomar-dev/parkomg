import { Stack } from 'expo-router';

export default function StaffLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="active-parkings"
                options={{
                    title: 'Active Parkings',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="entry"
                options={{
                    title: 'New Entry',
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
        </Stack>
    );
}
