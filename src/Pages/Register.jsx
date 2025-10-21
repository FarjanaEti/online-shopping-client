
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import lottieAnimation from "../assets/Animation - 1733851369003.json";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import AuthContext from "../Provider/AuthContext";



const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { createUser,googleSignIn} = useContext(AuthContext);
    const onSubmit = async (data) => {
        try {
                     
            const result = await createUser(data.email, data.password);
            const _loggedUser = result.user;

            

            const userInfo = {
                name: data.name,
                email: data.email,
                url: "https://i.ibb.co.com/TxF8HFNw/gratisography-augmented-reality-800x525.jpg",
                role: data.role,
               
            };

            const res = await axiosPublic.post("/users", userInfo);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Error signing up user:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong. Please try again.",
            });
        }
    };

    //google signup
     const handleGoogleLogin = () => {
  googleSignIn()
    .then((res) => {
      const user = res.user;
      if (!user?.email || !user?.displayName) {
        throw new Error('Missing essential user data from Google login');
      }

      const userInfo = {
        email: user?.email,
        name: user?.displayName,
        url:user.photoURL,
        role: 'worker',
      };

      console.log('Sending user data to backend:', userInfo);

      axiosPublic
        .post('/users', userInfo)
        .then((res) => {
          console.log('User inserted:', res.data);
          navigate('/');
        })
        .catch((error) => {
          if (error.response?.status === 400 && error.response?.data?.message === "User already exist") {
            
            console.warn("User already exists, proceeding to login...");
            navigate('/');
          } else {
            
            console.error('Error storing user data:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.response?.data?.message || error.message,
            });
          }
        });
    })
    .catch((err) => {
      console.error('Google login failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: err.message || 'Something went wrong with Google sign-in.',
      });
    });
};


    return (
        <>
            
            <div className="hero min-h-screen  pt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left h-96 md:w-[500px]">
                        <Lottie animationData={lottieAnimation} loop autoplay />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className="text-2xl font-semibold my-3">Register Here</h2>

                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters" },
                                        maxLength: { value: 20, message: "Maximum 20 characters" },
                                        pattern: {
                                            value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            message: "Include uppercase, lowercase, number, and special character",
                                        },
                                    })}
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                            </div>

                            {/* Role */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Role</span>
                                </label>
                                <select
                                    {...register("role", { required: "Role is required" })}
                                    className="select select-bordered"
                                >
                                    <option value=""> Role </option>
                                    <option value="worker">Worker</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="admin"> Admin </option>
                                </select>
                                {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </form>

                        <div className="divider">OR</div>

                        <div className="card-body">
                            <button onClick={handleGoogleLogin} className="btn btn-outline btn-primary">
                                <FaGoogle className="mr-2" />
                                Sign up with Google
                            </button>
                        </div>

                        <p className="text-center mb-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;