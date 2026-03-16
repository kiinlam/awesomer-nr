import { useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import css from '../../../styles/css';
import { default as Text } from '../../../components/ThemeText';
import DeleteItem from './DeleteItem';
import { type EdgeInsets } from 'react-native-safe-area-context';
import { type TodoData } from '../../../store/useTodo';
import CompleteItem from './CompleteItem';
import EditItem from './EditItem';
import RestoreItem from './RestoreItem';

interface RightActionProps {
  children: React.ReactNode;
  color: string;
  x: number;
  progress: SharedValue<number>;
  totalWidth: number;
}

const RightAction = ({
  children,
  color,
  x,
  progress,
  totalWidth,
}: RightActionProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, -totalWidth], [x, 0]),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        css.w_128,
        css.h_full,
        css.absolute,
        { left: totalWidth - x, backgroundColor: color },
        animatedStyle,
      ]}
    >
      <View style={[css.w_64, css.center]}>{children}</View>
    </Animated.View>
  );
};

const renderRightActions = (
  _: any,
  translation: SharedValue<number>,
  swipeableMethods: SwipeableMethods,
  data: TodoData,
) => {
  const onAction = () => {
    swipeableMethods.close();
  };

  return (
    <View style={[css.flex_row, css.w_128]}>
      <RightAction
        color="#0ead69"
        x={128}
        progress={translation}
        totalWidth={128}
      >
        {data.deleted ? (
          <RestoreItem data={data} onAction={onAction} />
        ) : (
          <EditItem data={data} onAction={onAction} />
        )}
      </RightAction>
      <RightAction
        color="#bc4749"
        x={64}
        progress={translation}
        totalWidth={128}
      >
        <DeleteItem data={data} onAction={onAction} />
      </RightAction>
    </View>
  );
};

type Props = {
  data: TodoData;
  safeAreaInsets: EdgeInsets;
};

type SwipeableType = null | SwipeableMethods;
let swipeable: SwipeableType = null;
export default function TodoItem({ data, safeAreaInsets }: Props) {
  const swipeableRow = useRef<SwipeableMethods>(null);

  return (
    <Swipeable
      ref={swipeableRow}
      friction={3}
      enableTrackpadTwoFingerGesture
      rightThreshold={40} // 拖动多少距离后释放可打开面板，默认为面板宽度的一半
      renderRightActions={(progress, translation, swipeableMethods) =>
        renderRightActions(progress, translation, swipeableMethods, data)
      }
      onSwipeableOpenStartDrag={direction => {
        console.log(`Swipeable Open Start Drag ${direction}`);
        if (swipeable && swipeable !== swipeableRow.current) {
          swipeable.close();
        }
      }}
      onSwipeableWillOpen={direction => {
        console.log(`Swipeable Will Open ${direction}`);
      }}
      onSwipeableOpen={direction => {
        console.log(`Swipeable Open ${direction}`);
        swipeable = swipeableRow.current;
      }}
      onSwipeableWillClose={direction => {
        console.log(`Swipeable Will Close ${direction}`);
        swipeable = null;
      }}
      onSwipeableClose={direction => {
        console.log(`Swipeable Closed ${direction}`);
      }}
      onSwipeableCloseStartDrag={direction => {
        console.log(`Swipeable Close Start Drag ${direction}`);
      }}
    >
      <View
        key={data.id}
        style={[
          css.flex_row,
          css.items_center,
          css.h_64,
          {
            paddingLeft: safeAreaInsets.left,
            paddingRight: safeAreaInsets.right,
          },
        ]}
      >
        <CompleteItem data={data} />
        <View
          style={[
            css.flex_1,
            css.h_full,
            css.justify_center,
            css.items_start,
            css.p_10,
            css.border_bottom,
          ]}
        >
          <Text
            style={[
              css.font_16,
              data.done ? css.minor : css.light,
              data.done ? css.italic : undefined,
              data.deleted ? css.line_through : undefined,
            ]}
          >
            {data.title}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}
