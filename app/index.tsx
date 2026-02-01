import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = await SecureStore.getItemAsync('user-token');
            const storedRole = await SecureStore.getItemAsync('user-role');

            if (token && storedRole) {
                setIsAuthenticated(true);
                setRole(storedRole);
            }
        } catch (error) {
            console.error('Auth check failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    if (role === 'owner') {
        return <Redirect href="/(app)/owner/dashboard" />;
    }

    if (role === 'staff') {
        // Note: We need to ensure the staff route is valid. Phase 4 will build this.
        // For now, if we assume we are moving sequentially, Phase 4 hasn't built it yet? 
        // But index.tsx needs to point somewhere valid if we test it now.
        // I entered Phase 4 in plan but haven't implemented it.
        // I will redirect to owner dashboard temporarily if staff path not ready? 
        // Or just let it fail/warn until Phase 4?
        // Actually, I can just point it to /(app)/staff/active-parkings assuming I build it next.
        return <Redirect href="/(app)/staff/active-parkings" />;
    }

    return <Redirect href="/(auth)/login" />;
}
