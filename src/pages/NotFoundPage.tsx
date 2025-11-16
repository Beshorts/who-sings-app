import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4">
      <div className="bg-rose-50 flex flex-col rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary-700 text-center mb-2 ">
          404 - PAGE NOT FOUND
        </h1>
        <Link className="text-gray-600 cursor-pointer text-center mb-4 underline" to="/">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
