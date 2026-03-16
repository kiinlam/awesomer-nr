import { Button, ScrollView, StyleSheet, View } from 'react-native';
import {
  calendarDates,
  type CalendarDate,
  getDayOfYear,
} from '../data/calendar';
import { useRef, useState } from 'react';
import { default as Text } from '../../components/ThemeText';

// 未来 N 天
const n = 60;
const startDay = getDayOfYear();
const data: CalendarDate[] = calendarDates.slice(startDay, startDay + n);

export default function Demo() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [logList, setLogList] = useState<string[]>([]);
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        // indicatorStyle="black"
        // pagingEnabled={true}
        onMomentumScrollBegin={() =>
          setLogList(prev => ['Momentum Scroll Begin', ...prev].splice(0, n))
        }
        onMomentumScrollEnd={() =>
          setLogList(prev => ['Momentum Scroll End', ...prev].splice(0, n))
        }
        onScrollBeginDrag={() =>
          setLogList(prev => ['Scroll Begin Drag', ...prev].splice(0, n))
        }
        onScrollEndDrag={() =>
          setLogList(prev => ['Scroll End Drag', ...prev].splice(0, n))
        }
        onScrollToTop={() =>
          setLogList(prev => ['Scroll to Top', ...prev].splice(0, n))
        }
      >
        <Button
          title="滚动到底部"
          color="#06d6a0"
          onPress={() => {
            scrollViewRef.current?.flashScrollIndicators();
            scrollViewRef.current?.scrollToEnd();
          }}
        />
        {data.map(item => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemText}>{item.date}</Text>
          </View>
        ))}
        <Button
          title="滚动到顶部"
          color="#06d6a0"
          onPress={() => {
            scrollViewRef.current?.flashScrollIndicators();
            scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
          }}
        />
      </ScrollView>
      <View style={styles.rightView}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          overScrollMode="always"
          indicatorStyle="black"
        >
          <View style={styles.logHeadView}>
            <Text style={styles.logTitle}>滚动事件记录</Text>
            <Button title="清除" color="tomato" onPress={() => setLogList([])} />
          </View>
          {logList.map((log, index) => (
            <Text key={index} style={styles.logText}>
              {log}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  scrollContainer: {
    backgroundColor: '#073b4c',
    padding: 8,
  },
  item: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: '#118ab2',
    marginVertical: 4,
  },
  itemText: {
    color: '#b3dee2',
    paddingLeft: 8,
  },
  rightView: {
    flex: 1,
    backgroundColor: '#073b4c',
    padding: 4,
  },
  logHeadView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd166',
  },
  logText: {
    paddingVertical: 8,
  },
});
