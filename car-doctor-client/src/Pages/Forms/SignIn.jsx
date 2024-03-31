import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import sidePhoto from "../../assets/images/login/login.svg"
import axios from "axios";
import useAuth from "../../hooks/useAuth";


const SignIn = () => {
    const navigate = useNavigate()
    const {signInUser} = useAuth()

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password);
        signInUser(email, password)
        .then(res => {
            const loggedInUser = res.user
            console.log(loggedInUser);
            const user = {email};
            // navigate(location?.state ? location?.state : "/")
            // navigate("/")

            // get access token ------------
            axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
            .then(res => {
                console.log(res.data);
                if(res.data.success){
                     navigate(location?.state ? location?.state : "/")
                }
            })

        })
        .catch(err => console.error(err))


// node > require('crypto').randomBytes(64) > require('crypto').randomBytes(64).toString('hex')



        
    }
    return (
        <div className="">

            <div className="container mx-auto min-h-screen py-9 px-[10%]">
                <div className=" flex flex-col md:flex-row  justify-between items-center">
                    <div className=" hidden md:block  w-full md:w-2/4 pr-12" >
                        <img className="  lg:ml-[10%] " src={sidePhoto} alt="" />
                    </div>


                    <div className=" w-full md:w-2/4 p-12 rounded-md border">
                        <h1 className="text-4xl font-bold py-6 text-center">Login now!</h1>
                        <form onSubmit={handleSignIn}  className=" space-y-3">
                            <div className="form-control">
                                <label className="label font-bold">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label font-bold">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-secondary">Login</button>
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <h4 className=" py-3 font-semibold text-base">create an account?  <Link to='/signup' className=" text-red-600">Sign Up</Link> </h4>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;