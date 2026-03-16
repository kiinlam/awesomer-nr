import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';
import { SvgUri } from 'react-native-svg';

interface RemoteSvgProps {
  uri: string;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
}

const RemoteSvg = ({
  uri,
  width = '100%',
  height = '100%',
  style,
}: RemoteSvgProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  return (
    <View style={[styles.container, { width: width, height: height }, style]}>
      {loading && !error && <ActivityIndicator size="small" color="#666" />}
      {error && <Text style={styles.errorText}>加载失败</Text>}
      <SvgUri
        uri={uri}
        width={width as number | string}
        height={height as number | string}
        onLoad={() => setLoading(false)}
        onError={err => {
          setError(err);
          setLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
  },
});

export default RemoteSvg;
