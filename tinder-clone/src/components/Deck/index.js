import React, { PureComponent } from 'react';
import _ from 'lodash';
import {
	View,
	Text,
	Animated,
	PanResponder,
	Dimensions,
	LayoutAnimation,
	UIManager,
	Platform,
} from 'react-native';

import styles from './styles';

const { width } = Dimensions.get('window');
const swipe_threshold = 0.25 * width;
const swipe_out_duration = 400;
const initial_x_position = 0;
const initial_y_position = 10;
class Deck extends PureComponent {

	constructor(props) {
		super(props);

		const position = new Animated.ValueXY();
		position.setValue({x: initial_x_position, y: initial_y_position});
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (event, desture) => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx + initial_x_position, y: gesture.dy +initial_y_position });
			},
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx > swipe_threshold) {
					this.forceSwipe('right');
				} else if (gesture.dx < -swipe_threshold) {
					this.forceSwipe('left');
				} else {
					this.resetPosition();
				}
			}
		});
		this.state = { position, index: this.props.initialIndex };
	};

	componentDidUpdate(nextProps) {
		if (nextProps.data != this.props.data) this.setState({index: 0});

		UIManager.setLayoutAnimationEnabledExperimental &&
		UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.spring();
	}

	forceSwipe = (direction) => {
		Animated.timing(this.state.position, {
			toValue: { 
				x: direction === 'right' ? width : -width, 
				y: 0
			},
			duration: swipe_out_duration
		}).start(() => this.onSwipeComplete(direction));
	}

	onSwipeComplete = (direction) => {
		const { onSwipeRight, onSwipeLeft, data } = this.props;
		const item = data[this.state.index];

		direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
		this.state.position.setValue({ x: initial_x_position, y: initial_y_position });
		this.setState({ index: this.state.index + 1 });
	}

	resetPosition = () => {
		Animated.spring(this.state.position, {
			toValue: { x: initial_x_position, y: initial_y_position }
		}).start();
	}

	getCardStyle = () => {
		const { position } = this.state;

		const rotate = position.x.interpolate({
			inputRange: [-width, 0, width],
			outputRange: ['-90deg', '0deg', '90deg']
		});

		const opacity = position.x.interpolate({
			inputRange: [-width, 0, width],
			outputRange: [0, 1, 0]
		});

		return {
			...position.getLayout(),
			transform: [{ rotate }],
			opacity
		};
	}

	renderItems = () => {
		const length = this.props.data.length;
		if (this.state.index >= length) {
			return this.props.renderNoMoreCards();
		}

		return (
			_.map(this.props.data, (item, i) => {
				if(i < this.state.index) return null
				if (i === this.state.index) {
					return (
						<Animated.View
							key={item.id}
							style={[this.getCardStyle(), styles.animatedCard]}
							{...this.panResponder.panHandlers}
						>
							{this.props.renderItem(item)}
						</Animated.View>
					);
				}
				return (
					<Animated.View
						key={item.id}
						style={[
							styles.animatedCard,
							{ top: 10 * ( i - this.state.index ) + initial_y_position }
						]}
					>
						{this.props.renderItem(item)}
					</Animated.View>
				);
			}).reverse()
		);
	};

	render() {
		return (
			<View>
				{this.renderItems()}
			</View>
		);
	};
};

Deck.defaultProps = {
	initialIndex: 0,
	onSwipeRight: () => {},
	onSwipeLeft: () => {},
	renderNoMoreCards: () => {}
}

export default Deck;