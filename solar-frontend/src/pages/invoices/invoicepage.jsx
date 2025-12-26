import { useState } from "react";
import { useGetAmountByStripeIDQuery, useGetInvoiceQuery } from "@/lib/redux/query";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const STATUS_FILTERS = ["ALL", "PENDING", "PAID"];

const InvoicesPage = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const { data: invoices = [], isLoading, error } = useGetInvoiceQuery();

  const filteredInvoices =
    statusFilter === "ALL"
      ? invoices
      : invoices.filter((inv) => inv.paymentStatus === statusFilter);

  const selectedInvoice = invoices.find((inv) => inv._id === selectedInvoiceId);
  const stripeInvoiceId=selectedInvoice?.stripeInvoiceId;

  const { data: stripeDetails, isLoading: loadingStripe } = useGetAmountByStripeIDQuery({ stripeInvoiceId },{ skip: !stripeInvoiceId });
  console.log(stripeDetails)
  if (isLoading) {
    return (
      <div className="w-full h-screen py-40 bg-gray-100 flex justify-center items-center flex-col">
        <Loader2 color="gray" className="w-8 h-8 animate-spin text-teal-500" />
        <span className="mt-4 font-semibold text-lg text-gray-700 ">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <span className="text-xl font-semibold text-red-500">Failed to load invoices</span>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Invoices</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          {STATUS_FILTERS.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow p-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 rounded-t-lg">
                <tr>
                  <th className="p-3">Invoice ID</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-blue-500">
                      No invoices found
                    </td>
                  </tr>
                )}
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="p-3">{invoice._id.slice(0, 8)}</td>
                    <td className="p-3">{new Date(invoice.billingPeriodStart).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(invoice.billingPeriodEnd).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-700"
                            : invoice.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {invoice.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedInvoiceId(invoice._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col gap-4">
            {filteredInvoices.length === 0 && (
              <div className="p-4 text-center text-blue-500">No invoices found</div>
            )}
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice._id}
                className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    ID: {invoice._id.slice(0, 8)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : invoice.paymentStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {invoice.paymentStatus}
                  </span>
                </div>
                <div className="text-gray-600 text-sm">
                  <p>
                    <strong>Start:</strong> {new Date(invoice.billingPeriodStart).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End:</strong> {new Date(invoice.billingPeriodEnd).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Energy:</strong> {invoice.totalEnergyGenerated} kWh
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInvoiceId(invoice._id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedInvoice && (
          <div className="md:w-1/2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Invoice Details</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedInvoice.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-700"
                    : selectedInvoice.paymentStatus === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selectedInvoice.paymentStatus}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Invoice ID</p>
                <p className="font-medium text-gray-800 break-all">
                  {selectedInvoice._id}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Billing Start</p>
                  <p className="font-medium text-gray-800">
                    {new Date(
                      selectedInvoice.billingPeriodStart
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Billing End</p>
                  <p className="font-medium text-gray-800">
                    {new Date(
                      selectedInvoice.billingPeriodEnd
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500">Energy Generated</p>
                <p className="font-medium text-gray-800">
                  {selectedInvoice.totalEnergyGenerated} kWh
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-3xl font-bold text-blue-600">
                {loadingStripe ? (
                  <span className="text-base text-gray-400">Loading...</span>
                ) : stripeDetails?.total ? (
                  `$${(stripeDetails.total / 100).toFixed(2)}`
                ) : (
                  "-"
                )}
              </p>
            </div>

            {selectedInvoice.paymentStatus === "PENDING" && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/dashboard/invoices/${selectedInvoice._id}/pay`}
                  className="flex-1 text-center bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600 transition"
                >
                  Pay Now
                </Link>
                <button
                  onClick={() => setSelectedInvoiceId(null)}
                  className="flex-1 text-center bg-gray-100 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
