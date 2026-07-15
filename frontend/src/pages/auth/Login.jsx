import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
const onSubmit = async (data) => {

    try{

        const response = await login(data);

        localStorage.setItem(
            "token",
            response.data.token
        );

        toast.success("Login Successful");

        navigate("/dashboard");

    }catch(error){

        toast.error("Invalid Email or Password");

        console.log(error);

    }

};

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "100%", p: 2 }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
                  <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h4" fontWeight="bold">
                  Welcome Back
                </Typography>

                <Typography color="text.secondary">
                  Login to Personal Expense Tracker
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Login
              </Button>

              <Typography align="center" sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Link component={RouterLink} to="/register">
                  Register
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;