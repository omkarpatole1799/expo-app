import { Link } from 'expo-router';
import React from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TextInputBase,
	View,
} from 'react-native';

export default function Index() {
	return (
		<View
			style={{
				marginTop: 40,
				padding: 10,
				height: 100,
				borderBlockColor: 'bold',
				borderColor: 'black',
			}}
		>
			<Text style={styles.titleLogin}>Login</Text>

			<Text style={styles.textStyles}>Please login to your account</Text>
			<TextInput
				style={styles.input}
				placeholder="eg john@gmail.com"
				keyboardType="default"
			/>

			<TextInput
				style={styles.input}
				placeholder="********"
				keyboardType="default"
			/>

			<Link href={'/products'}>View1 Product</Link>
			<Button title="Login" color="black" />
		</View>
	);
}

const styles = StyleSheet.create({
	textStyles: {
		fontSize: 20,
	},
	titleLogin: {
		color: 'blue',
		fontSize: 30,
		fontWeight: 'bold',
	},
	input: {
		borderRadius: 6,
		marginBottom: 20,
		borderWidth: 1,
		padding: 30,
	},
	Button: {
		padding: 30,
	},
});
