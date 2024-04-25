import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default Loading;
