import { Loader } from "lucide-react";

function Loading() {
    return (
        <div className="flex items-center justify-center h-full  ">
            <Loader className="animate-spin text-blue-500" size={48} />
        </div>
    );
}

export default Loading;
