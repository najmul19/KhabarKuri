import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((res) => {
      const loggedUser = res.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("User profile info updated");
          reset();
          Swal.fire({
            title: "User Created Successfully!",
            icon: "success",
            draggable: true,
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  //   console.log(watch("example"));

  return (
    <>
      <Helmet>
        <title>KhabarKuri | SignUp</title>
      </Helmet>
      ;
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  placeholder="name"
                  className="input w-full input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-rose-700">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("photoURL", { required: true })}
                  type="text"
                  placeholder="Photo URL"
                  className="input w-full input-bordered"
                  required
                />
                {errors.photoURL && (
                  <span className="text-rose-700">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input w-full input-bordered"
                  required
                />
                {errors.email && (
                  <span className="text-rose-700">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}/,
                  })}
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input w-full input-bordered"
                  required
                />
                {errors.password?.type == "required" && (
                  <span className="text-rose-700 w-full">
                    Password is required
                  </span>
                )}
                {errors.password?.type == "minLength" && (
                  <span className="text-rose-700 w-full">
                    Password length must be at least 6 characters
                  </span>
                )}
                {errors.password?.type == "maxLength" && (
                  <span className="text-rose-700 w-full">
                    Password length must be less then 20 characters
                  </span>
                )}
                {errors.password?.type == "pattern" && (
                  <span className="text-rose-700 w-full">
                    Password must have one upper case, one lower case, one
                    digit, and one special character
                  </span>
                )}
                <label className="label w-full">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn w-full btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p>
              <small>
                Already Have An Account ? <Link to="/login">Login</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
