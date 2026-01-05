import express from "express";
import { GenerateInvoice, getAllInvoices, getInvoiceAmountFromStripe, getInvoiceById, getInvoicesforUser } from "../application/invoice";
import { Authenticate } from "./middleware/authentication";
import { Authorization } from "./middleware/authorization";

const InvoiceRouter = express.Router();

InvoiceRouter.post('/generate',Authenticate,GenerateInvoice);
InvoiceRouter.get('/',Authenticate, getInvoicesforUser);
InvoiceRouter.get('/stripe/:stripeInvoiceId',Authenticate, getInvoiceAmountFromStripe);
InvoiceRouter.get('/:invoiceId',Authenticate, getInvoiceById);
InvoiceRouter.get('/admin/all',Authenticate,Authorization, getAllInvoices);

export default InvoiceRouter;
