import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      
      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} added successfully!`,
          showConfirmButton: false,
          timer: 1500,
          background: 'var(--card-bg)',
          color: 'var(--text)'
        });
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SectionTitle 
        heading={"Add New Menu Item"}
        subHeading={"Expand Your Culinary Offerings"}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-8 shadow-[var(--shadow)] mt-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Recipe Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
              Recipe Name *
            </label>
            <input
              type="text"
              placeholder="Enter recipe name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Category *
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent appearance-none"
                defaultValue="default"
              >
                <option disabled value="default">Select a category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Price *
              </label>
              <input
                type="number"
                placeholder="Enter price"
                {...register("price", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Recipe Details */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
              Recipe Details *
            </label>
            <textarea
              {...register("recipe", { required: true })}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Describe the recipe..."
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
              Image *
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[var(--border)] border-dashed rounded-lg cursor-pointer bg-[var(--background)] hover:border-[var(--primary)] transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-[var(--text-muted)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-[var(--text-muted)]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-[var(--text-muted)]">PNG, JPG, JPEG (MAX. 5MB)</p>
                </div>
                <input 
                  {...register("image", { required: true })} 
                  type="file" 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <FaUtensils />
            Add Menu Item
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddItems;