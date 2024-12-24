import * as yup from 'yup';
export const LoginValidation = yup.object().shape({
    email:yup.string().required("How You want to leave it Empty :( Writ your email my Dear").email("Must be valid "),
    password: yup.string()
    .required("Hey!! You can not Leave it Empty : (")
    .min(5,"Your password is easy to broken :(, Try to make it Stronge")
    .max(11,"OPPS :(, Too mush Longe, It must Contain 11 Charachters ")

})