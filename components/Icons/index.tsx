import { Ionicons } from '@react-native-vector-icons/ionicons';

type TabBarIconProps = {
  color: string;
  size: number;
};
export const HomeTabBarIcon = ({ color }: TabBarIconProps) => {
  return <Ionicons name="home-outline" color={color} size={22} />;
};
export const TodoTabBarIcon = ({ color }: TabBarIconProps) => {
  return <Ionicons name="file-tray-full-outline" color={color} size={22} />;
};
export const AboutTabBarIcon = ({ color }: TabBarIconProps) => {
  return <Ionicons name="terminal-outline" color={color} size={22} />;
};
