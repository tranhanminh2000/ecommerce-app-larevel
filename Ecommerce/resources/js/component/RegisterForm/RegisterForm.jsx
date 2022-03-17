import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import "./registerForm.scss";
import * as actions from "../../actions";
import AxiosService from "../../services/AxiosService";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "First Name Is Too Short!")
        .max(50, "First Name Is Too Long!")
        .required("First Name Is Required"),
    lastName: Yup.string()
        .min(2, "Last Name Too Short!")
        .max(50, "Last Name Too Long!")
        .required("Last Name Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ),
});

// Component
const RegisterForm = () => {
    const [state, setState] = useState({
        alert: null,
    });

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            handleRegister(values);
        },
    });

    const handleShowLogin = () => {
        dispatch(actions.showModal());
        dispatch(actions.changeModalTitle("Login"));
        dispatch(actions.changeModalContent(<LoginForm />));
    };

    const handleRegister = async (userInfo) => {
        let infoRegister = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: userInfo.password,
        };

        const res = await AxiosService.post("/register", infoRegister);

        if (res.status === 200) {
            setState({
                ...state,
                alert: { status: "success", message: "Register successfully" },
            });
        } else {
            setState({
                ...state,
                alert: { status: "error", message: "Register failed" },
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div class="mb-3">
                <div class="name-group">
                    <div className="f-Name">
                        <label for="firstName" class="form-label">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            class="form-control"
                            onChange={(e) => {
                                formik.handleChange(e);
                                setState({ alert: null });
                            }}
                            value={formik.values.firstName}
                        />
                        {formik.errors.firstName ? (
                            <div className="error-message">
                                {formik.errors.firstName}
                            </div>
                        ) : null}
                    </div>
                    <div className="l-Name">
                        <label for="lastName" class="form-label">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            class="form-control"
                            onChange={(e) => {
                                formik.handleChange(e);
                                setState({ alert: null });
                            }}
                            value={formik.values.lastName}
                        />
                        {formik.errors.lastName ? (
                            <div className="error-message">
                                {formik.errors.lastName}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                    Email address
                </label>
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
                <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                </div>
                {formik.errors.email ? (
                    <div className="error-message">{formik.errors.email}</div>
                ) : null}
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                    Password
                </label>
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

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                    Password Confirm
                </label>
                <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    class="form-control"
                    onChange={(e) => {
                        formik.handleChange(e);
                        setState({ alert: "" });
                    }}
                    value={formik.values.passwordConfirmation}
                />
                {formik.errors.passwordConfirmation ? (
                    <div className="error-message">
                        {formik.errors.passwordConfirmation}
                    </div>
                ) : null}
            </div>

            {state.alert ? (
                <div
                    class={classNames("alert ", {
                        "alert-success": state.alert.status === "success",
                        "alert-danger": state.alert.status === "error",
                    })}
                    role="alert"
                >
                    {state.alert.message}
                </div>
            ) : null}

            <button type="submit" class="btn btn-primary btn-register-now">
                REGISTER NOW
            </button>

            <div onClick={handleShowLogin}>Back To Login</div>
        </form>
    );
};

export default RegisterForm;
