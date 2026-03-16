import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { default as Text } from '../../../components/ThemeText';
import css from '../../../styles/css';
import { View } from 'react-native';
import { useTodo } from '../../../store/useTodo';
import ClearAll from './ClearAll';

const limit = 100;

export default function DrawerContent(props: DrawerContentComponentProps) {
  const todos = useTodo(state => state.list.length);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[css.flex_1, css.pb_24]}
    >
      <View
        style={[css.mb_16]}
      >
        <Text style={[css.font_18]}>待办事项</Text>
      </View>
      <View style={[css.flex_1]}>
        <DrawerItemList {...props} />
      </View>

      <View
        style={[css.w_full, css.flex_row, css.items_center, css.gap_8, css.p_8]}
      >
        {/* <Text
          onPress={() => {
            useTodo.getState().export();
          }}
        >
          导出
        </Text> */}
        <View
          style={[
            css.flex_1,
            css.shrink_1,
            css.h_8,
            css.bg_darkgray,
            css.rounded_8,
          ]}
        >
          <View
            style={[
              css.h_8,
              css.bg_lightgray,
              css.rounded_8,
              { width: `${(100 * todos) / limit}%` },
            ]}
          />
        </View>
        <Text>
          {todos}/{limit}
        </Text>
        <ClearAll />
      </View>
    </DrawerContentScrollView>
  );
}
