import { CloseIcon } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';

const qrCode = new QRCodeStyling({
  width: 241,
  height: 241,
  dotsOptions: {
    color: '#000000',
  },
  backgroundOptions: {
    color: 'transparent',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 10,
  },
});

const InviteQRDialog = ({
  referLink,
  open,
  setOpen,
}: {
  referLink: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      ref?.current && qrCode.append(ref.current);
    }, 100);
  }, [open]);

  useEffect(() => {
    qrCode.update({
      data: referLink,
    });
  }, [referLink]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex justify-center border-none">
        <div className="relative flex h-[339px] w-[319px] flex-col items-center justify-between px-10 py-7">
          <button className="absolute -right-2 -top-2 z-10" onClick={() => setOpen(false)}>
            <CloseIcon className="h-10 w-10" />
          </button>
          <img src="./imgs/qr-frame.png" alt="" className="absolute left-0 top-0 h-full w-full" />
          <AlertDialogHeader>
            <AlertDialogTitle className="text3d-sm relative z-10 flex w-full justify-center gap-[3px] font-backToSchool text-[24px] leading-none text-white">
              Invite a Friend
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="hidden"></AlertDialogDescription>

          <div ref={ref} className="relative mx-auto h-[241px] w-[241px] overflow-hidden" />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InviteQRDialog;
