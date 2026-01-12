import { Link } from "react-router-dom";
import { MdBlock } from "react-icons/md";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <MdBlock className="text-red-500 text-6xl mb-4" />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Access Denied
      </h1>

      <p className="text-gray-600 text-center max-w-md mb-6">
        You do not have permission to access this page.
        Please contact the administrator if you believe this is a mistake.
      </p>

      <Link
        to="/dashboard"
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
