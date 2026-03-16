import { type StyleProp, type TextStyle } from 'react-native';
import { type Route } from 'react-native-tab-view';
import { default as Text } from '../../../components/ThemeText';
import css from '../../../styles/css';

type Props = {
  route: Route;
  labelText?: string;
  focused: boolean;
  color: string;
  allowFontScaling?: boolean;
  style?: StyleProp<TextStyle>;
};

// TabView 标签文本组件
export default function TabViewLabel({ route, labelText, focused }: Props) {
  return (
    <Text
      style={[focused ? [css.tomato, css.font_bold] : [css.lightgray]]}
    >
      {labelText ?? route.title}
    </Text>
  );
}
