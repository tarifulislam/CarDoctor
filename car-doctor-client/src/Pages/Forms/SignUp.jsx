
import { Link, useNavigate } from "react-router-dom";
import sidePhoto from "../../assets/images/login/login.svg"
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
const SignUp = () => {
    const {createUser} = useAuth()
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        console.log(name,email, password);
        createUser(email, password)
        .then(res => {
            console.log(res.user);
            alert("user create sucessfull")
            navigate("/")


        })
        .catch(err => {
            console.log(err);
        })

    }
    return (
        <div className="">
        <div className="container mx-auto min-h-screen py-9 px-[10%]">
            <div className=" flex flex-col md:flex-row  justify-between items-center">
                <div className="w-full  md:w-2/4  hidden md:block  pr-12">
                    <img className="  hidden md:block  ml-[10%] " src={sidePhoto} alt="" />
                </div>

                <div className="w-full md:w-2/4 p-12 rounded-md border">
                    <h1 className="text-4xl font-bold py-6 text-center">Sign In</h1>
                    <form  onSubmit={handleRegister} className=" space-y-3">

                        <div className="form-control">
                            <label className="label font-bold">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                        </div>
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
                            <button type="submit" className="btn btn-secondary">Sign in</button>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                    <h4 className=" py-3 font-semibold text-base">Have an account? <Link to='/signin' className=" text-red-600">log In</Link> </h4>

                </div>
            </div>
        </div>
    </div>
    );
};

export default SignUp;