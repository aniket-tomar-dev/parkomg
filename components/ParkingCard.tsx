import { ParkingTicket } from '@/types/parking';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ParkingCardProps {
    ticket: ParkingTicket;
    onPress: (ticket: ParkingTicket) => void;
}

export function ParkingCard({ ticket, onPress }: ParkingCardProps) {
    const theme = useTheme();

    // Helper to calculate status color and label
    const getStatusInfo = () => {
        const now = new Date();
        const end = new Date(ticket.endTime);
        // Rough calculation for color coding logic from PRD
        // Green: Active, Amber: Ending Soon (e.g. < 30 mins), Red: Overdue

        const diffMs = end.getTime() - now.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 0) {
            return { color: theme.colors.error, label: 'OVERDUE', bg: theme.colors.errorContainer };
        } else if (diffMins < 60) {
            return { color: '#F59E0B', label: 'ENDING SOON', bg: '#FEF3C7' }; // Custom Amber container
        } else {
            return { color: theme.colors.primary, label: 'ACTIVE', bg: theme.colors.secondaryContainer };
        }
    };

    const { color, label, bg } = getStatusInfo();

    // Format times
    const entryTime = new Date(ticket.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(ticket.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}
            onPress={() => onPress(ticket)}
            activeOpacity={0.7}
        >
            <View style={styles.row}>
                <View style={styles.vehicleInfo}>
                    <Text style={[styles.vehicleNumber, { color: theme.colors.onSurface }]}>{ticket.vehicleNumber}</Text>
                    <Text style={[styles.type, { color: theme.colors.onSurfaceVariant }]}>{ticket.vehicleType}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: bg }]}>
                    <Text style={[styles.badgeText, { color: color }]}>{label}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
                <View>
                    <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>ENTRY</Text>
                    <Text style={[styles.time, { color: theme.colors.onSurface }]}>{entryTime}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>ENDS</Text>
                    <Text style={[styles.time, { color: theme.colors.onSurface }]}>{endTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
        elevation: 1, // Mild shadow for android
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vehicleInfo: {
        gap: 4,
    },
    vehicleNumber: {
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
        letterSpacing: 1,
    },
    type: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    label: {
        fontSize: 10,
        fontFamily: 'Inter_500Medium',
        marginBottom: 2,
    },
    time: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    }

});
