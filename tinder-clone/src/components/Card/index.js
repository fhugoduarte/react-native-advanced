import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import styles from './styles';

const card = (item) => (
	<Card
		key={item.id}
		image={{uri: item.uri}}
	>
		<Text style={styles.cardTitle}>
			{item.text}
		</Text>
		<Button
			title="View Now!"
			icon={{name: 'eye', type: 'font-awesome'}}
			backgroundColor="#03A9F4"
		/>
	</Card>
);

export default card;