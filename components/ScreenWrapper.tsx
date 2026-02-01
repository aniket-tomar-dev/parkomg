import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    withScrollView?: boolean; // Can be added later if we use ScrollView wrapper
    keyboardAvoiding?: boolean;
}

export function ScreenWrapper({ children, style, keyboardAvoiding = false }: ScreenWrapperProps) {
    const theme = useTheme();

    const content = (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }, style]}
            edges={['top', 'left', 'right']} // Usually we want to handle bottom manually or let TabBar handle it, but for now safe default
        >
            <View style={{ flex: 1 }}>{children}</View>
        </SafeAreaView>
    );

    if (keyboardAvoiding) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {content}
            </KeyboardAvoidingView>
        );
    }

    return content;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
