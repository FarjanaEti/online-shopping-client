import Lottie from "lottie-react";
import lottieAnimation from "../assets/Animation - 1733851369003.json";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Register = () => {
     const { register, formState: { errors } } = useForm();
    return (
        <>
            
            <div className="hero min-h-screen bg-base-200 pt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left h-96 md:w-[500px]">
                        <Lottie animationData={lottieAnimation} loop autoplay />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form  className="card-body">
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
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                        maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                        pattern: {
                                            value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            message:
                                                "Password must include uppercase, lowercase, number, and special character",
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
                                    <option value="worker">Admin</option>
                                    <option value="worker">Customer</option>
                                    <option value="buyer">Seller</option>
                                </select>
                                {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                            </div>

                            {/* Submit Button */}
                            <div className="ml-30 mt-6">
                                <button type="submit" className="btn btn-primary">
                                   SignUP
                                </button>
                            </div>
                        </form>

                        <div className="divider">OR</div>

                        <div className="card-body">
                            <button  className="btn btn-outline btn-primary">
                                <FaGoogle className="mr-2" />
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;