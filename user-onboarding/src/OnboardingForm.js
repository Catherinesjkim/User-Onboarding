import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({ values, errors, touched, status }) => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        <label htmlFor="type-users">
          Name
          <Field
            id="type-users"
            type="text"
            name="username"
            placeholder="type-users"
          />
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
        </label>
        <label htmlFor="type-email">
          Email
          <Field
            id="type-email"
            type="text"
            name="email"
            placeholder="type-email"
          />
        </label>
        <label htmlFor="type-password">
          Password
          <Field
            id="type-password"
            type="password"
            name="password"
            placeholder="type-password"
          />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label htmlFor="type-terms">
          Terms
          <Field
            id="type-terms"
            type="checkbox"
            name="terms"
            placeholder="type-terms"
          />
        </label>
        <button type="submit">Submit!</button>
      </Form>
      {users.map(user => {
        return (
          <div key={user.id}>
            <li>Name: {user.username}</li>
            <li>Email: {user.email}</li>
          </div>
        );
      })}
    </div>
  );};
  
const FormikLoginForm = withFormik({
  mapPropsToValues( props ) {
    return {
      username: props.username || "",
      email: props.email || "",
      password: props.password || "",
      terms: props.terms || false,
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("This is a custom error!"),
    password: Yup.string().required("This is a must!")
  }),
  handleSubmit(values, {setStatus, resetForm}) {
    console.log(values);
    axios.post("https://reqres.in/api/users/", values)
    .then(res => {
      setStatus(res.data);
      resetForm()
    })
    .catch(err => console.log(err.response));
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(OnboardingForm);
      
export default FormikLoginForm;