import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import styles from './styles';

const noMoreCards = () => (
	<Card
		title="All Done!"
	>
		<Text style={styles.cardTitle}>
			There's no more content here!
		</Text>
		<Button
			title="Get More!"
			backgroundColor="#03A9F4"
		/>
	</Card>
);

export default noMoreCards;