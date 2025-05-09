import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
    // return <Login />;
    return <Redirect href="/tabs/scan" />;
}
