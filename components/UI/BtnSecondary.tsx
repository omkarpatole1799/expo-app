import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { styles } from '@/constants/styles';

interface BtnSecondaryPropsInterface {
    title: string | React.ReactNode;
    onPress: () => void;
    styleForWrapper?: ViewStyle;
    styleForChildren?: TextStyle | {};
    disabled?: boolean;
}

const BtnSecondary: React.FC<BtnSecondaryPropsInterface> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.buttonBase, styles.buttonSecondary]}>{title}</Text>;
        </TouchableOpacity>
    );
};

export default BtnSecondary;
