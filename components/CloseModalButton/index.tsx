import { useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TouchableOpacity } from 'react-native';

export default function CloseModalButton() {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="close-outline" size={28} color={theme.colors.text} />
    </TouchableOpacity>
  );
}
