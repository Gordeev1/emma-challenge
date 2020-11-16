# LinkedSnapLists

## Features

-   Linking scroll position between horizontal and vertical lists.
-   Enabling weak paging between items

## Usage

-   Basic

```typescript
import { useSharedValue } from 'react-native-reanimated';

interface IExampleItem {
	id: string;
	name: string;
}

export default function ExampleLinkedSnapLists() {
	const verticalItemHeight = useSharedValue(500);
	const horizontalItemWidth = useSharedValue(100);
	return (
		<LinkedSnapLists<IExampleItem>
			verticalItemHeight={verticalItemHeight}
			horizontalItemWidth={horizontalItemWidth}
			data={[
				{ id: 1, name: 'Artem' },
				{ id: 2, name: 'Boris' },
			]}
			keyExtractor={({ id }) => id}
			horizontalListContentContainerStyle={{ paddingVertical: 20 }}
			renderHorizontalListItem={({ name }) => (
				<View
					style={{
						height: 50,
						backgroundColor: 'blue',
						marginHorizontal: 15,
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: 'white', textAlign: 'center' }}>{name[0]}</Text>
				</View>
			)}
			renderVerticalListItem={({ name }) => (
				<View style={{ backgroundColor: 'red', paddingVertical: 100 }}>
					<Text style={{ color: 'white', textAlign: 'center' }}>{name}</Text>
				</View>
			)}
		/>
	);
}
```

-   With `scrollToIndex` usage

```jsx

<LinkedSnapLists
    renderVerticalListItem={({ scrollToIndex }) => <TouchableOpacity onPress=(() => scrollToIndex(2)) />}
/>

```

-   With scroll position usage

```jsx
import Animated from 'react-native-reanimated';

<LinkedSnapLists
	renderVerticalListItem={({ transX }) => {
		const style = useAnimatedStyle(() => ({ transform: [{ translateX: transX.value }] }));
		return <Animated.View style={style} />;
	}}
/>;
```
