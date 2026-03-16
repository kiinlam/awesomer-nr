import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import { calendarDates } from '../data/calendar';
import { useRef } from 'react';

let DATA: { title: string; data: string[] }[] = [];
for (let i = 1, len = 6; i <= len; i++) {
  DATA.push({
    title: `${i}月`,
    data: calendarDates
      .filter(item => {
        const arr = item.date.split(' ');
        return arr[1] === `${i}月`;
      })
      .map(item => item.date),
  });
}

export default function Demo() {
  const sectionListRef = useRef<SectionList>(null);

  return (
    <View style={styles.container}>
      <SectionList
        ref={sectionListRef}
        sections={DATA}
        indicatorStyle="black"
        // initialNumToRender={10}
        // extraData={}
        // inverted={true}
        // ItemSeparatorComponent={<Text>-ItemSeparator-</Text>}
        // SectionSeparatorComponent={<Text>-SectionSeparator-</Text>}
        getItemLayout={(data, index) => {
          return { length: 50, offset: 50 * index, index };
        }}
        ListEmptyComponent={<Text>没有数据</Text>}
        ListHeaderComponent={
          <Button
            title="滚动到底部"
            color="#06d6a0"
            onPress={() => {
              sectionListRef.current?.scrollToLocation({
                sectionIndex: 5,
                itemIndex: 30,
                viewPosition: 1,
              });
              sectionListRef.current?.recordInteraction();
            }}
          />
        }
        ListFooterComponent={
          <Button
            title="滚动到顶部"
            color="#06d6a0"
            onPress={() => {
              sectionListRef.current?.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0,
                viewPosition: 0,
              });
              sectionListRef.current?.recordInteraction();
            }}
          />
        }
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title} - 开始</Text>
        )}
        renderSectionFooter={({ section: { title } }) => (
          <Text style={styles.header}>{title} - 结束</Text>
        )}
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
    padding: 8,
    backgroundColor: '#118ab2',
  },
  title: {
    fontSize: 18,
    color: '#b3dee2',
  },
  header: {
    padding: 8,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#073b4c',
    color: '#ffd166',
  },
});
