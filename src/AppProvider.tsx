import React from 'react';

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

export default AppProvider;
export {};