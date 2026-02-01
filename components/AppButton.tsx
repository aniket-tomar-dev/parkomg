import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface AppButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    mode?: 'contained' | 'outlined' | 'text';
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    style?: ViewStyle;
}

export function AppButton({
    onPress,
    children,
    mode = 'contained',
    variant = 'primary',
    loading = false,
    disabled = false,
    icon,
    style,
}: AppButtonProps) {
    const theme = useTheme();

    const handlePress = () => {
        if (!disabled && !loading) {
            if (mode === 'contained' && variant !== 'secondary') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            onPress();
        }
    };

    let buttonColor = theme.colors.primary;
    let textColor = theme.colors.onPrimary;

    if (variant === 'danger') {
        buttonColor = theme.colors.error;
        textColor = theme.colors.onError;
    } else if (variant === 'secondary') {
        // Usually secondary is outlined or different color, adjusting for Paper
        if (mode === 'contained') {
            buttonColor = theme.colors.secondary;
            textColor = '#FFFFFF';
        } else {
            buttonColor = undefined; // Default for outlined/text
            textColor = theme.colors.secondary;
        }
    }

    return (
        <Button
            mode={mode}
            onPress={handlePress}
            loading={loading}
            disabled={disabled}
            icon={icon}
            buttonColor={mode === 'contained' ? buttonColor : undefined}
            textColor={mode === 'contained' ? textColor : (variant === 'danger' ? theme.colors.error : textColor)}
            style={[styles.button, style]}
            contentStyle={styles.content}
            labelStyle={styles.label}
        >
            {children}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        marginVertical: 4,
    },
    content: {
        paddingVertical: 6,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
    },
});
