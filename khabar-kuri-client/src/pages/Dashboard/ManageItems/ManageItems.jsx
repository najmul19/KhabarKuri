import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";

const ManageItems = () => {
  const [menu] = useMenu();
  const handleDeleteItem=(item) =>{

  }
  return (
    <div>
      <SectionTitle
        heading="Manage All Items"
        subHeading="Hurry Up"
      ></SectionTitle>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <td>#</td>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item,indx) => (
                <tr key={item._id}>
                  <th>
                    <label>
                      {indx+1}
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td className="text-right">${item.price}</td>
                  <td>
                    <button
                          // onClick={() => handleMakeAdmin(user)}
                          className="btn btn-ghost bg-orange-500 btn-sm"
                        >
                          <FaEdit className="text-white  "></FaEdit>
                        </button>
                  </td>
                  <td>
                    <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn btn-ghost btn-lg"
                      >
                        <FaTrashAlt className="text-rose-700"></FaTrashAlt>
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
