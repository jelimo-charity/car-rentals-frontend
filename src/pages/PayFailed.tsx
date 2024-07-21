import { ArrowLeftToLine } from 'lucide-react';
import { Link } from 'react-router-dom';
 
const PaymentFailed = () => {
  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
<div className="flex items-center mb-4">
<ArrowLeftToLine className="h-6 w-6 text-red-500" />
<Link to="/userdash/booking" className="text-red-500 ml-2 hover:underline">
          Back to Dashboard
</Link>
</div>
<div className="bg-white p-10 rounded-lg shadow-xl text-center">
<div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
<span className="text-4xl text-red-500">✖</span>
</div>
<h1 className="text-3xl font-extrabold text-red-600 mb-2">Payment Failed</h1>
<p className="text-gray-600">We encountered an issue processing your payment.</p>
<p className="text-gray-600 mt-2">Please try again or contact support for assistance.</p>
</div>
</div>
  );
};
 
export default PaymentFailed;