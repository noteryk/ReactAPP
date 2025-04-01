import React from 'react';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      {children}
    </form>
  );
};

export default Form;