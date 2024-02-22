import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

export const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const {id} = useParams()

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  
  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateFirstName(value) {
    if (value === "" || (value.trim() && nameRegex.test(value))) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
      return true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: "Invalid first name" }));
      return false;
    }
  }

  function validateLastName(value) {
    if (value === "" || (value.trim() && nameRegex.test(value))) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
      return true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: "Invalid last name" }));
      return false;
    }
  }

  function validateEmail(value) {
    if (value === "" || (value.trim() && emailRegex.test(value))) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      return true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email address" }));
      return false;
    }
  }

  useEffect(() => {
    if (firstName !== "") validateFirstName(firstName);
    if (lastName !== "") validateLastName(lastName);
    if (email !== "") validateEmail(email);
  }, [firstName, lastName, email]);

  function validateForm() {
    return errors.firstName === "" && errors.lastName === "" && errors.email === "";
  }

  function pageTitle() {
    if(id) {
      return <h2 className="text-center">Update Employee Details</h2>
    } else {
      return <h2 className="text-center">Add New Employee</h2>
    }
  }

  const navigator = useNavigate();

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    const errorsCopy = { ...errors };

  if (firstName.trim() === "") {
    errorsCopy.firstName = "First name is required";
  }

  if (lastName.trim() === "") {
    errorsCopy.lastName = "Last name is required";
  }

  if (email.trim() === "") {
    errorsCopy.email = "Email is required";
  }

  setErrors(errorsCopy);

  if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "") {
    return;
  }

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);
  
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator('/employees');
          })
          .catch((error) => {
            console.error(error);
            alert(error.response.data)
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator('/employees');
          })
          .catch((error) => {
            console.error(error);
              alert(error.response.data)
          });
      }
    }
  }

  useEffect(() => {
    if(id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
      }).catch(error => {
        console.log(error)
      })
    }
  },[])

  return (
    <div className="container">
      <br></br>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name: </label>
                <input
                  type="text"
                  placeholder="Enter employee first name"
                  name="firstName"
                  value={firstName}
                  className= {`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value) && validateFirstName(e.target.value)}
                ></input>
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name: </label>
                <input
                  type="text"
                  placeholder="Enter employee last name"
                  name="lastName"
                  value={lastName}
                  className= {`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value) && validateLastName(e.target.value)}  
                ></input>
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email: </label>
                <input
                  type="email"
                  placeholder="Enter employee email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ""}`}
                  onChange={(e) => setEmail(e.target.value) && validateEmail(e.target.value)}
                ></input>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
