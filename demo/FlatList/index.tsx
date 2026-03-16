import { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Button,
} from 'react-native';
import { default as Text } from '../../components/ThemeText';
import {
  calendarDates,
  type CalendarDate,
  getDayOfYear,
} from '../data/calendar';

type ItemProps = {
  index: number;
  item: CalendarDate;
  onPress: () => void;
  onShowUnderlay: () => void;
  onHideUnderlay: () => void;
  backgroundColor: string;
  color: string;
};

const DATA: CalendarDate[] = calendarDates;

const Separator = ({ highlighted }: { highlighted: boolean }) => (
  <View
    style={[styles.separator, highlighted && styles.separatorHighlighted]}
  />
);

const Item = ({
  index,
  item,
  onPress,
  onShowUnderlay,
  onHideUnderlay,
  backgroundColor,
  color,
}: ItemProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="green"
      onPress={onPress}
      onShowUnderlay={onShowUnderlay}
      onHideUnderlay={onHideUnderlay}
      style={styles.item}
    >
      <View style={{ backgroundColor }}>
        <Text style={[styles.title, { color }]}>
          ({index + 1}) {item.date}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default function Demo() {
  const [selectedId, setSelectedId] = useState<number>();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [reachEnd, setReachEnd] = useState<boolean>(false);
  const listRef = useRef<FlatList>(null);

  const renderItem = ({
    item,
    index,
    separators,
  }: {
    item: CalendarDate;
    index: number;
    separators: {
      highlight: () => void;
      unhighlight: () => void;
      updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
    };
  }) => {
    const backgroundColor = item.id === selectedId ? '#0ead69' : '#bdd5ea';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        index={index}
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setCurrentDate(item.date);
        }}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>当前选中日期：{currentDate}</Text>
      <FlatList
        ref={listRef}
        contentContainerStyle={styles.flatList}
        data={DATA}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        extraData={selectedId}
        ListHeaderComponent={<Text style={styles.title}>2016年 日历</Text>}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListFooterComponent={
          <Text style={styles.title}>{reachEnd ? '到底了~' : 'End'}</Text>
        }
        ListFooterComponentStyle={styles.listFooterComponentStyle}
        onEndReached={() => {
          console.log('到底了~');
          if (!reachEnd) {
            setReachEnd(true);
            setTimeout(() => {
              setReachEnd(false);
            }, 2000);
          }
        }}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
        }}
        refreshing={refreshing}
        progressViewOffset={-10}
        getItemLayout={(data, index) => {
          return { length: 76.3, offset: 76.3 * index, index };
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="今天"
          color="#06d6a0"
          onPress={() => {
            listRef.current?.scrollToIndex({
              index: getDayOfYear(),
              // animated: true,
              viewPosition: 0.5,
            });
          }}
        />
        <Button
          title="滚到顶部"
          color="#06d6a0"
          onPress={() => {
            listRef.current?.scrollToIndex({
              index: 0,
              // animated: true,
              viewPosition: 0,
            });
          }}
        />
        <Button
          title="滚到底部"
          color="#06d6a0"
          onPress={() => {
            listRef.current?.scrollToEnd();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#073b4c',
  },
  flatList: {
    borderWidth: 1,
    borderColor: '#577399',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  separator: {
    borderBottomColor: 'cadetblue',
    borderBottomWidth: 1,
  },
  separatorHighlighted: {
    borderBottomColor: '#377d22cc',
  },
  listHeaderComponentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterComponentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});
