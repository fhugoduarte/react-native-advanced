import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Deck from '../../components/Deck';
import Card from '../../components/Card';
import NoMoreCards from '../../components/NoMoreCards';
import data from '../../util/cardsData';

import styles from './styles';

const home = () => (
	<View>
		<View style={styles.titleContainer}>
			<Text style={styles.title}>
				Tinder Clone
			</Text>
			<Icon
				name="heartbeat"
				type="font-awesome"
				color="#8B0000"
			/>
		</View>
		<Deck
			data={data}
			renderItem={Card}
			renderNoMoreCards={NoMoreCards}
		/>
	</View>
);

export default home;