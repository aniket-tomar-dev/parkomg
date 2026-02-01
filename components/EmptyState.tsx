import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper'; // Note: Paper's Icon component requires proper setup, or use Lucide directly

interface EmptyStateProps {
    icon?: string;
    title: string;
    message?: string;
    children?: React.ReactNode;
}

export function EmptyState({ icon = 'alert-circle-outline', title, message, children }: EmptyStateProps) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Icon source={icon} size={64} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
            {message && (
                <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>{message}</Text>
            )}
            {children && <View style={styles.action}>{children}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        marginTop: 16,
        fontSize: 20,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
    },
    message: {
        marginTop: 8,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    action: {
        marginTop: 24,
    },
});
