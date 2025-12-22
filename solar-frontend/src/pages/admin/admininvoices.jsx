import { useState, useEffect } from "react";
import { Loader2, Filter } from "lucide-react";
import {
  useGetAllInvoicesQuery,
  useLazyGetAmountByStripeIDQuery,
} from "@/lib/redux/query";

const AdminInvoices = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [amounts, setAmounts] = useState({});

  const { data: invoices, isLoading } = useGetAllInvoicesQuery({
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const [getAmount] = useLazyGetAmountByStripeIDQuery();

  useEffect(() => {
    if (!invoices) return;

    const fetchAmounts = async () => {
      const promises = invoices.map(async (invoice) => {
        if (!amounts[invoice.stripeInvoiceId]) {
          try {
            const res = await getAmount({ stripeInvoiceId: invoice.stripeInvoiceId }).unwrap();
            setAmounts((prev) => ({ ...prev, [invoice.stripeInvoiceId]: res }));
          } catch (err) {
            console.error("Stripe fetch error:", err);
          }
        }
      });
      await Promise.all(promises);
    };

    fetchAmounts();
  }, [invoices]);

  //if invoice is overdue
  const isOverdue = (invoice) => {
    return (
      invoice.paymentStatus === "PENDING" &&
      new Date(invoice.billingPeriodEnd) < new Date()
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Invoices</h1>

      <div className="flex items-center gap-4 mb-4">
        <Filter />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-blue-200 px-3 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="OVERDUE">Overdue</option>
        </select>
      </div>

      <table className="w-full bg-white border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Invoice ID</th>
            <th className="border px-4 py-2">User Email</th>
            <th className="border px-4 py-2">Billing End</th>
            <th className="border px-4 py-2">Payment Status</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices
            ?.filter((invoice) => {
              if (statusFilter === "all") return true;
              if (statusFilter === "OVERDUE") return isOverdue(invoice);
              return invoice.paymentStatus === statusFilter;
            })
            .map((invoice) => {
              const stripeData = amounts[invoice.stripeInvoiceId];
              return (
                <tr key={invoice._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{invoice._id}</td>
                  <td className="border px-4 py-2">{invoice.userId?.email}</td>
                  <td className="border px-4 py-2">
                    {new Date(invoice.billingPeriodEnd).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 font-semibold">
                    {isOverdue(invoice) ? "OVERDUE" : invoice.paymentStatus}
                  </td>
                  <td className="border px-4 py-2">
                    {stripeData
                      ? `$${(stripeData.total / 100).toFixed(2)}`
                      : "Loading..."}
                  </td>
                  <td className="border px-4 py-2">
                    {stripeData && (
                      <a
                        href={stripeData.hostedInvoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Invoice
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {invoices?.length === 0 && (
        <p className="mt-4 text-center text-gray-500">No invoices found.</p>
      )}
    </div>
  );
};

export default AdminInvoices;
