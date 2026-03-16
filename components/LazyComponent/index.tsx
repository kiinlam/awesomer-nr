import React from 'react';
import { Suspense } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Fallback = () => (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

export function LazyComponent({ children }: Props) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
