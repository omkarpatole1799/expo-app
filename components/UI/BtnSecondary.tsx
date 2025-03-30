import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '@/constants/styles';

const BtnSecondary = ({ children, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[styles.buttonBase, styles.buttonSecondary]}>{children}</Text>;
		</TouchableOpacity>
	);
};

export default BtnSecondary;
