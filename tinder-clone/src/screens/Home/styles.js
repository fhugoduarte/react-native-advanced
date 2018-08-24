import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: Platform.OS === 'ios' ? 35 : 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 3
    },
	title: {
        fontSize: 20,
        color: '#8B0000',
        fontWeight: 'bold',
	}
});

export default styles;