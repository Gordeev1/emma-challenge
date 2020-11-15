import React, { useCallback } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useLinkedSnapLists, IUseLinkedSnapListsPayload } from './useLinkedSnapLists';
import {
	HorizontalList,
	VerticalList,
	VerticalItemContainer,
	HorizontalItemContainer,
} from './styled';

export type IRenderLinkedSnapListItemPayload<T> = T &
	Pick<IUseLinkedSnapListsPayload, 'transX' | 'scrollToIndex'>;

interface IProps<T> {
	data: T[];
	keyExtractor: (item: T) => string;
	verticalItemHeight: Animated.SharedValue<number>;
	horizontalItemWidth: Animated.SharedValue<number>;
	renderHorizontalListItem: (
		payload: IRenderLinkedSnapListItemPayload<T>,
		index: number,
	) => JSX.Element;
	renderVerticalListItem: (
		payload: IRenderLinkedSnapListItemPayload<T>,
		index: number,
	) => JSX.Element;
	horizontalListStyle?: ViewStyle;
	horizontalListContentContainerStyle?: ViewStyle;
	verticalListStyle?: ViewStyle;
	verticalListContentContainerStyle?: ViewStyle;
}

export default function LinkedSnapLists<T>({
	data,
	keyExtractor,
	verticalItemHeight,
	horizontalItemWidth,
	renderHorizontalListItem,
	renderVerticalListItem,
	horizontalListStyle,
	horizontalListContentContainerStyle,
	verticalListStyle,
	verticalListContentContainerStyle,
}: IProps<T>) {
	const {
		horizontalListRef,
		verticalListRef,
		horizontalScrollHandler,
		verticalScrollHandler,
		transX,
		scrollToIndex,
	} = useLinkedSnapLists({
		verticalItemHeight,
		horizontalItemWidth,
	});

	const horizontalItemStyles = useAnimatedStyle(() => ({ width: horizontalItemWidth.value }));

	const _renderHorizontalListItem = useCallback(
		(item: T, index: number) => (
			<HorizontalItemContainer key={keyExtractor(item)} style={horizontalItemStyles}>
				{renderHorizontalListItem({ ...item, transX, scrollToIndex }, index)}
			</HorizontalItemContainer>
		),
		[keyExtractor, renderHorizontalListItem, horizontalItemStyles, scrollToIndex, transX],
	);

	const verticalItemStyles = useAnimatedStyle(() => ({ height: verticalItemHeight.value }));

	const _renderVerticalListItem = useCallback(
		(item: T, index: number) => (
			<VerticalItemContainer key={keyExtractor(item)} style={verticalItemStyles}>
				{renderVerticalListItem({ ...item, transX, scrollToIndex }, index)}
			</VerticalItemContainer>
		),
		[keyExtractor, renderVerticalListItem, verticalItemStyles, scrollToIndex, transX],
	);

	return (
		<>
			<HorizontalList
				ref={horizontalListRef}
				scrollEventThrottle={1}
				horizontal
				showsHorizontalScrollIndicator={false}
				snapToInterval={horizontalItemWidth.value}
				onScroll={horizontalScrollHandler}
				itemWidth={horizontalItemWidth.value}
				style={horizontalListStyle}
				containerStyle={horizontalListContentContainerStyle}
			>
				{data.map(_renderHorizontalListItem)}
			</HorizontalList>
			<VerticalList
				ref={verticalListRef}
				scrollEventThrottle={1}
				snapToInterval={verticalItemHeight.value}
				decelerationRate="fast"
				onScroll={verticalScrollHandler}
				style={verticalListStyle}
				containerStyle={verticalListContentContainerStyle}
			>
				{data.map(_renderVerticalListItem)}
			</VerticalList>
		</>
	);
}
