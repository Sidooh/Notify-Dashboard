import React, {lazy, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {IMAGES} from '../../constants';
import {Helpers} from '../../utils/helpers';
import {login, reset} from '../../features/auth/authSlice';
import {useAuth} from '../../hooks/useAuth';
import {useAppDispatch} from '../../app/hooks';
import * as yup from 'yup';
import {useFormik} from 'formik';
import Guest from '../../layouts/Guest';

const LoadingButton = lazy(() => import('@mui/lab/LoadingButton'))
const LoginSharp = lazy(() => import('@mui/icons-material/LoginSharp'))

const validationSchema = yup.object({
    email: yup.string().email('Must be a valid email').max(100).required('Email is required.'),
    password: yup.string().max(20).required('Password is required.')
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {auth, isLoading, isError, isSuccess, message} = useAuth();

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: validationSchema,
        onSubmit: values => dispatch(login(values))
    });

    useEffect(() => {
        if (isError) Helpers.toast({msg: message, type: 'danger'});
        if (isSuccess || auth) navigate('/');

        dispatch(reset());

    }, [auth, isError, isSuccess, message, navigate, dispatch]);

    return (
        <Guest>
            <div className="row flex-center min-vh-100 g-0 mt-n5">
                <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 position-relative">
                    <img className="bg-auth-circle-shape" src={IMAGES.icons.spotIllustrations.bg_shape} alt=""
                         width="250"/>
                    <img className="bg-auth-circle-shape-2" src={IMAGES.icons.spotIllustrations.shape_1} alt=""
                         width="150"/>
                    <Link className="d-flex flex-center mb-4" to={'/'}>
                        <img className="me-2" src={IMAGES.logos.sidooh} alt="" width="100"/>
                    </Link>
                    <div className="card">
                        <div className="card-body p-4 p-sm-5">
                            <div className="row flex-between-center mb-2">
                                <div className="col-auto"><h5>Sign In</h5></div>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <input className="form-control" type="email" value={formik.values.email}
                                           name={'email'} autoFocus required
                                           placeholder="Email address" onChange={formik.handleChange}/>
                                    <small
                                        className={'text-danger'}>{formik.touched.email && formik.errors.email}</small>
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="password" value={formik.values.password}
                                           name={'password'} onChange={formik.handleChange} placeholder="Password"
                                           required/>
                                    <small
                                        className={'text-danger'}>{formik.touched.password && formik.errors.password}</small>
                                </div>
                                <div className="row flex-between-center">
                                    <div className="col-auto">
                                        <div className="form-check mb-0">
                                            <input className="form-check-input" type="checkbox"
                                                   id="basic-checkbox" defaultChecked={true}/>
                                            <label className="form-check-label mb-0" htmlFor="basic-checkbox">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <Link className="fs--1" to="/login">Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <LoadingButton size="small" color="primary" loading={isLoading}
                                                   loadingPosition="end" className="w-100 mt-3"
                                                   onClick={() => formik.submitForm()}
                                                   endIcon={<LoginSharp/>} variant="contained">
                                        Sign In
                                    </LoadingButton>
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
                                        <span className="fab fa-google-plus-g me-2" data-fa-transform="grow-8"/> google
                                    </Link>
                                </div>
                                <div className="col-sm-6">
                                    <Link className="btn btn-outline-facebook btn-sm d-block w-100" to="/login">
                                        <span className="fab fa-facebook-square me-2" data-fa-transform="grow-8"/>
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
