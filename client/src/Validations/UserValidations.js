import * as yup from 'yup'; //import all exports from the yup

export const userSchemaValidation = yup.object().shape({
    name : yup
    .string()
    .required("User Name is required"),

    email:yup.string().required("Email is required").email("Must be valid "),

    phonNo: yup
    .number()
    .required("It can not be empty please fill it :("),

    password: yup
    .string()
    .required("you cant not leave it Empty :(")
    .min(5,"Password should be minimun 5 charachter")
    .max(11,"Password should be maximum 11 charachter"),
   
    confirmPassword: yup
    .string()
    .required("Confirm your password Please")
    .oneOf([yup.ref("password"),null], "It should be match password")
    .required("You can not Leave it Empty :("),
  });
