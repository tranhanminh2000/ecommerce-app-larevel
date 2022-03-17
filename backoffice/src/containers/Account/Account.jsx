import React from "react";
import Layout from "../../components/Layout/Layout";
import "./utilities.css";

function Account() {
  return (
    <Layout>
      <div className="user-account row mt-10">
        <div className="col-sm-4 col-12">
          <div className="user-info shadow p-3 mb-5 bg-body rounded">
            <div class="card rounded border-0">
              <div
                className="warraper-img rounded-circle over-flow-hidden  mg-auto"
                style={{ width: "100px", height: "100px" }}
              >
                <img
                  className="object-fit-cover"
                  src="https://via.placeholder.com/350x150"
                  style={{ width: "100%", height: "100%" }}
                  alt="null"
                />
              </div>
              <div class="card-body">
                <h5 class="card-title">Full Name</h5>
                <p class="card-text">Email:</p>
                <p class="card-text">Gender:</p>
                <p class="card-text">Create at:</p>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-info col-sm-8 col-12 ">
          <form className="shadow p-3 mb-5 bg-body rounded">
            <div class="mb-3">
              <div
                className="name-group"
                style={{ display: "flex", gap: "10px" }}
              >
                <div className="first-name" style={{ flex: "1" }}>
                  <label for="firstName" class="form-label">
                    First Name
                  </label>
                  <input type="text" class="form-control" id="firstName" />
                </div>

                <div className="last-name" style={{ flex: "1" }}>
                  <label for="lastName" class="form-label">
                    Last Name
                  </label>
                  <input type="text" class="form-control" id="lastName" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input type="password" class="form-control" id="password" />
            </div>
            <div class="mb-3">
              <label for="passwordConfirm" class="form-label">
                Password Confirm
              </label>
              <input
                type="password"
                class="form-control"
                id="passwordConfirm"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Account;
