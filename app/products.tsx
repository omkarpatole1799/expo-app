import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Products() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then((resp) => resp.json())
			.then((data) => setProducts(data))
			.catch((err) => console.log(err));
	}, []);
	return (
		<ScrollView>
			{products &&
				products.map((product, idx) => {
					return (
						<View style={styles.card} key={idx}>
							<View
								style={{
									paddingBottom: 20,
								}}
							>
								<Text>{product.id}</Text>
								<Text>{product.title}</Text>
								<Text>{product.description}</Text>
								<Image
									source={{ uri: product.image }}
									style={{ width: 50, height: 50 }}
								/>
							</View>
						</View>
					);
				})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#f0f0f0',
		padding: 20,
		display: 'flex',
		width: '100%',
		marginBottom: 20,
	},
});
