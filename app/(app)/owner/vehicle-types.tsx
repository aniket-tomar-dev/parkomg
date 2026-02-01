import { EmptyState } from '@/components/EmptyState';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function VehicleTypesScreen() {
    const theme = useTheme();

    return (
        <ScreenWrapper style={styles.container}>
            <EmptyState
                title="Vehicle Types"
                message="Configure vehicle types and their settings here."
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
