const Login = () => {
    const handleLogin=(e)=>{
        e.preventDefault();
        const form  = e.target;
        const email = form.email.value
        const password = form.password.value
        console.log({email,password})
    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content  flex-col lg:flex-row-reverse ">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card  md:w-1/2 bg-base-100 w-full max-w-sm shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
