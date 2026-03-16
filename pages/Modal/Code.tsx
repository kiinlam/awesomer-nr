import { Alert, ScrollView, StyleSheet } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useCodeSnippets } from '../../store/useCodeSnippets';
import { useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function CodeModal() {
  const navigation = useNavigation();
  const title = useCodeSnippets(state => state.title);
  const code = useCodeSnippets(state => state.code);
  const update = useCodeSnippets(state => state.update);

  useEffect(() => {
    // 设置导航标题
    if (title) {
      navigation.setOptions({
        headerTitle: title,
      });
    }
  });

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      if (!title && !code) {
        Alert.alert('非法访问', '请从 Demo 页面进入', [
          {
            text: '确定',
            style: 'default',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        update('', '');
      };
    }, [code, title, update, navigation]),
  );

  return (
    <ScrollView>
      <CodeHighlighter
        hljsStyle={atomOneDarkReasonable}
        scrollViewProps={{
          style: {
            backgroundColor: '#292c33',
          },
          contentContainerStyle: [styles.codeContainer],
        }}
        textStyle={styles.text}
        language="typescript"
      >
        {code}
      </CodeHighlighter>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    padding: 16,
    minWidth: '100%',
  },
  text: {
    fontSize: 14,
  },
});
