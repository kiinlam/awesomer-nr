import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useCodeSnippets = create(
  combine(
    {
      title: '',
      code: '',
    },
    set => {
      return {
        update(title: string, code: string) {
          set({ title, code });
        },
      };
    },
  ),
);
