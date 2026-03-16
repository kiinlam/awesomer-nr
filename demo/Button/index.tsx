import { useState } from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { default as Text } from '../../components/ThemeText';
import css from '../../styles/css';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const [touchableWithoutFeedbackCount, setTouchableWithoutFeedbackCount] =
    useState(0);
  const [touchableHighlightCount, setTouchableHighlightCount] = useState(0);
  const [touchableOpacityCount, setTouchableOpacityCount] = useState(0);
  const [list, setList] = useState<string[]>([]);

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.p_16, css.gap_24]}
    >
      <ExampleCard
        title="系统按钮(默认样式)"
        content={
          <View style={[css.gap_16]}>
            <Text>⚠️ RN Button 组件只支持修改颜色，其他样式无法修改</Text>
            <Button
              title="系统按钮(默认样式)"
              onPress={() => {
                Alert.alert('这是一个系统样式的按钮');
              }}
            />
          </View>
        }
        code={`<Button
    title="系统按钮(默认样式)" // 必需
    onPress={() => {
      Alert.alert('这是一个系统样式的按钮');
    }} // 必需
/>`}
      />

      <ExampleCard
        title="可自定义颜色 color"
        content={
          <View style={[css.gap_16]}>
            <Text>iOS 为文本的颜色(默认值：#007AFF)</Text>
            <Text>Android 为按钮的背景颜色(默认值：#2196F3)</Text>
            <Button
              title="绿色的按钮(color=green)"
              color="green"
              onPress={() => Alert.alert('这是一个绿色的按钮')}
            />
          </View>
        }
        code={`<Button
    title="绿色(color=green)"
    color="green"
    onPress={() => {
      Alert.alert('这是一个绿色的按钮');
    }}
/>`}
      />

      <ExampleCard
        title="可设置禁用状态 disabled"
        content={
          <Button
            title="禁用的按钮(disabled)"
            disabled
            onPress={() => Alert.alert('这是一个禁用的按钮')}
          />
        }
        code={`<Button
    title="禁用(disabled)"
    disabled
    onPress={() => Alert.alert('这是一个禁用的按钮')}
/>`}
      />

      <ExampleCard
        title="无反馈触控 TouchableWithoutFeedback"
        content={
          <TouchableWithoutFeedback
            onPress={() => setTouchableWithoutFeedbackCount(count => count + 1)}
            onLongPress={() =>
              setTouchableWithoutFeedbackCount(count => count + 10)
            }
          >
            <Text
              style={[css.p_16, css.bg_gray, css.text_center]}
              suppressHighlighting={true}
            >
              短按或长按此处 ({touchableWithoutFeedbackCount % 100})
            </Text>
          </TouchableWithoutFeedback>
        }
        code={`<TouchableWithoutFeedback
      onPress={() => {}}
      onLongPress={() => {}}
>
    <Text>
      TouchableWithoutFeedback
    </Text>
</TouchableWithoutFeedback>`}
      />

      <ExampleCard
        title="高亮触控 TouchableHighlight"
        content={
          <View style={[css.gap_16]}>
            <Text>触控后可改变透明度并透出底色，实现触控反馈</Text>
            <TouchableHighlight
              activeOpacity={0.7}
              underlayColor="white"
              onPress={() => setTouchableHighlightCount(count => count + 1)}
              onLongPress={() =>
                setTouchableHighlightCount(count => count + 10)
              }
            >
              <Text style={[css.p_16, css.bg_gray, css.text_center]}>
                短按或长按此处 ({touchableHighlightCount % 100})
              </Text>
            </TouchableHighlight>
          </View>
        }
        code={`<TouchableHighlight
    activeOpacity={0.7} // 透明度变化
    underlayColor="white" // 底色
    onPress={() => {}}
    onLongPress={() => {}}
>
    <Text>
        TouchableHighlight
    </Text>
</TouchableHighlight>`}
      />

      <ExampleCard
        title="透明化触控 TouchableOpacity"
        content={
          <View style={[css.gap_16]}>
            <Text>触控后改变透明度，实现触控反馈</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setTouchableOpacityCount(count => count + 1)}
              onLongPress={() => setTouchableOpacityCount(count => count + 10)}
            >
              <Text style={[css.p_16, css.bg_gray, css.text_center]}>
                TouchableOpacity ({touchableOpacityCount % 100})
              </Text>
            </TouchableOpacity>
          </View>
        }
        code={`<TouchableOpacity
    activeOpacity={0.6} // 只能改变透明度
    onPress={() => {}}
    onLongPress={() => {}}
>
  <Text>
      TouchableOpacity ({touchableOpacityCount % 100})
  </Text>
</TouchableOpacity>`}
      />

      <ExampleCard
        title="触控包装器 Pressable"
        content={
          <View style={[css.gap_16]}>
            <Text>使用 Pressable 包装任意视图，可实现完全自定义的触控反馈</Text>
            <Pressable
              onPressIn={() =>
                setList(prev =>
                  ['Press In', '----------', ...prev].splice(0, 30),
                )
              }
              onPressOut={() =>
                setList(prev => ['Press Out', ...prev].splice(0, 10))
              }
              onPress={() => setList(prev => ['Press', ...prev].splice(0, 10))}
              onLongPress={() =>
                setList(prev => ['Long Press', ...prev].splice(0, 10))
              }
              style={({ pressed }) => {
                return [
                  css.p_16,
                  css.bg_gray,
                  css.text_center,
                  pressed ? { backgroundColor: '#00bbf9' } : {},
                ];
              }}
            >
              <Text style={[css.font_16, css.text_center]}>按压此处</Text>
            </Pressable>
            <Text>触控事件记录</Text>
            <ScrollView
              contentContainerStyle={[css.p_16, css.gap_8, css.h_256]}
            >
              {list.map((item, index) => {
                return <Text key={index}>{item}</Text>;
              })}
            </ScrollView>
          </View>
        }
        code={`<Pressable
    disabled={false}
    onPressIn={() => {} }
    onPressOut={() => {}}
    onPress={() => {}}
    onLongPress={() => {}}
    style={({ pressed }) => {
      return [
        pressed ? { backgroundColor: '#00bbf9' } : {},
      ];
    }}
>
    <Text>Pressable</Text>
</Pressable>`}
      />
    </ScrollView>
  );
}
