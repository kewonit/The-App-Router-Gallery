'use client';

import { Boundary } from '#/ui/boundary';
import { ErrorState } from '#/ui/demo-states';
import React from 'react';

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (
    <Boundary label="[section]/error.tsx (Client)" color="red">
      <ErrorState
        title="Something went wrong"
        error={error}
        reset={reset}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    </Boundary>
  );
}
