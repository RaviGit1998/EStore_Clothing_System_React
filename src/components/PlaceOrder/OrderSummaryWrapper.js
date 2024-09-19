import OrderSummary from "./OrderSummary";
import { useParams } from "react-router-dom";


const OrderSummaryWrapper = () => {
    const { id } = useParams();
    return <OrderSummary id={id} />;
  };

  export default OrderSummaryWrapper;