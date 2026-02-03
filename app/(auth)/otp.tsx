import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { z } from 'zod';

import { AppButton } from '@/components/AppButton';
import { AppTextInput } from '@/components/AppTextInput';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { ScreenWrapper } from '@/components/ScreenWrapper';

// Validation Schema
const otpSchema = z.object({
    otp: z
        .string()
        .min(4, 'OTP must be 4 digits')
        .max(6, 'OTP must be 6 digits') // Assuming 4-6 digits
        .regex(/^[0-9]+$/, 'OTP must contain only numbers'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

// Mock roles for MVP demo
const ROLES = [
    { label: 'Staff Member', value: 'staff' },
    { label: 'Owner / Admin', value: 'owner' },
];

export default function OtpScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [selectedRole, setSelectedRole] = useState<'staff' | 'owner'>('staff'); // Default to staff for quick testing

    const { control, handleSubmit } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const onResend = () => {
        setTimer(30);
        // Trigger mock resend API
    };

    const onSubmit = async (data: OtpFormValues) => {
        Keyboard.dismiss();
        setIsLoading(true);

        // Mock Verify API call
        setTimeout(async () => {
            // Save auth state
            await SecureStore.setItemAsync('user-token', 'mock-jwt-token');
            await SecureStore.setItemAsync('user-role', selectedRole);

            setIsLoading(false);

            // Navigate based on role
            if (selectedRole === 'owner') {
                router.replace('/(app)/owner/dashboard');
            } else {
                router.replace('/(app)/staff/active-parkings'); // We need to create this page next phase
            }
        }, 1500);
    };

    return (
        <ScreenWrapper style={styles.container} keyboardAvoiding>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.onBackground }]}>Verify OTP</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                        Sent to {params.phoneNumber || 'your number'}
                    </Text>
                </View>

                <View style={styles.form}>
                    <AppTextInput
                        control={control}
                        name="otp"
                        label="Enter OTP"
                        placeholder="1234"
                        keyboardType="number-pad"
                        maxLength={6}
                        disabled={isLoading}
                        autoCapitalize="none"
                    />

                    <View style={styles.roleSelector}>
                        <Text style={[styles.roleLabel, { color: theme.colors.onSurface }]}>Select Logic Role (MVP):</Text>
                        <View style={styles.rolesContainer}>
                            {ROLES.map((role) => (
                                <TouchableOpacity
                                    key={role.value}
                                    onPress={() => setSelectedRole(role.value as 'staff' | 'owner')}
                                    style={[
                                        styles.roleChip,
                                        {
                                            borderColor: selectedRole === role.value ? theme.colors.primary : theme.colors.outline,
                                            backgroundColor: selectedRole === role.value ? theme.colors.primaryContainer : 'transparent'
                                        }
                                    ]}
                                >
                                    <Text style={{
                                        color: selectedRole === role.value ? theme.colors.primary : theme.colors.onSurfaceVariant,
                                        fontWeight: selectedRole === role.value ? '600' : '400'
                                    }}>
                                        {role.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <AppButton
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                        loading={isLoading}
                    >
                        Verify & Login
                    </AppButton>

                    <View style={styles.resendContainer}>
                        <Text style={{ color: theme.colors.onSurfaceVariant }}>Didn't receive code? </Text>
                        <TouchableOpacity onPress={onResend} disabled={timer > 0}>
                            <Text style={{
                                color: timer > 0 ? theme.colors.outline : theme.colors.primary,
                                fontWeight: '600'
                            }}>
                                {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    form: {
        gap: 16,
    },
    button: {
        marginTop: 8,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    roleSelector: {
        marginVertical: 12,
    },
    roleLabel: {
        marginBottom: 8,
        fontFamily: 'Inter_500Medium',
    },
    rolesContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    roleChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    }
});
