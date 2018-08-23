import React, { PureComponent } from 'react';
import _ from 'lodash';
import {
	View,
	Text,
	Animated,
	PanResponder,
	Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

class Deck extends PureComponent {

	constructor(props) {
		super(props);

		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy });
			},
			onPanResponderRelease: () => {}
		});

		this.state = { panResponder, position };
	}

	getCardStyle = () => {
		const { position } = this.state;

		const rotate = position.x.interpolate({
			inputRange: [-width, 0, width],
			outputRange: ['-120', '0', '120']
		});

		return {
			...position.getLayout(),
			transform: [{ rotate }]
		};
	}

	renderItems = () => {
		return _.map(this.props.data, item => 
			<Animated.View style={this.getCardStyle}>
				{this.props.renderItem(item));}
			</Animated.View>
	}

	render() {
		return (
			<View {...this.state.panResponder.panHandlers}>
				{this.renderItems()}
			</View>
		);
	};
};

export default Deck;