import { styles } from '@/constants/styles';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface BtnSecondaryPropsInterface {
    title: string | React.ReactNode;
    onPress: () => void;
    styleForWrapper?: ViewStyle;
    styleForChildren?: TextStyle | {};
    disabled?: boolean;
}

const BtnSecondary: React.FC<BtnSecondaryPropsInterface> = ({
    title,
    onPress,
    styleForWrapper,
    styleForChildren,
    disabled,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styleForWrapper, disabled ? styles.disabledButton : '']}>
            <Text style={[styles.buttonBase, styles.buttonSecondary, styleForChildren]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default BtnSecondary;
