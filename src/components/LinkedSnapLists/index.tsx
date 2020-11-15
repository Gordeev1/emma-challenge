import React, { useCallback, useEffect } from 'react';
import { ViewStyle, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useLinkedSnapLists, IUseLinkedSnapListsPayload } from './useLinkedSnapLists';
import {
	HorizontalList,
	VerticalList,
	VerticalItemContainer,
	HorizontalItemContainer,
} from './styled';

export type IRenderLinkedSnapListItemPayload<T = {}> = T &
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
	UNSAFE_renderHorizontalListChildren?: (
		payload: IRenderLinkedSnapListItemPayload,
	) => JSX.Element | null;
	UNSAFE_renderVerticalListChildren?: (
		payload: IRenderLinkedSnapListItemPayload,
	) => JSX.Element | null;
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
	UNSAFE_renderHorizontalListChildren,
	UNSAFE_renderVerticalListChildren,
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

	useEffect(() => {
		if (UNSAFE_renderHorizontalListChildren || UNSAFE_renderVerticalListChildren) {
			console.log(
				"Please use 'UNSAFE_renderHorizontalListChildren' / 'UNSAFE_renderVerticalListChildren' with absolute position only, otherwise, it may break the layout",
			);
		}
	}, [UNSAFE_renderHorizontalListChildren, UNSAFE_renderVerticalListChildren]);

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
		<View>
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
				{UNSAFE_renderHorizontalListChildren &&
					UNSAFE_renderHorizontalListChildren({ transX, scrollToIndex })}
				{data.map(_renderHorizontalListItem)}
			</HorizontalList>
			<VerticalList
				ref={verticalListRef}
				scrollEventThrottle={1}
				snapToInterval={verticalItemHeight.value}
				decelerationRate="fast"
				onScroll={verticalScrollHandler}
				style={[{ height: verticalItemHeight.value }, verticalListStyle]}
				containerStyle={verticalListContentContainerStyle}
			>
				{UNSAFE_renderVerticalListChildren &&
					UNSAFE_renderVerticalListChildren({ transX, scrollToIndex })}
				{data.map(_renderVerticalListItem)}
			</VerticalList>
		</View>
	);
}
