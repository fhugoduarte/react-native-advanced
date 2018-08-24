import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	animatedCard: {
		position: 'absolute',
		width
	}
});

export default styles;