import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type PropsType = {
  width?: number;
  height?: number;
  min?: number;
  max?: number;
  buffered?: number;
  current: number;
  hideHandler?: boolean;
  onChange?: (value: number) => void;
};

export default function ProgressBar({
  width,
  height,
  min = 0,
  max = 100,
  current,
  buffered = 0,
  hideHandler = false,
  onChange = () => {},
}: PropsType) {
  const trackWidth = useSharedValue(0); // 轨道宽度，在 onLayout 回调中更新该值
  const progress = useSharedValue(0); // 播放进度
  const progressAnim = useSharedValue(0); // 播放进度动画值
  const isDragging = useSharedValue(false); // 是否触发拖拽手势

  // 缓冲进度值
  const bufferedAnim = useDerivedValue(() => {
    return buffered ? (buffered / (max - min)) * trackWidth.value : 0;
  });

  // 缓冲轨道动画样式
  const animatedBufferTrack = useAnimatedStyle(() => {
    return {
      width: withTiming(bufferedAnim.value, { duration: 200 }),
    };
  });

  // 监听 current 变化，更新进度
  useEffect(() => {
    if (!isDragging.value) {
      progress.value = current;
    }
  }, [current, progress, isDragging]);

  // 监控进度，更新播放进度动画值
  useAnimatedReaction(
    () => progress.value,
    newProgressValue => {
      if (isDragging.value) {
        progressAnim.value = withTiming(newProgressValue, { duration: 10 });
      } else {
        const progressValue =
          (newProgressValue / (max - min)) * trackWidth.value;
        progressAnim.value = withTiming(progressValue, { duration: 200 });
      }
    },
  );

  // 播放轨道进度动画样式
  const animatedProgress = useAnimatedStyle(() => {
    return {
      width: progressAnim.value,
    };
  });

  // 滑块动画样式
  const animatedThumb = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progressAnim.value }],
    };
  });

  // 更新轨道宽度
  const onTrackLayout = (e: any) => {
    trackWidth.value = e.nativeEvent.layout.width;
  };

  // 手势处理
  const panGesture = useMemo(() => {
    return (
      Gesture.Pan()
        // 水平移动超过 10px 才激活
        .activeOffsetX([-10, 10])
        .maxPointers(1)
        .onBegin(e => {
          isDragging.value = true;
          progress.value = e.x;
        })
        .onUpdate(e => {
          const newX = Math.max(0, Math.min(e.x, trackWidth.value));
          progress.value = newX;
        })
        .onFinalize(() => {
          isDragging.value = false;
          const second = (progress.value / trackWidth.value) * (max - min);
          scheduleOnRN(onChange, second);
        })
    );
  }, [isDragging, progress, trackWidth, max, min, onChange]);

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container, { width, height }]}>
        {/* 背景轨道 */}
        <View style={styles.track} onLayout={onTrackLayout} />

        {/* 缓冲轨道 */}
        <Animated.View
          style={[styles.track, styles.bufferTrack, animatedBufferTrack]}
        />

        {/* 已播放轨道 */}
        <Animated.View
          style={[
            styles.trackFilled,
            animatedProgress, // 动态宽度
          ]}
          pointerEvents="none"
        />

        {/* 滑块 */}
        {!hideHandler && (
          <Animated.View
            style={[
              styles.thumb,
              animatedThumb, // 动态位置
            ]}
            pointerEvents="none"
          />
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 12,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  track: {
    position: 'absolute',
    top: 6,
    transform: [{ translateY: -3 }],
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#454545',
  },
  bufferTrack: {
    width: 0,
    backgroundColor: '#676767',
  },
  trackFilled: {
    position: 'absolute',
    left: 0,
    top: 6,
    transform: [{ translateY: -3 }],
    height: 6,
    backgroundColor: '#00bbf9',
    borderRadius: 3,
    shadowColor: '#00bbf9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5, // Android 阴影
  },
  thumb: {
    position: 'absolute',
    top: 0,
    left: -6,
    width: 12,
    height: 12,
    transform: [{ translateX: 0 }],
    backgroundColor: '#2a2e34',
    borderColor: '#00bbf9',
    borderWidth: 2,
    borderRadius: 6,
    shadowColor: '#06d6a0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5, // Android 阴影
  },
});
