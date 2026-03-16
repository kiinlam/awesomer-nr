/* eslint-disable react-native/no-inline-styles */
import { Alert } from 'react-native';
import { default as Text } from '../../components/ThemeText';
export const data = [
  {
    title: 'Text 基本用法',
    component: <Text>The crazy fox jumps over the lazy dog</Text>,
    code: `<Text>The crazy fox jumps over the lazy dog</Text>`,
  },
  {
    title: '长按选择',
    component: (
      <Text selectable={true}>The crazy fox jumps over the lazy dog</Text>
    ),
    code: `<Text selectable={true}>The crazy fox jumps over the lazy dog</Text>`,
  },
  {
    title: '文本嵌套，支持样式继承',
    component: (
      <Text style={{ color: 'pink' }}>
        The crazy <Text style={{ color: 'red' }}>fox</Text> jumps over the{' '}
        <Text style={{ color: 'green' }}>dog</Text>
      </Text>
    ),
    code: `<Text style={{ color: 'pink' }}>
    The crazy 
    <Text style={{ color: 'red' }}>fox</Text>{' '}
    jumps over the{' '}
    <Text style={{ color: 'green' }}>dog</Text>
</Text>`,
  },
  {
    title: '文本截断 - clip',
    component: (
      <Text ellipsizeMode="clip" numberOfLines={2}>
        React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
        应用的开源框架。通过 React Native，您可以使用 JavaScript
        来访问移动平台的 API，以及使用 React 组件来描述 UI 的外观和行为。
      </Text>
    ),
    code: `<Text ellipsizeMode="clip" numberOfLines={2}>
    React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
    应用的开源框架。通过 React Native，您可以使用 JavaScript
    来访问移动平台的 API，以及使用 React 组件来描述 UI
    的外观和行为。
</Text>`,
  },
  {
    title: '文本截断 - tail(默认值)',
    component: (
      <Text ellipsizeMode="tail" numberOfLines={2}>
        React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
        应用的开源框架。通过 React Native，您可以使用 JavaScript
        来访问移动平台的 API，以及使用 React 组件来描述 UI 的外观和行为。
      </Text>
    ),
    code: `<Text ellipsizeMode="tail" numberOfLines={2}>
    React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
    应用的开源框架。通过 React Native，您可以使用 JavaScript
    来访问移动平台的 API，以及使用 React 组件来描述 UI
    的外观和行为。
</Text>`,
  },
  {
    title: '文本截断 - head',
    component: (
      <Text ellipsizeMode="head" numberOfLines={2}>
        React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
        应用的开源框架。通过 React Native，您可以使用 JavaScript
        来访问移动平台的 API，以及使用 React 组件来描述 UI 的外观和行为。
      </Text>
    ),
    code: `<Text ellipsizeMode="head" numberOfLines={2}>
    React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
    应用的开源框架。通过 React Native，您可以使用 JavaScript
    来访问移动平台的 API，以及使用 React 组件来描述 UI
    的外观和行为。
</Text>`,
  },
  {
    title: '文本截断 - middle',
    component: (
      <Text ellipsizeMode="middle" numberOfLines={2}>
        React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
        应用的开源框架。通过 React Native，您可以使用 JavaScript
        来访问移动平台的 API，以及使用 React 组件来描述 UI 的外观和行为。
      </Text>
    ),
    code: `<Text ellipsizeMode="middle" numberOfLines={2}>
    React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS
    应用的开源框架。通过 React Native，您可以使用 JavaScript
    来访问移动平台的 API，以及使用 React 组件来描述 UI
    的外观和行为。
</Text>`,
  },

  {
    title: 'Text 支持短按、长按事件',
    component: (
      <Text
        onPress={() => {
          Alert.alert('短按事件触发');
        }}
        onLongPress={() => {
          Alert.alert('长按事件触发');
        }}
      >
        The crazy fox jumps over the lazy dog
      </Text>
    ),
    code: `<Text
    onPress={() => {
        Alert.alert('短按事件触发');
    }}
    onLongPress={() => {
        Alert.alert('长按事件触发');
    }}
>
    The crazy fox jumps over the lazy dog
</Text>`,
  },
];
