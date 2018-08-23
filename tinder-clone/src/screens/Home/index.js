import React from 'react';
import { View } from 'react-native';

import Deck from '../../components/Deck';
import Card from '../../components/Card';
import data from '../../util/cardsData';

const home = () => (
	<View>
		<Deck
			data={data}
			renderItem={Card}
		/>
	</View>
);

export default home;