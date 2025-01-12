import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  return (
    <div className="h-[calc(100vh-4rem)] wrapper flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default AuthCallback;
