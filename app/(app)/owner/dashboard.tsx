import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: string;
    color?: string;
}

function StatCard({ title, value, color }: StatCardProps) {
    const theme = useTheme();

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text style={[styles.cardTitle, { color: theme.colors.onSurfaceVariant }]}>{title}</Text>
                <Text style={[styles.cardValue, { color: color || theme.colors.onSurface }]}>{value}</Text>
            </Card.Content>
        </Card>
    );
}

export default function DashboardScreen() {
    const theme = useTheme();

    // Mock data
    const stats = {
        todayRevenue: '₹12,450',
        activeCars: 8,
        completedToday: 23,
        totalSpots: 50,
    };

    return (
        <ScreenWrapper>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Link href="/login" style={{ color: theme.colors.primary, textAlign: 'right', marginBottom: 16 }}>
                    Back to Login
                </Link>

                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.onBackground }]}>Dashboard</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                        {new Date().toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                </View>

                <View style={styles.statsGrid}>
                    <StatCard
                        title="Today's Revenue"
                        value={stats.todayRevenue}
                        color={theme.colors.primary}
                    />
                    <StatCard
                        title="Active Vehicles"
                        value={stats.activeCars}
                        color={theme.colors.secondary}
                    />
                    <StatCard
                        title="Completed Today"
                        value={stats.completedToday}
                    />
                    <StatCard
                        title="Total Spots"
                        value={stats.totalSpots}
                    />
                </View>

                <Card style={styles.recentCard}>
                    <Card.Content>
                        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                            Recent Activity
                        </Text>
                        <Text style={[styles.placeholder, { color: theme.colors.onSurfaceVariant }]}>
                            No recent activity
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    statsGrid: {
        gap: 12,
        marginBottom: 24,
    },
    card: {
        elevation: 2,
    },
    cardTitle: {
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 32,
        fontFamily: 'Inter_600SemiBold',
    },
    recentCard: {
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 12,
    },
    placeholder: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        paddingVertical: 24,
    },
});
