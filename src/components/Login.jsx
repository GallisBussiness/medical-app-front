const Login = () => {
  return (
    <div className="login-page">
      <div>
  <div className="login-header box-shadow">
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <div className="brand-logo">
        <a href="login.html">
          <img src="/imgs/logo_crousz.png" className="h-16 w-16" alt="logo" />
        </a>
      </div>
    </div>
  </div>
  <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 col-lg-7">
          <img src="/imgs/medicine.svg" alt="medecine" />
        </div>
        <div className="col-md-6 col-lg-5">
          <div className="login-box bg-white box-shadow border-radius-10">
            <div className="flex items-center justify-center">
              <img src="/imgs/logo_crousz.png" className="h-52 w-60" alt="logo" />
            </div>
          
            <div className="login-title flex items-center justify-center">
              <h2 className="text-green-500">Se connecter à E-médical</h2>
            </div>
            <form>
              <div className="input-group custom">
                <input type="text" className="form-control form-control-lg" placeholder="Username" />
                <div className="input-group-append custom">
                  <span className="input-group-text"><i className="icon-copy dw dw-user1" /></span>
                </div>
              </div>
              <div className="input-group custom">
                <input type="password" className="form-control form-control-lg" placeholder="**********" />
                <div className="input-group-append custom">
                  <span className="input-group-text"><i className="dw dw-padlock1" /></span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="input-group mb-0">
                    {/*
											use code for form submit
											<input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In">
										*/}
                    <a className="btn btn-primary btn-lg btn-block bg-green-600" href="index.html">Se connecter</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Login