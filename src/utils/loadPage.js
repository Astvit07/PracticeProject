import React, { Suspense, lazy } from 'react';

export function loadPage(pageName) {
  const Page = lazy(() => import(`../pages/${pageName}`));
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <Page />
    </Suspense>
  );
}
