import React, {useState} from 'react';
import Guest from '../../layouts/Guest';
import {IMAGES} from '../../constants';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../components/AuthProvider';
import {useRequest} from '../../hooks';
import {CONFIG} from '../../config';

const Login = () => {
    let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let from = location.state?.from?.pathname || "/";

    const {sendRequest, errors} = useRequest({
        url: `${CONFIG.sidooh.accounts.api.url}/api/users/signin`,
        method: 'post',
        body: {email, password},
        onSuccess: data => auth.handleSignIn(data, () => navigate(from, {replace: true}))
    });

    const onSubmit = async event => {
        event.preventDefault();

        await sendRequest();
    };

    return (
        <Guest>
            <div className="row flex-center min-vh-100 g-0 mt-n5">
                <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 position-relative">
                    <img className="bg-auth-circle-shape" src={IMAGES.icons.spotIllustrations.bg_shape} alt=""
                         width="250"/>
                    <img className="bg-auth-circle-shape-2" src={IMAGES.icons.spotIllustrations.shape_1} alt=""
                         width="150"/>
                    <a className="d-flex flex-center mb-4" href="../../../index.html">
                        <img className="me-2" src={IMAGES.logos.sidooh} alt="" width="100"/>
                    </a>
                    <div className="card">
                        <div className="card-body p-4 p-sm-5">
                            {errors}
                            <div className="row flex-between-center mb-2">
                                <div className="col-auto"><h5>Sign in</h5></div>
                                <div className="col-auto fs--1 text-600">
                                    <span className="mb-0 undefined">or </span>
                                    <span><Link to="/register">Create an account</Link></span>
                                </div>
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <input className="form-control" type="email" value={email} autoFocus
                                           placeholder="Email address" onChange={e => setEmail(e.target.value)}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="password" value={password}
                                           onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                                </div>
                                <div className="row flex-between-center">
                                    <div className="col-auto">
                                        <div className="form-check mb-0">
                                            <input className="form-check-input" type="checkbox"
                                                   id="basic-checkbox" defaultChecked="checked"/>
                                            <label className="form-check-label mb-0" htmlFor="basic-checkbox">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <a className="fs--1" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <div className="position-relative mt-4">
                                <hr className="bg-300"/>
                                <div className="divider-content-center">or log in with</div>
                            </div>
                            <div className="row g-2 mt-2">
                                <div className="col-sm-6">
                                    <Link className="btn btn-outline-google-plus btn-sm d-block w-100"
                                          to="/login">
                                                <span className="fab fa-google-plus-g me-2"
                                                      data-fa-transform="grow-8"/> google
                                    </Link>
                                </div>
                                <div className="col-sm-6">
                                    <Link className="btn btn-outline-facebook btn-sm d-block w-100" to="/login">
                                                <span className="fab fa-facebook-square me-2"
                                                      data-fa-transform="grow-8"/>
                                        facebook
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default Login;
