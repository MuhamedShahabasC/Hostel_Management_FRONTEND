export interface IPayment {
  student: {
    _id: string;
    name: string;
    email: string;
  };
  refId: string;
  amount: number;
  date: Date;
  balancePayment: number;
  paidPayment: number;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface SuccessfulPayment {
  orderCreationId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  razorpayOrderId: string;
  amount: number;
}
