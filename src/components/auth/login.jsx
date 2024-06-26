import {Link, useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useState} from "react";
import "./AuthStyle.css"
import axios from "axios";
import {changeStatus} from "../redux/userSlice";
import {useDispatch, useSelector} from "react-redux";

function Login() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const history = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity() || emailError || passwordError) {
            alert("Данные некорректны")
            return
        }
        axios.post(process.env.REACT_APP_URL + "/api/login", {
            "email": email,
            "password": password
        }, {
            validateStatus: () => true
        }).then((loginResponse) => {
            if (loginResponse.status === 200) {
                localStorage.setItem("token", loginResponse.data.access_token)
                dispatch(changeStatus(0))
                history("/")
            } else
                alert("Неправильные данные")
        })
    };

    const handleEmailChange = e => {
        setEmail(e.target.value);
        if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(e.target.value)) {
            setEmailError("Некорректная почта");
        } else {
            setEmailError(false);
        }
    };
    const handlePasswordChange = e => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setPasswordError("Пароль должен быть минимум 8 символов в длину");
        } else if (e.target.value.length > 20) {
            setPasswordError("Пароль должен быть не больше 20 символов");
        } else {
            setPasswordError(false);
        }
    };
    return (
        <Container component="main" maxWidth="xs" className={"authCard"}>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" style={{color: "white"}}>
                    Авторизация
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={emailError}
                        variant="outlined"
                        color="info"
                        InputLabelProps={{className: "textfield__label"}}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "#ffffff",
                                fontFamily: "Arial",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                    borderWidth: "2px",
                                },
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#8709ff",
                                        borderWidth: "3px",
                                    },
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText={passwordError}
                        inputProps={{maxLength: 20}}
                        InputLabelProps={{className: "textfield__label"}}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "#ffffff",
                                fontFamily: "Arial",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white"
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                    borderWidth: "2px",
                                },
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#8709ff",
                                        borderWidth: "3px",
                                    },
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Авторизоваться
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to={"/auth"} state={{action: "register"}} variant="body2">
                                {"Нет аккаунта? Зарегистрироваться"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;