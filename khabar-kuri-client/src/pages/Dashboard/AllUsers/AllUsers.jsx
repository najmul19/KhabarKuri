import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You're about to delete ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--error)",
      cancelButtonColor: "var(--text-muted)",
      confirmButtonText: "Yes, delete!",
      background: 'var(--card-bg)',
      color: 'var(--text)'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${user.name} has been removed.`,
              icon: "success",
              background: 'var(--card-bg)',
              color: 'var(--text)'
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Change Role",
      text: `Make ${user.name} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "var(--text-muted)",
      confirmButtonText: "Yes, make admin!",
      background: 'var(--card-bg)',
      color: 'var(--text)'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Role Updated!",
              text: `${user.name} is now an admin.`,
              icon: "success",
              background: 'var(--card-bg)',
              color: 'var(--text)'
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SectionTitle 
        heading="Manage Users" 
        subHeading="Control User Access and Permissions" 
      />

      {/* Stats Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[var(--background)] to-[var(--deep)] text-white p-6 rounded-xl shadow-lg mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-2xl font-bold">User Management</h3>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-sm opacity-90">Total Users</p>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-[var(--shadow)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--deep)] text-white">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-[var(--background)] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-[var(--text)]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary-dark)]">
                        <FaUser className="text-lg" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[var(--text)]">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text)]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.role === "admin" ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--success)] bg-opacity-20 text-[var(--primary)]">
                        Admin
                      </span>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMakeAdmin(user)}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2"
                      >
                        <FaUserShield />
                        Make Admin
                      </motion.button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(user)}
                      className="p-2 rounded-full bg-[var(--primary)] bg-opacity-20 text-[var(--error)] hover:bg-opacity-30 transition-colors"
                      title="Delete User"
                    >
                      <FaTrashAlt />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-[var(--background)] rounded-full flex items-center justify-center mb-4 border border-[var(--border)]">
              <FaUser className="text-3xl text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text)]">No users found</h3>
            <p className="text-[var(--text-muted)] mt-1">User list will appear here</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllUsers;