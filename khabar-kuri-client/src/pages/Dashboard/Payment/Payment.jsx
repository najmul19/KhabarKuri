import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
//5/20/2025
// add publishable key
const stripePromise = loadStripe('');
const Payment = () => {
    return (
        <div>
            <SectionTitle
            heading="Payment"
            subHeading="Please pay to eat"
            ></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    
                </Elements>
            </div>
        </div>
    );
};

export default Payment;