import { Text, type TextProps } from 'react-native';
import { StyleSheet } from 'react-native';

export function Heading({
  level,
  style,
  children,
  ...props
}: React.PropsWithChildren<TextProps> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const headingLevel = 'heading' + level;
  const headingStyle = styles[headingLevel as keyof typeof styles];
  return (
    <Text {...props} style={[headingStyle, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  heading3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  heading4: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading5: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading6: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
