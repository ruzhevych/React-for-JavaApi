import { Link } from "react-router-dom";

export default function NoMatch() {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
            <p className="text-lg text-gray-700">The page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Go to Home</Link>
        </div>
    );
}
