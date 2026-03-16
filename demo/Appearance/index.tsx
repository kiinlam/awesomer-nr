import { Appearance, Button, ScrollView, View } from 'react-native';
import { useThemeStyle } from './useTheme';
import { default as Text } from '../../components/ThemeText';
import css from '../../styles/css';
import ExampleCard from '../../components/ExampleCard';

export default function Demo() {
  const { styles, appColorScheme, setAppColorScheme } = useThemeStyle(
    themeStyle => {
      return {
        container: {
          padding: 16,
          backgroundColor: themeStyle.cardBackground,
          borderRadius: 8,
          gap: 24,
        },
        textColor: {
          fontSize: 16,
          color: themeStyle.textPrimary,
        },
      };
    },
  );

  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.p_16, css.gap_24]}
    >
      <ExampleCard
        title="配色方案 Appearance"
        content={
          <View style={[css.gap_16]}>
            <Text>跟随配色方案更换主题实现方式：App 提供配色设置并记录，当没有设置时，使用系统的配色方案</Text>
            <View style={styles.container}>
              <Text style={styles.textColor}>
                当前系统颜色方案: {Appearance.getColorScheme()}
              </Text>
              <Text style={styles.textColor}>
                设置App颜色方案: {appColorScheme ?? '未设置'}
              </Text>
              <Text style={styles.textColor}>
                实际生效颜色方案:{' '}
                {appColorScheme ?? Appearance.getColorScheme()}
              </Text>
              <View style={[css.flex_row, css.justify_arround]}>
                <Button
                  title="light"
                  onPress={() => {
                    setAppColorScheme('light');
                  }}
                />
                <Button
                  title="dark"
                  onPress={() => {
                    setAppColorScheme('dark');
                  }}
                />
                <Button
                  title="跟随系统"
                  onPress={() => {
                    setAppColorScheme(null);
                  }}
                />
              </View>
            </View>
          </View>
        }
        language="javascript"
        code={`// 获取系统设置的配色方案
Appearance.getColorScheme();

// 设置App的配色方案 'light' | 'dark' | null，测试时发现设置为 null 并没有生效
Appearance.setColorScheme(scheme);

// 监听配色方案变化（用户修改设置或昼夜自动切换主题）
Appearance.addChangeListener((preferences) => {
      console.log(preferences.colorScheme); // 'light' | 'dark'
})`}
      />
    </ScrollView>
  );
}
