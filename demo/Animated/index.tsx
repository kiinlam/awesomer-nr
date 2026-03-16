import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CodeSnippetsIcon from '../CodeSnippetsIcon';
import example from './example';

const HeaderRight = () => {
  return <CodeSnippetsIcon title="Animated 代码示例" code={example} />;
};

const SIZE = 120; // 方块尺寸
const BOUNDARY_OFFSET = 50; // 边界安全距离

export default function Demo() {
  const navigation = useNavigation();
  const touched = useSharedValue<boolean>(false); // 是否触摸
  const offsetX = useSharedValue<number>(0); // 水平偏移值
  const offsetY = useSharedValue<number>(0); // 垂直偏移值
  const width = useSharedValue<number>(0); // 容器宽度
  const height = useSharedValue<number>(0); // 容器高度

  // 获取组件宽度和高度
  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.height;
  };

  // Pan 手势
  const pan = Gesture.Pan()
    // 触摸开始
    .onBegin(() => {
      touched.value = true;
    })
    .onUpdate(event => {
      // 更新偏移量
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize(event => {
      // 触摸结束
      touched.value = false;

      // 检查速度是否足够小，如果很小则直接回弹，否则先惯性再回弹
      const isVelocitySmallX = Math.abs(event.velocityX) < 0.5;
      const isVelocitySmallY = Math.abs(event.velocityY) < 0.5;

      const damping = 10; // 阻尼
      const stiffness = 400; // 刚度

      if (isVelocitySmallX && isVelocitySmallY) {
        // 速度很小时直接回弹到原点
        offsetX.value = withSpring(0, { damping, stiffness });
        offsetY.value = withSpring(0, { damping, stiffness });
      } else {
        // 速度较大时，创建动画序列，先惯性运动，直到速度为 0，然后使用 spring 动画回弹到原点
        const xBounds: [number, number] = [
          -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ];
        const yBounds: [number, number] = [
          -(height.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          height.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ];

        // 使用序列动画：先惯性减速，然后回弹到原点
        offsetX.value = withSequence(
          // 惯性运动
          withDecay({
            velocity: event.velocityX,
            clamp: xBounds,
          }),
          // 回弹原点
          withSpring(0, { damping, stiffness }),
        );

        offsetY.value = withSequence(
          withDecay({
            velocity: event.velocityY,
            clamp: yBounds,
          }),
          withSpring(0, { damping, stiffness }),
        );
      }
    });

  // 方块的动画样式
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: withTiming(touched.value ? 1.2 : 1) },
    ],
  }));

  useEffect(() => {
    // 设置导航右侧按钮
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#00bbf9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
