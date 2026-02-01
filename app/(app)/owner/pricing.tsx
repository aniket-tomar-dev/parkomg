import { AppButton } from '@/components/AppButton';
import { AppTextInput } from '@/components/AppTextInput';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface PricingFormValues {
    carHourlyRate: string;
    bikeHourlyRate: string;
}

export default function PricingScreen() {
    const theme = useTheme();
    const { control, handleSubmit } = useForm<PricingFormValues>({
        defaultValues: {
            carHourlyRate: '50',
            bikeHourlyRate: '20',
        },
    });

    const onSubmit = (data: PricingFormValues) => {
        console.log('Pricing updated:', data);
        // Mock save
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
                    Set hourly rates for different vehicle types
                </Text>

                <View style={styles.form}>
                    <AppTextInput
                        control={control}
                        name="carHourlyRate"
                        label="Car Hourly Rate (₹)"
                        keyboardType="number-pad"
                        placeholder="50"
                    />

                    <AppTextInput
                        control={control}
                        name="bikeHourlyRate"
                        label="Bike Hourly Rate (₹)"
                        keyboardType="number-pad"
                        placeholder="20"
                    />

                    <AppButton onPress={handleSubmit(onSubmit)} style={styles.button}>
                        Save Pricing
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
    },
    description: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginBottom: 24,
    },
    form: {
        gap: 16,
    },
    button: {
        marginTop: 8,
    },
});
