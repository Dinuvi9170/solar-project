import { useParams } from "react-router-dom";
import { useGetInvoiceByIdQuery } from "@/lib/redux/query";
import CheckoutForm from "./components/CheckoutForm";
import { Calendar, Zap, FileText, CheckCircle, Loader2 } from "lucide-react";

const PaymentPage = () => {
  const { invoiceId } = useParams();
  const { data: invoice, isLoading, isError, error } = useGetInvoiceByIdQuery({ invoiceId });

  if (isLoading)
    return (
      <div className="w-full h-screen py-40 bg-gray-100 flex justify-center items-center flex-col">
        <Loader2 color="gray" className="w-8 h-8 animate-spin text-teal-500" />
        <span className="mt-4 font-semibold text-lg text-gray-700 animate-pulse">Loading...</span>
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-screen flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">
          {error?.data?.message || "Failed to load invoice"}
        </p>
      </div>
    );

  if (!invoice) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Invoice Payment</h1>

      <div className="md:flex md:gap-6">
        {/* Left: Invoice Summary */}
        <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Invoice Details</h2>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
            <FileText className="text-blue-500 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Invoice ID</p>
              <p className="text-gray-800 font-medium">{invoice._id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
            <Calendar className="text-teal-500 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Billing Period</p>
              <p className="text-gray-800 font-medium">
                {new Date(invoice.billingPeriodStart).toLocaleDateString()} →{" "}
                {new Date(invoice.billingPeriodEnd).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
            <Zap className="text-yellow-500 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Energy Generated</p>
              <p className="text-gray-800 font-medium">{invoice.totalEnergyGenerated} kWh</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
            <CheckCircle
              className={`w-6 h-6 ${
                invoice.paymentStatus === "PAID"
                  ? "text-green-500"
                  : invoice.paymentStatus === "PENDING"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            />
            <div>
              <p className="text-gray-500 text-sm">Payment Status</p>
              <p
                className={`font-semibold ${
                  invoice.paymentStatus === "PAID"
                    ? "text-green-700"
                    : invoice.paymentStatus === "PENDING"
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}
              >
                {invoice.paymentStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Payment Section */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          {invoice.paymentStatus === "PENDING" ? (
            <div className="bg-gray-50 p-6 rounded-xl shadow-inner space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Proceed to Payment
              </h2>
              <CheckoutForm invoiceId={invoice._id} />
              <button
                onClick={() => window.history.back()}
                className="w-full mt-2 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-green-600 font-semibold text-lg">
                This invoice has already been paid.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
