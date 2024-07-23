import { ArrowLeftToLine } from 'lucide-react';
import { Link } from 'react-router-dom';
 
const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-customBlueDarker">
            <div className="flex items-center mb-4">
                <ArrowLeftToLine className="h-6 w-6 text-customBlueDarkest" />
                <Link to="/userdash/booking" className="text-blue-500 ml-2 hover:underline">Back to dashboard</Link>
            </div>
            <div className="bg-customBlueLight p-10 rounded-lg shadow-xl text-center">
            <svg
  className="h-16 w-16 text-green-500 mx-auto mb-4"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M5 13l4 4L19 7"
  />
</svg>

                <h1 className="text-3xl font-extrabold text-yellow-500 mb-2">Payment Confirmed</h1>
                <p className="text-gray-600">Your transaction has been completed successfully.</p>
                <p className="text-gray-600 mt-2">Thank you for your payment!</p>
            </div>
        </div>
  )
}
 
export default PaymentSuccess