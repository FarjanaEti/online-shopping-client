import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import { FaPlusCircle } from "react-icons/fa";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
  const onSubmit = async (data) => {
    const productData = {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      stock: parseInt(data.stock),
      image: data.image, // direct image URL input
      rating: 0,
       email:cart[0].email,
          name:cart[0].name,
    };

    try {
      const productRes = await axiosSecure.post("/products", productData);

      if (productRes.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Product Added",
          text: `"${data.title}" has been added to the shop.`,
        });
        reset();
      }
    } catch (error) {
      console.log(error)                        
      Swal.fire({
        icon: "error",
        title: "Failed to Add Product",
        text: "Something went wrong. Please try again.",
      });
    }
  };

   return (
    <div className="px-4 md:px-8 lg:px-20 py-6 min-h-screen bg-gray-50">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          <FaPlusCircle className="inline mr-2 text-blue-500" />
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="label font-medium">Product Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
              placeholder="Ex: Samsung Smart TV"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full h-24"
              placeholder="Short description..."
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Price (BDT)</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
                placeholder="45000"
              />
            </div>

            <div>
              <label className="label font-medium">Stock</label>
              <input
                type="number"
                {...register("stock", { required: true })}
                className="input input-bordered w-full"
                placeholder="10"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select category</option>
              <option value="Home Appliance">Home Appliance</option>
              <option value="Men Wardrobe">Men Wardrobe</option>
              <option value="Women Wardrobe">Women Wardrobe</option>
              <option value="Equipment">Equipment</option>
              <option value="Automobiles">Automobiles</option>
              <option value="Automobiles">Electronics</option>
              <option value="Phone and Telecommunication">Phone & Telecommunication</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="label font-medium">Image URL</label>
            <input
              type="text"
              {...register("image", { required: true })}
              className="input input-bordered w-full"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button type="submit" className="btn btn-primary w-full md:w-auto">
              <FaPlusCircle className="mr-2" /> Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
