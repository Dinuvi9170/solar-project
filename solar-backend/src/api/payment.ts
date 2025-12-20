import express from "express";
import { createCheckoutSession, getSessionStatus } from "../application/payment";
import { Authenticate } from "./middleware/authentication";

const PaymentRouter = express.Router();

PaymentRouter.post("/create-checkout-session",Authenticate,createCheckoutSession);
PaymentRouter.get("/session-status",Authenticate,getSessionStatus);

export default PaymentRouter;