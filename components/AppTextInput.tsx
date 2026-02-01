import React from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
import { HelperText, TextInput, useTheme } from 'react-native-paper';

interface AppTextInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    rules?: RegisterOptions;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: RNTextInput['props']['keyboardType'];
    autoCapitalize?: RNTextInput['props']['autoCapitalize'];
    left?: React.ComponentProps<typeof TextInput>['left'];
    right?: React.ComponentProps<typeof TextInput>['right'];
    disabled?: boolean;
    multiline?: boolean;
    maxLength?: number;
}

export function AppTextInput<T extends FieldValues>({
    control,
    name,
    label,
    rules,
    placeholder,
    secureTextEntry,
    keyboardType,
    autoCapitalize = 'none',
    left,
    right,
    disabled,
    multiline,
    maxLength,
}: AppTextInputProps<T>) {
    const theme = useTheme();

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    <TextInput
                        label={label}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        mode="outlined"
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        autoCapitalize={autoCapitalize}
                        left={left}
                        right={right}
                        disabled={disabled}
                        multiline={multiline}
                        maxLength={maxLength}
                        error={!!error}
                        style={[styles.input, { backgroundColor: theme.colors.surface }]}
                        outlineColor={theme.colors.outline}
                        activeOutlineColor={theme.colors.primary}
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
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
});
