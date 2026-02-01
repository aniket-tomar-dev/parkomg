import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';

interface VehicleNumberInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    disabled?: boolean;
}

export function VehicleNumberInput<T extends FieldValues>({
    control,
    name,
    label = 'Vehicle Number',
    disabled,
}: VehicleNumberInputProps<T>) {
    const theme = useTheme();

    const formatVehicleNumber = (text: string) => {
        // Remove special characters except hyphen/space if needed, for now just uppercase
        // and strictly alphanumeric for standard plates
        return text.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    <TextInput
                        label={label}
                        value={value}
                        onChangeText={(text) => onChange(formatVehicleNumber(text))}
                        onBlur={onBlur}
                        mode="outlined"
                        placeholder="MH12AB1234"
                        autoCapitalize="characters"
                        disabled={disabled}
                        error={!!error}
                        style={[styles.input, { backgroundColor: theme.colors.surface }]}
                        contentStyle={styles.contentStyle}
                    />
                    {error && (
                        <HelperText type="error" visible={!!error}>
                            {error.message}
                        </HelperText>
                    )}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    input: {
        fontSize: 24, // Larger font for vehicle number
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
    },
    contentStyle: {
        letterSpacing: 2, // Improve readability for license plates
    },
});
