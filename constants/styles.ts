import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#f4f4f4',
		// backgroundColor : 'red'
	},

	// CAMERA RELATED STYLES
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	// Full-screen camera
	fullScreenCamera: {
		flex: 1,
		width: '100%', // Ensures it takes full width
		height: '100%', // Ensures it takes full height
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 40, // 20px from the bottom of the screen
		left: 20,
		right: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},

	flipButton: {
		backgroundColor: '#007BFF', // Blue color for flip action
	},

	scannerButton: {
		paddingVertical: 16, // Vertical padding for appropriate height
		paddingHorizontal: 64, // Horizontal padding for appropriate width
		borderRadius: 25, // Rounded corners
		alignItems: 'center', // Center the content horizontally
		justifyContent: 'center', // Center the content vertically
		minWidth: 120, // Ensure buttons are at least this wide
	},

	// Text style for both buttons
	text: {
		color: '#FFF',
		fontSize: 14, // Reasonable font size
		fontWeight: '600', // Slightly bold for better visibility
	},

	scannerButtonText: {
		color: '#FFF',
	},
	// -------------------------

	scrollContainer: {
		flexGrow: 1, // Ensure scrollable content takes full available height
		// backgroundColor: 'red',
		paddingBottom: 70, // Add some bottom space to prevent the last item from being hidden behind the button
	},

	scrollView: {
		flex: 1, // This ensures it takes the remaining space
		width: '100%', // Ensures it stretches across the full width
	},
	ticket: {
		width: '100%',
		backgroundColor: '#fff',
		padding: 20,
		// borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		marginBottom: 2,
		marginTop: 1,
		alignSelf: 'center', // This will center the ticket view horizontally
	},

	header: {
		alignItems: 'center',
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 16,
		color: '#555',
	},
	details: {
		marginBottom: 20,
	},
	detailRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 5,
		marginBottom: 5, // Add space between rows
	},

	signContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 5,
		marginBottom: 5, // Add space between rows
	},
	detailLabel: {
		fontWeight: 'bold',
		flex: 0.4, // Give more space to the label side
		textAlign: 'left', // Ensure label text is aligned to the left
	},
	detailValue: {
		color: '#555',
		flex: 0.6, // The value takes up the remaining space
		flexWrap: 'wrap', // Ensure long text wraps instead of overflowing
		maxWidth: '90%', // Set max width to allow wrapping without overflowing
		textAlign: 'left', // Left-align the value
	},
	photoAndSignContainer: {
		flexDirection: 'row', // This will place the images side by side
		justifyContent: 'space-between',
		marginVertical: 10,
		width: '100%',
		paddingHorizontal: 10, // Add some padding to the sides
		position: 'relative'
	},

	photo: {
		width: 150,
		height: 180,
		borderRadius: 5,
		backgroundColor: '#ccc',
		position: 'relative',
	},

	signWrapper: {
		width: 300,
		height: 80,
		borderRadius: 5,
		borderColor: 'black',
		// backgroundColor: '#ccc',
		// backgroundColor: 'red',
	},
	signPhoto: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	signatureSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 30,
	},
	signatureBox: {
		width: '45%',
		height: 50,
		borderTopWidth: 1,
		borderTopColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	buttonWrapper: {
		width: '100%',
		position: 'absolute',
		bottom: 10,
		alignItems: 'center',
		// backgroundColor: 'green',
	},
	buttonBase: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	approveButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},

	disabledButton: {
		backgroundColor: '#ddd', // Lighter color when disabled
	},

	disabledText: {
		color: '#aaa', // Lighter text color when disabled
	},

	snapButton: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},

	closeButton: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonPrimary: {
		backgroundColor: '#009966',
	},

	buttonSecondary: {
		backgroundColor: '#006045',
	},

	buttonDanger: {
		backgroundColor: '#fb2c36',
	},

	snapButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	// message: {
	// 	textAlign: 'center',
	// 	paddingBottom: 10,
	// },
	// camera: {
	// 	flex: 1,
	// },
	// buttonContainer: {
	// 	position: 'absolute',
	// 	bottom: 40,
	// 	left: 20,
	// 	right: 20,
	// 	flexDirection: 'row',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// },
	// buttonWrapper: {
	// 	marginTop: 'auto',
	// },
	buttonStyles: {
		backgroundColor: '#0ea5e9',
		padding: 10,
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 8,
	},
	scanQRButtonCenter: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: '#0ea5e9',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	scanQRButton: {
		backgroundColor: '#0ea5e9',
		paddingVertical: 12,
		paddingHorizontal: 30,
		color: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	scanQRButtonText: {
		color: 'white',
		fontWeight: '500',
		fontSize: 20,
		textTransform: 'uppercase',
		letterSpacing: 0,
		textAlign: 'center',
	},
	// scannerButton: {
	// 	paddingVertical: 16,
	// 	paddingHorizontal: 15,
	// 	borderRadius: 25,
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	minWidth: 120,
	// },
	// flipButton: {
	// 	backgroundColor: '#007BFF',
	// 	display: 'none',
	// },
	// closeButton: {
	// 	backgroundColor: '#DC3545',
	// },
	// text: {
	// 	color: '#FFF',
	// 	fontSize: 14,
	// 	fontWeight: '600',
	// },
	// scannerButtonText: {
	// 	color: '#FFF',
	// },
	textStyles: {
		fontSize: 20,
	},
	titleLogin: {
		color: 'blue',
		fontSize: 30,
		fontWeight: 'bold',
	},

	// header: { fontSize: 28,
	// 	fontWeight: 'bold',
	// 	color: '#333',
	// 	marginBottom: 8,
	// 	textAlign: 'center',
	// },
	inputContainer: {
		position: 'relative',
		width: '100%',
		marginBottom: 26,
	},
	input: {
		height: 50,
		borderColor: '#ccc',
		// borderWidth: 1,
		paddingLeft: 12,
		borderRadius: 6,
		fontSize: 16,
		backgroundColor: '#fff',
		marginBottom: 20,
	},

	error: {
		position: 'absolute',
		color: '#ff4d4d',
		fontSize: 12,
		bottom: -19,
	},
});
