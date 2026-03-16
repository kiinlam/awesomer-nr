import { ScrollView } from 'react-native';
import ExampleCard from '../../components/ExampleCard';
import css from '../../styles/css';
import { data } from './data';

export default function Demo() {
  return (
    <ScrollView
      style={[css.flex_1]}
      contentContainerStyle={[css.gap_24, css.p_16]}
    >
      {data.map(({ title, component, code }, index) => (
        <ExampleCard key={index} title={title} content={component} code={code} />
      ))}
    </ScrollView>
  );
}
