import { lazy } from 'react';

const Content = lazy(() => import('../../About/index.tsx'));

function Page() {
  return (
    <Content />
  );
}

export default Page;
