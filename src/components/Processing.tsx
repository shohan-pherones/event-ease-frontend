import { Loader2 } from "lucide-react";

const Processing = () => {
  return (
    <span className="flex items-center gap-2 justify-center">
      <Loader2 className="animate-spin" />
      Processing
    </span>
  );
};

export default Processing;
