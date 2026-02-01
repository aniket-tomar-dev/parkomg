import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { z } from 'zod';

import { AppButton } from '@/components/AppButton';
import { AppTextInput } from '@/components/AppTextInput';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { ScreenWrapper } from '@/components/ScreenWrapper';

// Validation Schema
const loginSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, 'Phone number must be 10 digits')
        .max(10, 'Phone number must be 10 digits')
        .regex(/^[0-9]+$/, 'Phone number must contain only numbers'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const router = useRouter();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phoneNumber: '',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        Keyboard.dismiss();
        setIsLoading(true);

        // Mock API call simulation
        setTimeout(() => {
            setIsLoading(false);
            // Navigate to OTP screen with params
            router.push({
                pathname: '/(auth)/otp',
                params: { phoneNumber: data.phoneNumber },
            });
        }, 1500);
    };

    return (
        <ScreenWrapper style={styles.container} keyboardAvoiding>
            <LoadingOverlay visible={isLoading} message="Sending OTP..." />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={[styles.logoPlaceholder, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.logoText}>P</Text>
                    </View>
                    <Text style={[styles.title, { color: theme.colors.onBackground }]}>Welcome Back</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                        Enter your mobile number to login
                    </Text>
                </View>

                <View style={styles.form}>
                    <AppTextInput
                        control={control}
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="9876543210"
                        keyboardType="number-pad"
                        maxLength={10}
                        disabled={isLoading}
                        left={<TextInput.Affix text="+91 " />}
                    />

                    <AppButton
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                        loading={isLoading}
                    >
                        Get OTP
                    </AppButton>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        transform: [{ rotate: '-10deg' }]
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Inter_600SemiBold',
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    form: {
        gap: 16,
    },
    button: {
        marginTop: 8,
    }
});
