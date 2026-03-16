import { StatusBar, type StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function FocusAwareStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
