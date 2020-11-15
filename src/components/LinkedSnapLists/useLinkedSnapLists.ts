import { useCallback } from 'react';
import Animated, {
	useSharedValue,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useDerivedValue,
	scrollTo,
} from 'react-native-reanimated';
import { isIOS } from '@constants';

interface IParams {
	verticalItemHeight: Animated.SharedValue<number>;
	horizontalItemWidth: Animated.SharedValue<number>;
}

export type IUseLinkedSnapListsPayload = ReturnType<typeof useLinkedSnapLists>;

export const useLinkedSnapLists = ({ verticalItemHeight, horizontalItemWidth }: IParams) => {
	const horizontalListRef = useAnimatedRef<Animated.ScrollView>();
	const verticalListRef = useAnimatedRef<Animated.ScrollView>();
	const verticalScrolling = useSharedValue(false);

	const transY = useSharedValue(0);
	const transX = useSharedValue(0);

	const horizontalScrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			transX.value = event.contentOffset.x;
		},
	});

	const verticalScrollHandler = useAnimatedScrollHandler({
		onScroll: ({ contentOffset }) => {
			transY.value = contentOffset.y;
			if (isIOS) {
				transX.value =
					(contentOffset.y / verticalItemHeight.value) * horizontalItemWidth.value;
			}
		},
		onBeginDrag: () => {
			verticalScrolling.value = true;
		},
		onMomentumEnd: () => {
			verticalScrolling.value = false;
		},
	});

	useDerivedValue(() => {
		if (!verticalScrolling.value) {
			const y = (transX.value / horizontalItemWidth.value) * verticalItemHeight.value;
			scrollTo(verticalListRef, 0, y, false);
		}

		return {};
	});

	useDerivedValue(() => {
		const x = (transY.value / verticalItemHeight.value) * horizontalItemWidth.value;
		scrollTo(horizontalListRef, x, 0, false);

		return {};
	});

	const indexToScroll = useSharedValue<null | number>(null);

	useDerivedValue(() => {
		if (indexToScroll.value !== null) {
			const x = indexToScroll.value * horizontalItemWidth.value;
			scrollTo(horizontalListRef, x, 0, true);
		}
		return {};
	});

	const scrollToIndex = useCallback(
		(index: number) => {
			indexToScroll.value = index;
		},
		[indexToScroll.value],
	);

	return {
		horizontalListRef,
		verticalListRef,
		horizontalScrollHandler,
		verticalScrollHandler,
		scrollToIndex,
		transY,
		transX,
	};
};
