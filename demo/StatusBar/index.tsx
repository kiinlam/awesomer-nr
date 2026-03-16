import { useState } from 'react';
import { Button, ScrollView, StatusBar, View } from 'react-native';
import css from '../../styles/css';
import ExampleCard from '../../components/ExampleCard';
import { default as Text } from '../../components/ThemeText';

export default function Demo() {
  const [isHidden, setIsHidden] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.gap_24, css.p_16]}
    >
      <StatusBar
        animated={true} // 状态栏的变化是否启用动画效果
        hidden={isHidden} // 是否隐藏
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} // 文本颜色
        showHideTransition="fade" // iOS 指定显示或隐藏时的动画效果 fade | slide
        backgroundColor={isDarkMode ? '#000' : '#fff'} // Android 状态栏背景色
        translucent={true} // Android 是否透明
        // networkActivityIndicatorVisible={true}    // iOS 是否显示网络活动指示器
      />
      <ExampleCard
        title="StatusBar 显示/隐藏"
        content={
          <View style={[css.gap_16]}>
            <Text>可见性: {isHidden ? '隐藏' : '显示'}</Text>
            <Button
              title="切换显示/隐藏"
              onPress={() => setIsHidden(!isHidden)}
            />
          </View>
        }
      />
      <ExampleCard
        title="StatusBar 颜色模式"
        content={
          <View style={[css.gap_16]}>
            <Text>
              颜色模式: {isDarkMode ? 'light-content' : 'dark-content'}
            </Text>
            <Button
              title="切换亮色/暗色"
              onPress={() => setIsDarkMode(!isDarkMode)}
            />
          </View>
        }
      />

      <ExampleCard
        title="StatusBar 代码示例"
        code={`const [isHidden, setIsHidden] = useState(false);
const [isDarkMode, setIsDarkMode] = useState(false);

<StatusBar
    animated={true}     // 状态栏的变化是否启用动画效果
    hidden={isHidden}     // 是否隐藏
    barStyle={isDarkMode ? 'light-content' : 'dark-content'}     // 文本颜色
    showHideTransition="fade"     // iOS 指定显示或隐藏时的动画效果 fade | slide
    backgroundColor={isDarkMode ? '#000' : '#fff'}     // Android 状态栏背景色
    translucent={true}     // Android 是否透明
    // networkActivityIndicatorVisible={true}      // iOS 是否显示网络活动指示器
/>`}
      />
    </ScrollView>
  );
}
