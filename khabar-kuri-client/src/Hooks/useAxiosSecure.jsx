import axios from "axios";
export const aciosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  return aciosSecure;
};

export default useAxiosSecure;
