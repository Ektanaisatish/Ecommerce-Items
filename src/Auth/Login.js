
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext';
import { Box, Button, Typography, TextField } from "@mui/material";
import toast from 'react-hot-toast';
import { LOGIN_SUCCESS ,INVALID_CREDENTIALS, INVALID_EMAIL, PASSWORD_MINLENGTH, PASSWORD_MAXLENGTH, PASSWORD_REQUIRED, Email_REQUIRED } from '../constants/Constants';
import "../assets/GLobal.scss";
function Login() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState(""); 
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  
  const navigate = useNavigate(); 

  const onSubmit = ({ email, password }) => {
    const isLoggedIn = login(email, password);
    if (isLoggedIn) {
      navigate('/products'); 
      toast.success(LOGIN_SUCCESS)
    } else {
      setErrorMessage(INVALID_CREDENTIALS);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={25}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            
          </Typography>
      
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            margin="normal"
            {...register("email", {
              required: Email_REQUIRED,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: INVALID_EMAIL,
              },
            })}
          />
          <p>{formErrors.email?.message} </p>
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            margin="normal"
            {...register("password", {
              required: PASSWORD_REQUIRED,
              minLength: {
                value: 4,
                message: PASSWORD_MINLENGTH,
              },
              maxLength: {
                value: 20,
                message: PASSWORD_MAXLENGTH,
              },
            })}
          />
          <p>{formErrors.password?.message} </p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
export default Login;
