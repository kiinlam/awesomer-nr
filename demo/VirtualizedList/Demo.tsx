import { Button, VirtualizedList, StyleSheet, Text, View } from 'react-native';
import { calendarDates } from '../data/calendar';
import { useRef } from 'react';

export function Demo() {
  const VirtualizedListRef = useRef<VirtualizedList<any>>(null);

  return (
    <View style={styles.container}>
      <VirtualizedList
        ref={VirtualizedListRef}
        keyExtractor={item => item.id}
        indicatorStyle="black"
        // initialNumToRender={10}
        // extraData={}
        // inverted={true}
        // ItemSeparatorComponent={<Text>-ItemSeparator-</Text>}
        // getItemLayout={(data, index) => {
        //   return { length: 45.7, offset: 45.7 * index, index };
        // }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.date}</Text>
          </View>
        )}
        getItem={(data, index) => calendarDates[index]}
        getItemCount={() => calendarDates.length}
        ListEmptyComponent={<Text>没有数据</Text>}
        ListHeaderComponent={
          <Button
            title="滚动到底部"
            onPress={() => {
              VirtualizedListRef.current?.scrollToEnd();
              VirtualizedListRef.current?.recordInteraction();
            }}
          />
        }
        ListFooterComponent={
          <Button
            title="滚动到顶部"
            onPress={() => {
              VirtualizedListRef.current?.scrollToIndex({
                index: 0,
                viewPosition: 0,
              });
              VirtualizedListRef.current?.recordInteraction();
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  item: {
    padding: 12,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 18,
  },
  header: {
    padding: 8,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'palevioletred',
    color: 'lightpink',
  },
});
