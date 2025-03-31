import { setCurrentLoggedInProcessData } from '@/components/store/auth-slice';
import { RootState } from '@/components/store/store';
import BtnPrimary from '@/components/UI/BtnPrimary';
import BtnSecondary from '@/components/UI/BtnSecondary';
import InputLabel from '@/components/UI/InputLabel';
import { styles } from '@/constants/styles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getProcessList } from './api';
import Loading from '../UI/Loading';

const defaultLoginFormValue = {
    username: 'test', // Set the dummy username
    password: 'test', // Set the dummy password
    processUrl: '',
    slot: '',
};

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [allotmentDetails, setAllotmentDetails] = useState([]);
    const dispatch = useDispatch();
    const [processList, setProcessList] = useState([]);

    async function getAndSetProcessList() {
        setIsLoading(true);
        const _data = await getProcessList();
        setProcessList(_data);
        setIsLoading(false);
    }

    useEffect(() => {
        getAndSetProcessList();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: defaultLoginFormValue,
    });

    const onSubmit = useCallback((formData: any) => {
        const url = `${formData.processUrl}/api/login`;
        formData['role'] = 'USER';

        setIsLoading(true);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((data) => data.json())
            .then((data) => {
                const currentLoggedinSlotData = formData;

                const processData = data?.data?._processData[0] || [];
                dispatch(
                    setCurrentLoggedInProcessData({
                        processData,
                        currentLoggedinSlotData,
                    })
                );

                setIsLoading(false);
                router.replace('/scan');
            })
            .catch((err) => {
                setIsLoading(false);
                Alert.alert('Error', 'Not able to login', [
                    {
                        text: 'OK',
                        onPress: () => {},
                    },
                ]);
            });
    }, []);

    const fetchAllotmentDetails = useCallback(async (url: string) => {
        try {
            setIsLoading(true);
            console.log(`${url}/api/get-allotment-info`);
            const _resp = await fetch(`${url}/api/get-allotment-info`);
            if (!_resp.ok) throw new Error('Unable to get allotment details');
            const jsonData = await _resp.json();
            console.log(jsonData.data, '-');
            if (jsonData.data) {
                setAllotmentDetails(jsonData.data);
            }
        } catch (err) {
            Alert.alert('Warning', err?.message || 'Try again after some time.', [
                {
                    text: 'OK',
                    onPress: () => {},
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const watchProcessUrl = watch('processUrl');
    useEffect(() => {
        if (watchProcessUrl) {
            fetchAllotmentDetails(watchProcessUrl);
        }
    }, [watchProcessUrl, setValue]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                }}>
                <View style={styles.container}>
                    <Text style={styles.header}>Welcome</Text>
                    <Text style={styles.subHeader}>Biometric Attendance</Text>

                    <Controller
                        control={control}
                        name="processUrl"
                        rules={{ required: 'Select Exam' }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.inputContainer}>
                                <InputLabel>Select Exam</InputLabel>
                                <Picker
                                    style={styles.input}
                                    selectedValue={value}
                                    onValueChange={onChange}>
                                    <Picker.Item label="-- Select --" />
                                    {processList.map((process, idx) => {
                                        return (
                                            <Picker.Item
                                                key={idx}
                                                label={process.process_name}
                                                value={process.process_url}
                                            />
                                        );
                                    })}
                                </Picker>

                                {errors.processUrl && (
                                    <Text style={styles.error}>{errors.processUrl.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="slot"
                        rules={{ required: 'Select Slot' }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.inputContainer}>
                                <InputLabel>Select Slot</InputLabel>
                                <Picker
                                    style={styles.input}
                                    selectedValue={value}
                                    onValueChange={onChange}>
                                    <Picker.Item label="-- Select --" />
                                    {allotmentDetails.map((_el, idx) => {
                                        return (
                                            <Picker.Item
                                                key={idx}
                                                label={`${_el.ai_collage_name} : ${_el.ai_slot_time}`}
                                                value={_el.ai_slot_number}
                                            />
                                        );
                                    })}
                                </Picker>

                                {errors.slot && (
                                    <Text style={styles.error}>{errors.slot.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="username"
                        rules={{ required: 'Username is required' }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.inputContainer}>
                                <InputLabel>Username</InputLabel>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Username"
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.username && (
                                    <Text style={styles.error}>{errors.username.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'Password is required' }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.inputContainer}>
                                <InputLabel>Password</InputLabel>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.username && (
                                    <Text style={styles.error}>{errors.password.message}</Text>
                                )}
                            </View>
                        )}
                    />
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                        }}>
                        <BtnPrimary title={'Login'} onPress={handleSubmit(onSubmit)} />

                        <BtnSecondary
                            title={'Refresh'}
                            onPress={() => {
                                reset(defaultLoginFormValue);
                                getProcessList();
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
