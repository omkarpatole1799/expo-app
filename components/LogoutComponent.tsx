import { router } from 'expo-router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetAuthState } from './store/auth-slice';
import { resetCandidateDataState } from './store/candidate-data-slice';
import BtnSecondary from './UI/BtnSecondary';
import Loading from './UI/Loading';

const LogoutComponent = () => {
    const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        // setIsLoading(true);
        dispatch(resetAuthState());
        dispatch(resetCandidateDataState());
        router.push('/');
    };

    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <>
            <BtnSecondary title="Logout" onPress={handleLogout} />
        </>
    );
};

export default LogoutComponent;
