import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

const card = (item) => (
	<Card
		key={item.id}
		image={{uri: item.uri}}
	>
		<Text style={{fontWeight: 'bold', color: '#0000004C', paddingLeft: 12, paddingBottom: 30, paddingTop: 5,  fontSize: 20}}>{item.text}</Text>
		<Button
			title="View Now!"
			icon={{name: 'eye', type: 'font-awesome'}}
			backgroundColor="#03A9F4"
		/>
	</Card>
);

export default card;