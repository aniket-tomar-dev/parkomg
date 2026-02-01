import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

import { EmptyState } from '@/components/EmptyState';
import { ParkingCard } from '@/components/ParkingCard';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { ParkingTicket } from '@/types/parking';

// Mock Data
const MOCK_TICKETS: ParkingTicket[] = [
    {
        id: '1',
        vehicleNumber: 'MH12AB1234',
        vehicleType: 'CAR',
        entryTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), // 6 hours left
        status: 'ACTIVE',
    },
    {
        id: '2',
        vehicleNumber: 'MH12XY9999',
        vehicleType: 'BIKE',
        entryTime: new Date(Date.now() - 1000 * 60 * 60 * 7.5).toISOString(), // 7.5 hours ago
        endTime: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // 30 mins left
        status: 'ACTIVE',
    },
    {
        id: '3',
        vehicleNumber: 'KA01ZZ0000',
        vehicleType: 'CAR',
        entryTime: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(), // 9 hours ago
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // Overdue by 1 hour
        status: 'OVERDUE',
    }
];

export default function ActiveParkingsScreen() {
    const router = useRouter();
    const theme = useTheme();

    const [tickets, setTickets] = useState<ParkingTicket[]>(MOCK_TICKETS);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Mock refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const handleTicketPress = (ticket: ParkingTicket) => {
        // TODO: Navigate to Details/Exit screen
        console.log('Ticket pressed:', ticket.id);
    };

    const handleAddPress = () => {
        router.push('/(app)/staff/entry');
    };

    return (
        <ScreenWrapper style={styles.container}>
            <FlatList
                data={tickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ParkingCard ticket={item} onPress={handleTicketPress} />
                )}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <EmptyState
                        title="No Active Parking"
                        message="Tap the + button to add a new vehicle."
                    />
                }
            />

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                color="white"
                onPress={handleAddPress}
                label="New Entry"
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        paddingBottom: 80, // Space for FAB
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
