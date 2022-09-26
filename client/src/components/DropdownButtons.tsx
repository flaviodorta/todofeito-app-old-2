import React from 'react';

export const DropdownButtons = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`dropdown-buttons-container ${className}`}>{children}</div>
  );
};
