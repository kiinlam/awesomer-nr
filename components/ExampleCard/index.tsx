import { View } from 'react-native';
import css from '../../styles/css';
import { default as Text } from '../ThemeText';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type PropsType = {
  title: string;
  content?: React.ReactNode;
  code?: string;
  language?: string;
};

export default function ExampleCard({
  title,
  content,
  code,
  language = 'xml',
}: PropsType) {
  return (
    <View style={[css.bordered, css.rounded_8]}>
      <View style={[css.p_10, css.border_bottom]}>
        <Text style={[css.light, css.font_18]}>{title}</Text>
      </View>
      {content && <View style={[css.p_10]}>{content}</View>}
      {code && (
        <View style={[css.p_10, css.border_top]}>
          <CodeHighlighter
            hljsStyle={atomOneDarkReasonable}
            scrollViewProps={{
              style: {
                backgroundColor: '#292c33',
              },
              contentContainerStyle: [css.min_w_full, css.p_16],
            }}
            textStyle={[css.font_14]}
            language={language}
          >
            {code}
          </CodeHighlighter>
        </View>
      )}
    </View>
  );
}
