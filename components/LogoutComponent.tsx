import { router } from 'expo-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetAuthState } from './store/auth-slice';
import BtnSecondary from './UI/BtnSecondary';

const LogoutComponent = () => {
    const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        // setIsLoading(true);
        dispatch(resetAuthState());
        router.replace('/');
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
