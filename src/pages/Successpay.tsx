import { ArrowLeftToLine } from 'lucide-react';
import { Link } from 'react-router-dom';
 
const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="flex items-center mb-4">
                <ArrowLeftToLine className="h-6 w-6 text-blue-500" />
                <Link to="/userdash/booking" className="text-blue-500 ml-2 hover:underline">Back to Dashboard</Link>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-xl text-center">
                <svg
                    className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin-slow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Payment Confirmed</h1>
                <p className="text-gray-600">Your transaction has been completed successfully.</p>
                <p className="text-gray-600 mt-2">Thank you for your payment!</p>
            </div>
        </div>
  )
}
 
export default PaymentSuccess