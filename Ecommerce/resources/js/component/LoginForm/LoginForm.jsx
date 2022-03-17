import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions";
import AxiosService from "../../services/AxiosService";
import RegisterForm from "./../RegisterForm/RegisterForm";
import "./loginForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
});

// Component
const LoginForm = () => {
    const dispatch = useDispatch();

    let [state, setState] = useState({
        alert: "",
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    const handleLogin = async (userInfo) => {
        try {
            const res = await AxiosService.post("/login", {
                email: userInfo.email,
                password: userInfo.password,
            });
            let accessToken = res.data.access_token;
            dispatch(actions.actUserLogin(accessToken));
            dispatch(actions.hideModal());
        } catch (error) {
            setState({ alert: error.response.data.message });
        }
    };

    const handleShowRegister = () => {
        dispatch(actions.showModal());
        dispatch(actions.changeModalTitle("Register"));
        dispatch(actions.changeModalContent(<RegisterForm />));
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div class="mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                        formik.handleChange(e);
                        setState({ alert: "" });
                    }}
                    value={formik.values.email}
                />
                {formik.errors.email ? (
                    <div className="error-message">{formik.errors.email}</div>
                ) : null}
            </div>

            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    class="form-control"
                    onChange={(e) => {
                        formik.handleChange(e);
                        setState({ alert: "" });
                    }}
                    value={formik.values.password}
                />
                {formik.errors.password ? (
                    <div className="error-message">
                        {formik.errors.password}
                    </div>
                ) : null}
            </div>

            {state.alert ? (
                <div class="alert alert-danger" role="alert">
                    {state.alert}
                </div>
            ) : null}

            <div className="button-group">
                <button className="btn btn-primary btn-signIn" type="submit ">
                    Login
                </button>
                <button
                    className="btn btn-primary btn-register"
                    onClick={handleShowRegister}
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
