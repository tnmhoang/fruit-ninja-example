import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  children: React.ReactNode;
}

const LinkExternal = ({ children, href, ...rest }: Props) => {
  if (!href) return <>{children}</>;

  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default LinkExternal;
