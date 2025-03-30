import {
	View,
	Text,
	TouchableOpacity,
	ViewStyle,
	TextStyle,
} from 'react-native';
import React from 'react';
import { styles } from '@/constants/styles';

interface BtnPrimaryPropsInterface {
	children: React.ReactNode;
	onPress: () => void;
	styleForWrapper: ViewStyle;
	styleForChildren: TextStyle | {};
	disabled: boolean;
}

const BtnPrimary: React.FC<BtnPrimaryPropsInterface> = ({
	children,
	onPress,
	styleForWrapper,
	styleForChildren,
	disabled,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styleForWrapper, disabled ? styles.disabledButton : '']}
			disabled={disabled}
		>
			<Text style={[styles.buttonBase, styles.buttonPrimary, styleForChildren]}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export default BtnPrimary;
