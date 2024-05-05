import {Link} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useState} from "react";
import "./AuthStyle.css"
import axios from "axios";

function Register() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [confPassword, setConfPassword] = useState("");
    const [confPasswordError, setConfPasswordError] = useState(false);
    const [role, setRole] = useState(0);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity() || emailError || passwordError || nameError || confPasswordError) {
            alert("Данные некорректны")
            return
        }
        const data = new FormData();
        data.append('email', email)
        data.append('name', name)
        data.append('password', password)
        data.append('role', role)
        axios.post("/http://west-pulling.gl.at.ply.gg:9130/api/users", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: () => true
        }).then((response) => {
            if (response.status === 409)
                alert("Такой пользователь уже есть")
            if (response.status === 201)
                axios.post("/http://west-pulling.gl.at.ply.gg:9130/api/login", {
                    "email": email,
                    "password": password
                }).then((loginResponse) => {
                    localStorage.setItem("token", loginResponse.data.access_token)
                    window.location.href = "/";
                })
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
    const handleNameChange = e => {
        setName(e.target.value);
        if (e.target.value.length < 4) {
            setNameError("Имя должно быть минимум 4 символов в длину");
        } else if (e.target.value.length > 30) {
            setNameError("Имя должно быть не больше 30 символов");
        } else {
            setNameError(false);
        }
    };
    const handleConfPasswordChange = e => {
        setConfPassword(e.target.value);
        if (e.target.value !== password) {
            setConfPasswordError("Пароли должны совпадать");
        } else {
            setConfPasswordError(false);
        }
    };

    const handleRoleChange = e => {
        setRole((e.target.checked === true ? 1 : 0));
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
                    Регистрация
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
                        name="name"
                        label="Имя"
                        type="text"
                        id="name"
                        autoComplete="name"
                        onChange={handleNameChange}
                        error={nameError}
                        helperText={nameError}
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confPassword"
                        label="Повтор пароля"
                        type="password"
                        id="confPassword"
                        onChange={handleConfPasswordChange}
                        error={confPasswordError}
                        helperText={confPasswordError}
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
                    <FormControlLabel
                        control={
                            <Checkbox onChange={handleRoleChange} name="role"/>
                        }
                        label="Роль"
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
                            <Link to={"/auth"} state={{action: "login"}} variant="body2">
                                {"Есть аккаунт? Войти"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Register;