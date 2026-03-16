import { Text, TouchableHighlight } from 'react-native';
import css from '../../../styles/css';
import { TodoData, useTodo } from '../../../store/useTodo';
import { useNavigation } from '@react-navigation/native';

type Props = {
  data: TodoData;
  onAction?: () => void;
};
export default function EditItem({ data, onAction = () => {} }: Props) {
  const navigation = useNavigation();
  const setCurrent = useTodo(state => state.setCurrent);

  return (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor={css.bg_darkgray.backgroundColor}
      style={[css.h_full, css.w_64, css.place_center]}
      onPress={() => {
        setCurrent(data);
        onAction();
        navigation.navigate('TodoEditModal');
      }}
    >
      <Text style={[css.light]}>编辑</Text>
    </TouchableHighlight>
  );
}
