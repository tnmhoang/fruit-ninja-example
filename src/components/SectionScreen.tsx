import { cn } from '@/lib/utils';
import { PropsWithChildrenAndClassName } from '@/types';

const SectionScreen = ({
  backgroundImgSrc = '/images/bg-home.png',
  children,
  className,
  isSplash,
}: { backgroundImgSrc?: string; isSplash?: boolean } & PropsWithChildrenAndClassName) => {
  return (
    <section
      className={cn('bg-[#E0D6C7] bg-cover bg-fixed bg-no-repeat pb-24', className)}
      style={{
        backgroundImage: backgroundImgSrc ? `url("${backgroundImgSrc}")` : '',
        height: isSplash ? '100vh' : undefined,
      }}
    >
      {children}
    </section>
  );
};

export default SectionScreen;
