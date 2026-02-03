import { zodResolver } from '@hookform/resolvers/zod';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { SegmentedButtons, useTheme } from 'react-native-paper';
import { z } from 'zod';

import { AppButton } from '@/components/AppButton';
import { AppTextInput } from '@/components/AppTextInput';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { VehicleNumberInput } from '@/components/VehicleNumberInput';
import { VehicleType } from '@/types/parking';

// Validation Schema
const entrySchema = z.object({
    vehicleNumber: z
        .string()
        .min(6, 'Vehicle number must be at least 6 characters')
        .max(15, 'Vehicle number is too long'),
    phoneNumber: z
        .string()
        .optional()
        .refine((val) => !val || (val.length === 10 && /^[0-9]+$/.test(val)), {
            message: 'Phone number must be 10 digits',
        }),
});

type EntryFormValues = z.infer<typeof entrySchema>;

export default function EntryScreen() {
    const router = useRouter();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleType, setVehicleType] = useState<VehicleType>('CAR');

    const { control, handleSubmit, reset } = useForm<EntryFormValues>({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            vehicleNumber: '',
            phoneNumber: '',
        },
    });

    const onSubmit = async (data: EntryFormValues) => {
        Keyboard.dismiss();
        setIsLoading(true);

        // Calculate end time (8 hours from now)
        const entryTime = new Date();
        const endTime = new Date(entryTime.getTime() + 8 * 60 * 60 * 1000);

        // Mock API call
        setTimeout(() => {
            setIsLoading(false);

            // Success haptic feedback
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            // Reset form
            reset();

            // Navigate back to active parkings
            router.back();
        }, 1500);
    };

    // Calculate and format end time for display
    const getEndTime = () => {
        const endTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
        return endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <ScreenWrapper style={styles.container} keyboardAvoiding>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.onBackground }]}>New Vehicle Entry</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                        Enter vehicle details to start parking
                    </Text>
                </View>

                <View style={styles.form}>
                    <VehicleNumberInput
                        control={control}
                        name="vehicleNumber"
                        disabled={isLoading}
                    />

                    <View style={styles.section}>
                        <Text style={[styles.label, { color: theme.colors.onSurface }]}>Vehicle Type</Text>
                        <SegmentedButtons
                            value={vehicleType}
                            onValueChange={(value) => setVehicleType(value as VehicleType)}
                            buttons={[
                                {
                                    value: 'CAR',
                                    label: 'Car',
                                    icon: 'car',
                                },
                                {
                                    value: 'BIKE',
                                    label: 'Bike',
                                    icon: 'motorbike',
                                },
                            ]}
                            style={styles.segmented}
                        />
                    </View>

                    <AppTextInput
                        control={control}
                        name="phoneNumber"
                        label="Phone Number (Optional)"
                        placeholder="9876543210"
                        keyboardType="number-pad"
                        maxLength={10}
                        disabled={isLoading}
                    />

                    <View style={[styles.infoCard, { backgroundColor: theme.colors.secondaryContainer }]}>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Entry Time</Text>
                            <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>End Time (8 hrs)</Text>
                            <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                                {getEndTime()}
                            </Text>
                        </View>
                    </View>

                    <AppButton
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                        loading={isLoading}
                    >
                        Start Parking
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
        paddingTop: 20,
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
        gap: 20,
    },
    section: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    segmented: {
        marginTop: 4,
    },
    infoCard: {
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    infoValue: {
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
    button: {
        marginTop: 8,
    },
});
