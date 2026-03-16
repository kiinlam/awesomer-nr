import Ionicons from '@react-native-vector-icons/ionicons';
import { TouchableHighlight } from 'react-native';
import css from '../../../styles/css';
import { TodoData, useTodo } from '../../../store/useTodo';

type Props = {
  data: TodoData;
  onAction?: () => void;
};
export default function CompleteItem({ data, onAction = () => {} }: Props) {
  const toggleComplete = useTodo(state => state.toggleComplete);

  return (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor={css.bg_darkgray.backgroundColor}
      style={[css.h_full, css.w_64, css.place_center]}
      onPress={() => {
        toggleComplete(data.id);
        onAction();
      }}
    >
      <Ionicons
        name={data.done ? 'checkmark-circle-outline' : 'ellipse-outline'}
        size={20}
        color={css.darkgray.color}
      />
    </TouchableHighlight>
  );
}
