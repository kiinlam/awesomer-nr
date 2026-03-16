/**
 * Reanimated Swipeable
 * https://docs.swmansion.com/react-native-gesture-handler/docs/components/reanimated_swipeable#methods
 *
 * 参考来源：https://github.com/software-mansion/react-native-gesture-handler/blob/main/apps/common-app/src/new_api/components/swipeable/index.tsx
 */
import React, { useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { default as Text } from '../../components/ThemeText';
import { FlatList, Pressable, RectButton } from 'react-native-gesture-handler';

import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import GmailStyleSwipeableRow from './GmailStyleSwipeableRow';

import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

type DataRow = {
  name: string;
  when: string;
  desc: string;
};

const Row = ({ item }: { item: DataRow }) => (
  <RectButton style={styles.rectButton} onPress={() => Alert.alert(item.name)}>
    <Text style={styles.fromText}>{item.name}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {item.desc}
    </Text>
    <Text style={styles.dateText}>{item.when}</Text>
  </RectButton>
);

const SwipeableRow = ({ item, index }: { item: DataRow; index: number }) => {
  if (index < 3) {
    return (
      <AppleStyleSwipeableRow>
        <Row item={item} />
      </AppleStyleSwipeableRow>
    );
  } else {
    return (
      <GmailStyleSwipeableRow>
        <Row item={item} />
      </GmailStyleSwipeableRow>
    );
  }
};

function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('[L] showLeftProgress:', prog.value);
    console.log('[L] appliedTranslation:', drag.value - 60);

    return {
      transform: [{ translateX: drag.value - 60 }],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation]}>
      <View style={[styles.centered, styles.leftAction]}>
        <Text style={styles.actionText}>🚀</Text>
      </View>
    </Reanimated.View>
  );
}

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('[R] showRightProgress:', prog.value);
    console.log('[R] appliedTranslation:', drag.value + 60);

    return {
      transform: [{ translateX: drag.value + 60 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View style={[styles.centered, styles.rightAction]}>
        <Text style={styles.actionText}>🚁</Text>
      </View>
    </Reanimated.View>
  );
}

const Separator = () => <View style={styles.separator} />;

export default function Demo() {
  const reanimatedRef = useRef<SwipeableMethods>(null);
  return (
    <View>
      <Separator />

      <View style={styles.controlPanelWrapper}>
        <Text style={styles.fromText}>控制面板</Text>
        <View style={styles.controlPanel}>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.openLeft();
            }}
          >
            <Text>展开左侧</Text>
            <Text>openLeft()</Text>
          </Pressable>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.close();
            }}
          >
            <Text>关闭</Text>
            <Text>close()</Text>
          </Pressable>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.reset();
            }}
          >
            <Text>重置</Text>
            <Text>reset()</Text>
          </Pressable>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.openRight();
            }}
          >
            <Text>展开右侧</Text>
            <Text>openRight()</Text>
          </Pressable>
        </View>
      </View>

      <Separator />

      <ReanimatedSwipeable
        ref={reanimatedRef}
        containerStyle={styles.swipeable}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={LeftAction}
        renderRightActions={RightAction}
      >
        <Text>使用上方的控制面板进行操作</Text>
      </ReanimatedSwipeable>

      <Separator />
      <FlatList
        data={DATA}
        ItemSeparatorComponent={Separator}
        renderItem={({ item, index }) => (
          <SwipeableRow item={item} index={index} />
        )}
        keyExtractor={(_item, index) => `desc ${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rectButton: {
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#191919',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  messageText: {
    color: '#999',
  },
  dateText: {
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#666',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftAction: { width: 60, height: 60, backgroundColor: '#577399' },
  rightAction: { width: 60, height: 60, backgroundColor: '#540d6e' },
  actionText: { fontSize: 28 },
  swipeable: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlPanelWrapper: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  controlPanel: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#444444',
  },
  control: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(109, 109, 109)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DATA: DataRow[] = [
  {
    name: "《Warhammer 40K: Space Marine 2》",
    when: '3:11 PM',
    desc:
      '星际战士是帝皇麾下最出色的战士。你将体验到星际战士的超人技能和残暴手段。 利用你的致命能力和毁灭性武器，在遥远星球上展开史诗级战斗，镇压银河系的恐怖乱象。 揭露黑暗秘密，击退永夜威胁，证明你对人类的终极忠诚。',
  },
  {
    name: '《赛博朋克 2077》',
    when: '11:46 AM',
    desc:
      '《赛博朋克 2077》是一款开放世界动作冒险角色扮演游戏，故事发生在充满黑暗的未来城市夜之城。这是一座五光十色却危机四伏的大都会，权力更迭和永无休止的身体改造是不变的主题。',
  },
  {
    name: '《The Elder Scrolls V: Skyrim》',
    when: '6:06 AM',
    desc:
      '荣获超过 200 项年度游戏大奖的《The Elder Scrolls V: Skyrim》推出特别版，以令人惊叹的细致画面带来史诗奇幻巨作。 特别版内含大获好评的主游戏、附加内容，还有重制的艺术和特效、体积光效、动态景深、屏幕空间反射等全新功能。',
  },
  {
    name: '《巫师 3：狂猎 - 完全版》',
    when: '昨天',
    desc:
      '你是利维亚的杰洛特，收钱办事的怪物杀手。你可以在眼前这片怪物横行、饱受战火摧残的土地上尽情探索。你手上的委托？追踪预言之子——希里，一件足以改变世界面貌的活生生的武器。',
  },
  {
    name: '《光与影：33号远征队》',
    when: '2 天前',
    desc:
      '《光与影：33号远征队》这款回合制角色扮演游戏采用了特别的即时机制，开创了品类先河，战斗将带来前所未有的沉浸体验，必定让玩家欲罢不能。探索奇妙世界，感受法兰西19世纪末“美好年代”时期的风采，与强大的敌人展开殊死战斗。',
  },
  {
    name: "《霍格沃茨之遗》",
    when: ' 1 周前',
    desc:
      '《霍格沃茨之遗》是一款基于《哈利·波特》系列书籍设定的沉浸式开放世界动作角色扮演游戏。 在旅程中，你将造访那些熟悉的和陌生的地点，发现奇妙的野兽，自定义你的角色并制造魔药，掌握施放咒语的技巧，升级天赋并成为你所向往的巫师。',
  },
  {
    name: '《Monster Hunter Stories 3: 命运双龙》',
    when: '2 周前',
    desc:
      '“Monster Hunter”系列RPG第3弹！ 双龙降世，命运于此刻交织。 “Monster Hunter Stories”是一个RPG游戏系列， 玩家将会成为与怪物建立羁绊，对其加以培育并与之共存的“怪物骑士”，尽情体验“Monster Hunter”的世界。',
  },
];
