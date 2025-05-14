import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
//5/15/2025
const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log(res.data);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin];
};

export default useAdmin;
