import { cn } from '@/lib/utils';
import { PropsWithChildrenAndClassName } from '@/types';
import { CSSProperties } from 'react';

interface VariablesCSSProperties extends CSSProperties {
  [key: string]: any;
}
interface Props extends PropsWithChildrenAndClassName {
  classBtn?: string;
  classBtnBottom?: string;
  styleBtn?: VariablesCSSProperties;
  styleBtnBottom?: VariablesCSSProperties;
  onClick?: () => any;
}

export default function Button3D({
  children,
  className,
  classBtn,
  classBtnBottom,
  styleBtn,
  styleBtnBottom,
  onClick,
}: Props) {
  return (
    <div className={cn('container-btn3d border-1 flex h-fit border-solid', className)}>
      <button style={styleBtn} className={cn('button capitalize', classBtn)} onClick={onClick}>
        {children}
      </button>
      <div style={styleBtnBottom} className={cn('button__bottom', classBtnBottom)}></div>
    </div>
  );
}
