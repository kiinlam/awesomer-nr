import { View, ActivityIndicator, Button, ScrollView } from 'react-native';
import ExampleCard from '../../components/ExampleCard';
import css from '../../styles/css';
import { useState } from 'react';
import { default as Text } from '../../components/ThemeText';

export default function Demo() {
  const [color, setColor] = useState<string | undefined>(undefined);
  const [animating, setAnimating] = useState(true);
  const [size, setSize] = useState<'small' | 'large'>('large');
  const [hidesWhenStopped, setHidesWhenStopped] = useState(true);

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.p_16, css.gap_24]}
    >
      <ExampleCard
        title="ActivityIndicator 加载指示器"
        content={
          <View style={[css.gap_16]}>
            <View
              style={[
                css.w_full,
                css.justify_center,
                css.items_center,
                css.h_64,
              ]}
            >
              <ActivityIndicator
                color={color}
                size={size}
                animating={animating}
                hidesWhenStopped={hidesWhenStopped}
              />
            </View>
            <View style={[css.flex_row, css.justify_between, css.items_center]}>
              <Text>color: {String(color)}</Text>
              <Button
                title="切换"
                onPress={() => {
                  const list = [
                    'red',
                    'orange',
                    'yellow',
                    'green',
                    'cyan',
                    'blue',
                    'violet',
                    undefined,
                  ];
                  const next =
                    list[(color ? list.indexOf(color) + 1 : 0) % list.length];
                  setColor(next);
                }}
              />
            </View>
            <View style={[css.flex_row, css.justify_between, css.items_center]}>
              <Text>size: {size}</Text>
              <Button
                title="切换"
                onPress={() => {
                  setSize(size === 'small' ? 'large' : 'small');
                }}
              />
            </View>
            <View style={[css.flex_row, css.justify_between, css.items_center]}>
              <Text>animating: {String(animating)}</Text>
              <Button
                title="切换"
                onPress={() => {
                  setAnimating(!animating);
                }}
              />
            </View>
            <View style={[css.flex_row, css.justify_between, css.items_center]}>
              <Text>hidesWhenStopped: {String(hidesWhenStopped)}</Text>
              <Button
                title="切换"
                onPress={() => {
                  setHidesWhenStopped(!hidesWhenStopped);
                }}
              />
            </View>
          </View>
        }
        code={`<ActivityIndicator
    color={color}   // 指示器颜色，
    size={size}   // 指示器大小，可选值有 small 和 large，Android 可指定数值
    animating={animating}   // 是否显示指示器动画
    hidesWhenStopped={hidesWhenStopped}   // 当 animating 为 false 时是否隐藏指示器
/>`}
      />
    </ScrollView>
  );
}
