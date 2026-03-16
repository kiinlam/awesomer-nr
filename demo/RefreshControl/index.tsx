import { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import css from '../../styles/css';
import { default as Text } from '../../components/ThemeText';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 1500);
  };
  return (
    <ScrollView
      style={css.flex_1}
      contentContainerStyle={[
        css.flex_1,
        css.bg_primary,
        css.justify_center,
        css.items_center,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['red', 'green', 'blue']} // Android 指定至少一种颜色用来绘制刷新指示器
          enabled={true} // Android 指定是否要启用刷新指示器
          progressBackgroundColor={css.tomato.color} // Android 指定刷新指示器的背景色
          progressViewOffset={10} // Android 指定刷新指示器的垂直偏移量
          // size={RefreshControl.SIZE.DEFAULT} // Android 指定刷新指示器的大小
          tintColor={css.tomato.color} // iOS 指定刷新指示器的颜色
          title={loading ? 'Loading...' : 'Pull to refresh'} // iOS 指定刷新指示器下显示的文字
          titleColor={css.primary.color} // iOS 指定刷新指示器下显示的文字的颜色
        />
      }
    >
      <View style={[css.p_10, css.w_full]}>
        <ExampleCard
          title="下拉刷新 RefreshControl"
          content={
            <Text>
              设置 ScrollView / FlatList / SectionList 组件的 refreshControl
              Prop 来自定义下拉刷新组件，下拉时触发 onRefresh 回调，通过 refreshing 控制展开或收起
            </Text>
          }
          code={`<ScrollView
contentContainerStyle={[
    flex: 1,
]}
refreshControl={
    <RefreshControl
        refreshing={refreshing}    // 是否应该在刷新时显示加载指示器
        onRefresh={() => setRefreshing(true)}    // 在开始刷新时调用
        colors={['red', 'green', 'blue']}    // Android 指定至少一种颜色用来绘制刷新指示器
        enabled={true} // Android 指定是否要启用刷新指示器
        progressBackgroundColor={css.tomato.color}    // Android 指定刷新指示器的背景色
        progressViewOffset={10}    // Android 指定刷新指示器的垂直偏移量
        // size={RefreshControl.SIZE.DEFAULT}    // Android 指定刷新指示器的大小
        tintColor={css.tomato.color}    // iOS 指定刷新指示器的颜色
        title={loading ? 'Loading...' : 'Pull to refresh'}    // iOS 指定刷新指示器下显示的文字
        titleColor={css.primary.color}    // iOS 指定刷新指示器下显示的文字的颜色
    />
}
>
    <Text>下拉刷新</Text>
</ScrollView>`}
        />
      </View>
    </ScrollView>
  );
}
