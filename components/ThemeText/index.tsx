import { Text, type TextProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function ThemeText({ style, children, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <Text style={[{ color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
}
