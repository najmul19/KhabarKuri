import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "var(--error)",
      confirmButtonText: "Yes, delete it!",
      background: 'var(--card-bg)',
      color: 'var(--text)'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.name} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
            background: 'var(--card-bg)',
            color: 'var(--text)'
          });
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SectionTitle
        heading="Manage All Menu Items"
        subHeading="Control Your Culinary Offerings"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-[var(--shadow)] overflow-hidden mt-8"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-[var(--primary)]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Item Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">
                  Category
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-[var(--border)]">
              {menu.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-[var(--background)] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-full w-full rounded-lg object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text)]">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-muted)] capitalize">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)] text-right">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)] text-center space-x-2">
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => handleDeleteItem(item)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-[var(--error)] text-white hover:bg-opacity-80 transition-colors"
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {menu.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-[var(--background)] rounded-full flex items-center justify-center mb-4 border border-[var(--border)]">
              <FaUsers className="text-3xl text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text)]">No menu items found</h3>
            <p className="text-[var(--text-muted)] mt-1">Add some delicious items to get started</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageItems;