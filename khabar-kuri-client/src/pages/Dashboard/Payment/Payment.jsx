import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
//5/20/2025
// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);
const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading="Payment"
        subHeading="Please pay to eat"
      ></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
            <CheckOutForm>

            </CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
