import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-3 py-1 rounded-md bg-red-500 text-white"
    >
      Back
    </button>
  );
};

const newButton = memo(BackButton);

export default newButton;