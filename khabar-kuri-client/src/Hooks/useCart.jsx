import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  // tanstack query is a state management
  //   query functuon
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: cart = [] } = useQuery({
    queryKey: ["cart",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  return [cart];
};

export default useCart;
