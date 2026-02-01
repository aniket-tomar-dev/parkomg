import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

interface LoadingOverlayProps {
    visible: boolean;
    message?: string;
}

export function LoadingOverlay({ visible, message = 'Loading...' }: LoadingOverlayProps) {
    const theme = useTheme();

    if (!visible) return null;

    return (
        <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
                {message && (
                    <Text style={[styles.text, { color: theme.colors.onSurface }]}>{message}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    card: {
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
});
