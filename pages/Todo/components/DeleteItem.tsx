import { Text, TouchableHighlight } from 'react-native';
import css from '../../../styles/css';
import { TodoData, useTodo } from '../../../store/useTodo';

type Props = {
  data: TodoData;
  onAction?: () => void;
};
export default function DeleteItem({ data, onAction = () => {} }: Props) {
  const del = useTodo(state => state.del);

  return (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor={css.bg_darkgray.backgroundColor}
      style={[css.h_full, css.w_64, css.place_center]}
      onPress={() => {
        del(data.id);
        onAction();
      }}
    >
      <Text style={[css.light]}>删除</Text>
    </TouchableHighlight>
  );
}
