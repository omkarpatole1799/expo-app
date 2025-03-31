import { View, Text, Image, Button } from 'react-native';
import React, { useState } from 'react';
import { styles } from '@/constants/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { resetAuthState } from './store/auth-slice';
import { resetCandidateDataState } from './store/candidate-data-slice';
import { router } from 'expo-router';
import BtnPrimary from './UI/BtnPrimary';
import BtnSecondary from './UI/BtnSecondary';

const LogoutComponent = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(resetAuthState());
        dispatch(resetCandidateDataState());
        router.push('/');
    };

    return (
        <>
            <BtnSecondary title="Logout" onPress={handleLogout} />
        </>
    );
};

export default LogoutComponent;
