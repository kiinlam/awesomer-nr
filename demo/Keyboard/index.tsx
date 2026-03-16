import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  type KeyboardEvent,
  Linking,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { default as Text } from '../../components/ThemeText';
import css from '../../styles/css';
import { Button } from '@react-navigation/elements';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardEventInfo, setKeyboardEventInfo] = useState('');

  // 监听键盘显示/隐藏事件
  useEffect(() => {
    function handleKeyboardEvent(e: KeyboardEvent) {
      setKeyboardEventInfo(JSON.stringify(e, null, 2));
      setKeyboardVisible(Keyboard.isVisible());
    }
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardEvent,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardEvent,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS 用 padding, Android 用 height
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0} // iOS 关键：根据是否有导航栏调整
      style={[css.flex_1]}
      enabled={enabled}
    >
      <ScrollView
        ref={scrollViewRef}
        style={[css.flex_1]}
        contentContainerStyle={[css.gap_24, css.p_16]}
      >
        <ExampleCard
          title="防键盘遮挡功能"
          content={
            <View style={[css.items_start, css.gap_16]}>
              <Text>
                使用 RN 核心组件 KeyboardAvoidingView 可简单实现防止键盘遮挡功能
              </Text>
              <Text>也可选择使用第三方库：</Text>
              <Text
                style={[css.text_underline]}
                onPress={() => {
                  Linking.openURL(
                    'https://github.com/kirillzyusko/react-native-keyboard-controller',
                  );
                }}
              >
                react-native-keyboard-controller
              </Text>
            </View>
          }
          code={`export default function KeyboardAvoidingViewExample() {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0} // 补偿修正
            enabled={true}
        >
            ...
        </KeyboardAvoidingView>
    );
}`}
        />

        <ExampleCard
          title="实现原理"
          content={
            <Text>
              KeyboardAvoidingView 添加了一个 View
              视图，当键盘显示时，根据键盘的高度，调整该 View 的 height 或底部的
              padding，收缩可视区域，以避免被遮挡
            </Text>
          }
        />
        <ExampleCard
          title="陷阱"
          content={
            <Text>
              当输入框在 ScrollView
              中，如果输入框所在位置有变化，可能需要手动调整 ScrollView
              的滚动位置
            </Text>
          }
        />

        <ExampleCard
          title="试一试"
          content={
            <View style={[css.gap_16]}>
              <Button
                onPress={() => {
                  setEnabled(!enabled);
                }}
              >
                {enabled ? '停用防键盘遮挡功能' : '开启防键盘遮挡功能'}
              </Button>
              {enabled ? (
                <Text style={[css.primary]}>
                  已开启防遮挡功能，此输入框不会被软键盘遮挡
                </Text>
              ) : (
                <Text style={[css.tomato]}>
                  未开启防遮挡功能，此输入框会被软键盘遮挡
                </Text>
              )}
              <TextInput
                placeholder="请输入"
                style={[css.h_32, css.bordered, css.bg_light]}
              />
            </View>
          }
        />

        <ExampleCard
          title="Keyboard 信息"
          content={
            <View style={[css.gap_16]}>
              <Text>
                {keyboardVisible ? 'Keyboard Shown' : 'Keyboard Hidden'}
              </Text>
              {keyboardEventInfo && (
                <View style={[css.justify_start, css.items_start, css.gap_16]}>
                  <Text>
                    触发软键盘事件：{' '}
                    {keyboardVisible ? 'keyboardDidShow' : 'keyboardDidHide'}
                  </Text>
                  <Text>{keyboardEventInfo}</Text>
                  {keyboardVisible && (
                    <Button onPress={Keyboard.dismiss}>收起软键盘</Button>
                  )}
                </View>
              )}
            </View>
          }
          code={`// 监听键盘显示/隐藏事件
useEffect(() => {
    const showSubscription = Keyboard.addListener(
        'keyboardDidShow',
        (e: KeyboardEvent) => {
            console.log(e);
        }
    );
    const hideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        (e: KeyboardEvent) => {
            console.log(e);
        }
    );

    return () => {
        showSubscription.remove();
        hideSubscription.remove();
    };
}, []);`}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
