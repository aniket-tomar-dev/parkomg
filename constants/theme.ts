import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'Inter_400Regular',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563EB', // Blue - trust & reliability
    secondary: '#16A34A', // Green - success & payments
    tertiary: '#F59E0B', // Amber - alerts & overstay (mapped to tertiary for now, or custom)
    error: '#DC2626', // Red - errors
    background: '#F9FAFB',
    surface: '#FFFFFF',
    onSurface: '#111827', // Text Primary
    onSurfaceVariant: '#6B7280', // Text Secondary
    outline: '#E5E7EB', // Border
  },
  fonts: configureFonts({ config: fontConfig }),
};

// Custom colors that might not map directly to Paper's theme but are needed
export const customColors = {
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};
