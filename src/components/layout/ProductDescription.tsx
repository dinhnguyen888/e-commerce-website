import parse from "html-react-parser";

interface ProductDescriptionProps {
    description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
    description,
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Đặc tả dự án
            </h2>
            <div className="prose max-w-none">{parse(description)}</div>
        </div>
    );
};
