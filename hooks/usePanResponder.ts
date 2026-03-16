import { useRef } from 'react';
import {
  PanResponder,
  type PanResponderCallbacks,
  type PanResponderInstance,
} from 'react-native';

export default function usePanResponder(config: PanResponderCallbacks) {
  const ref = useRef<null | PanResponderInstance>(null);
  if (ref.current == null) {
    ref.current = PanResponder.create(config);
  }
  return ref.current;
}
