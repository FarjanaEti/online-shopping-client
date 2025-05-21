
import lotiieLogin from "../assets/login.json";
import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";


const Login = () => {
   
    return (
        <>
            <div className="hero pt-20 min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={lotiieLogin}></Lottie>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form  className="card-body">
                            <p className="font-semibold text-2xl my-3">LogIn Here</p>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                   
                                </label>
                                <input
                                    
                                    type="text"
                                    name="captcha"
                                    placeholder="type the captcha above"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <input
                                  className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div>
                            <button  className="btn ml-7 mb-3">
                                <FaGoogle></FaGoogle> LogIn With Google
                            </button>
                            <p>
                                <small className="ml-10">
                                    New Here? <Link to="/signup">Create an account</Link>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;