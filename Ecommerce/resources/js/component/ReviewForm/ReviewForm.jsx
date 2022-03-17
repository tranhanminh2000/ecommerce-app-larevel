import classNames from "classnames";
import React, { useRef, useState, memo } from "react";
import { useParams } from "react-router-dom";
import * as actions from "../../actions";
import AxiosService from "../../services/AxiosService";
import "./reviewForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const reviewSchema = Yup.object().shape({
    title: Yup.string()
        .max(120, "Title Is Not Over 120 Characters !")
        .required("Title is Required"),
});

// Component
const ReviewForm = ({ returnDefaultState }) => {
    const { id } = useParams();

    const [state, setState] = useState({
        alert: null,
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            detail: "",
            rating: 5,
        },
        validationSchema: reviewSchema,
        onSubmit: (values) => {
            handlePostReview(values);
        },
    });

    const handlePostReview = async (reviewContent) => {
        const res = await AxiosService.post("/reviews", {
            bookId: id,
            reviewTitle: reviewContent.title,
            reviewDetails: reviewContent.detail,
            ratingStar: reviewContent.rating,
        });

        if (res.status === 200) {
            returnDefaultState();
            (formik.values.title = ""),
                (formik.values.detail = ""),
                setState({
                    ...state,
                    alert: {
                        status: "success",
                        content: "Post review successfully!",
                    },
                });
            setTimeout(() => {
                setState({ ...state, alert: { status: "", content: "" } });
            }, 6000);
        }
    };

    return (
        <div className="write-review">
            <h3 className="title">Write a review</h3>
            <form className="form-review" onSubmit={formik.handleSubmit}>
                <div class="form-group">
                    <label for="title">Add A Title</label>
                    <input
                        type="text"
                        class="form-control"
                        id="title"
                        onChange={(e) => {
                            formik.handleChange(e);
                            setState({ alert: "" });
                        }}
                        value={formik.values.title}
                    />
                    {formik.errors.title ? (
                        <div className="error-message">
                            {formik.errors.title}
                        </div>
                    ) : null}
                </div>
                <div class="form-group">
                    <label for="detail">Detail</label>
                    <textarea
                        class="form-control"
                        id="detail"
                        rows="3"
                        onChange={(e) => {
                            formik.handleChange(e);
                            setState({ alert: "" });
                        }}
                        value={formik.values.detail}
                    />
                    {formik.errors.detail ? (
                        <div className="error-message">
                            {formik.errors.detail}
                        </div>
                    ) : null}
                </div>

                <div class="form-group">
                    <label for="rating">Select a rating star</label>
                    <select
                        class="form-control"
                        id="rating"
                        value={formik.values.rating}
                        onChange={(e) => {
                            formik.handleChange(e);
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((ele) => {
                            return <option value={ele}>{ele} Star</option>;
                        })}
                    </select>
                </div>

                {state.alert ? (
                    <div
                        class={classNames("alert", {
                            "alert-danger": state.alert.status === "error",
                            "alert-success": state.alert.status === "success",
                        })}
                        role="alert"
                    >
                        {state.alert.content}
                    </div>
                ) : null}

                <button className="btn btn-primary submit-review" type="submit">
                    SUBMIT REVIEW
                </button>
            </form>
        </div>
    );
};

export default memo(ReviewForm);
