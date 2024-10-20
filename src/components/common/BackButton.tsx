import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="fixed left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-400 bg-black/60 backdrop-blur-2xl"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
};

export default BackButton;
