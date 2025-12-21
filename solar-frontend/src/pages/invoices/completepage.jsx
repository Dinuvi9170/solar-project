import { useSearchParams, Link } from "react-router-dom";
import { useGetSessionStatusQuery } from "@/lib/redux/query";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  CreditCard,
} from "lucide-react";

export default function PaymentCompletePage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen py-40 bg-gray-100 flex justify-center items-center flex-col">
        <Loader2 color="gray" className="w-8 h-8 animate-spin text-teal-500" />
        <span className="mt-4 font-semibold text-lg text-gray-700 animate-pulse">Loading...</span>
      </div>
    );
  }

  const isSuccess = data?.paymentStatus === "paid";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          ) : (
            <XCircle className="w-14 h-14 text-red-500" />
          )}
        </div>

        <h1
          className={`text-2xl font-bold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Payment Successful" : "Payment Failed"}
        </h1>

        <p className="mt-2 text-gray-600">
          {isSuccess
            ? "Your payment has been processed successfully."
            : "We couldn't complete your payment. Please try again."}
        </p>

        {isSuccess && (
          <div className="mt-6 bg-gray-50 rounded-xl p-4 border">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Amount Paid</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              ${(data.amountTotal / 100).toFixed(2)}
            </p>
          </div>
        )}

        <div className="mt-8">
          <Link
            to="/dashboard/invoices"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Invoices
          </Link>
        </div>
      </div>
    </div>
  );
}
