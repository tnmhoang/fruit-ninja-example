import { CloseIcon } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ReactNode } from 'react';

const AboutDialog = ({
  title,
  content,
  open,
  setOpen,
}: {
  title: ReactNode;
  content: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex h-full items-center justify-center border-none">
        <div className="relative flex w-[350px] flex-col items-center px-5 py-7">
          <button className="absolute -right-2 -top-2 z-10" onClick={() => setOpen(false)}>
            <CloseIcon className="h-10 w-10" />
          </button>
          <img src="./imgs/qr-frame.png" alt="" className="absolute left-0 top-0 h-full w-full" />
          <AlertDialogHeader>
            <AlertDialogTitle className="text3d-sm relative z-10 flex w-full justify-center gap-[3px] font-backToSchool text-[24px] leading-none text-white">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="hidden"></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="relative flex w-full flex-col gap-5">{content}</div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AboutDialog;
