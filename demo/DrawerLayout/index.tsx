/* eslint-disable react-native/no-inline-styles */
import { useCallback, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { default as Text } from '../../components/ThemeText';
import css from '../../styles/css';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'right',
  );
  const [drawerType, setDrawerType] = useState<
    'front' | 'back' | 'slide' | 'permanent'
  >('front');
  const [hideStatusBarOnOpen, setHideStatusBarOnOpen] = useState(true);
  const [statusBarAnimation, setStatusBarAnimation] = useState<
    'slide' | 'fade' | 'none'
  >('slide');
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  const DrawerContent = useCallback(() => {
    return (
      <View style={[css.p_16, css.gap_16]}>
        <Button title="关闭抽屉" onPress={() => setOpen(false)} />
        <View style={[css.flex_row, css.justify_between, css.items_center]}>
          <Text style={[css.dark]}>drawerPosition: {drawerPosition}</Text>
          <Button
            title="切换"
            onPress={() => {
              setDrawerPosition(prev => (prev === 'left' ? 'right' : 'left'));
            }}
          />
        </View>
        <View style={[css.flex_row, css.justify_between, css.items_center]}>
          <Text style={[css.dark]}>drawerType: {drawerType}</Text>
          <Button
            title="切换"
            onPress={() => {
              const list = ['front', 'back', 'slide', 'permanent'] as const;
              const next = list[(list.indexOf(drawerType) + 1) % list.length];
              setDrawerType(next);
            }}
          />
        </View>
        <View style={[css.flex_row, css.justify_between, css.items_center]}>
          <Text style={[css.dark]}>hideStatusBarOnOpen: {String(hideStatusBarOnOpen)}</Text>
          <Button
            title="切换"
            onPress={() => {
              setHideStatusBarOnOpen(prev => !prev);
            }}
          />
        </View>
        <View style={[css.flex_row, css.justify_between, css.items_center]}>
          <Text style={[css.dark]}>statusBarAnimation: {String(statusBarAnimation)}</Text>
          <Button
            title="切换"
            onPress={() => {
              const list = ['slide', 'fade', 'none'] as const;
              setStatusBarAnimation(
                prev => list[(list.indexOf(prev) + 1) % list.length],
              );
            }}
          />
        </View>
        <View style={[css.flex_row, css.justify_between, css.items_center]}>
          <Text style={[css.dark]}>swipeEnabled: {String(swipeEnabled)}</Text>
          <Button
            title="切换"
            onPress={() => {
              setSwipeEnabled(prev => !prev);
            }}
          />
        </View>
      </View>
    );
  }, [
    drawerPosition,
    drawerType,
    hideStatusBarOnOpen,
    statusBarAnimation,
    swipeEnabled,
  ]);

  return (
    <Drawer
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      renderDrawerContent={DrawerContent}
      drawerPosition={drawerPosition} // 抽屉位置，可选值：left, right
      drawerType={drawerType} // 抽屉类型，可选值：front, back, slide, permanent
      drawerStyle={{
        width: '68%',
        backgroundColor: 'silver',
      }}
      overlayStyle={{
        backgroundColor: 'rgba(100, 100, 100, 0.2)',
      }}
      hideStatusBarOnOpen={hideStatusBarOnOpen}
      statusBarAnimation={statusBarAnimation} // 状态栏动画，可选值：slide, fade, none
      swipeEnabled={swipeEnabled} // 是否启用滑动切换
    >
      <ScrollView
        style={[css.flex_1]}
        contentContainerStyle={[css.p_16, css.gap_24]}
      >
        <ExampleCard
          title="侧栏抽屉 Drawer"
          content={
            <View style={[css.gap_16]}>
              <Text>
                从屏幕左侧/右侧滑出的侧边栏，可自定义遮罩、侧栏样式，打开时可控制状态栏显示/隐藏
              </Text>
              <Button title="打开抽屉" onPress={() => setOpen(true)} />
            </View>
          }
          code={`<Drawer
    open={open}   // 是否打开抽屉
    onOpen={() => {
        setOpen(true);    // 打开后的回调
    }}
    onClose={() => {
        setOpen(false);     // 关闭的回调
    }}
    renderDrawerContent={() => {
        return <Button title="关闭抽屉" onPress={() => setOpen(false)} />   // 侧栏内容组件
    }}
    drawerPosition={drawerPosition}     // 抽屉位置，可选值：left, right
    drawerType="front"    // 抽屉类型，可选值：front, back, slide, permanent
    drawerStyle={{
        width: '68%',
        backgroundColor: '#eaf2d7',   // 侧栏样式
    }}
    overlayStyle={{
        backgroundColor: 'rgba(100, 100, 100, 0.2)',    // 遮罩样式
    }}
    hideStatusBarOnOpen={true}
    statusBarAnimation={statusBarAnimation}    // 状态栏动画，可选值：slide, fade, none
    swipeEnabled={swipeEnabled}    // 是否开启滑动手势打开抽屉
>
    <Text>页面内容</Text>
</Drawer>`}
        />
      </ScrollView>
    </Drawer>
  );
}
