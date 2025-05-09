import { RootState } from '@/components/store/store';
import { Redirect } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Index() {
    const isAuth = useSelector((state: RootState) => state.authSlice.isAuth);
    if (!isAuth) {
        return <Redirect href="/login" />;
    } else {
        return <Redirect href="/tabs/scan" />;
    }
}
