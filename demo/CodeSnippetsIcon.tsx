import { TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useCodeSnippets } from '../store/useCodeSnippets';
import { useNavigation, useTheme } from '@react-navigation/native';

type Props = {
  title: string;
  code: string;
};

export default function CodeSnippetsIcon({ title, code }: Props) {
  const navigation = useNavigation();
  const theme = useTheme();
  const update = useCodeSnippets(state => state.update);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        update(title, code);
        navigation.navigate('CodeModal');
      }}
    >
      <Ionicons name="code-slash-outline" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
}
