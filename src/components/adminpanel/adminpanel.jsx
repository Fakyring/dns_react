import React, {useEffect, useState} from "react";
import {
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
import axios from "axios";
import "./AdminStyle.css"

function AdminPanel() {
    const [name, setName] = useState("");
    const [type, setType] = useState(1);
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(1);
    const [image, setImage] = useState();
    const [descr, setDescr] = useState("");
    const [nameError, setNameError] = useState(false);
    const [countError, setCountError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [descrError, setDescrError] = useState(false);
    const [typeLabel, setTypeLabel] = useState("Бытовая техника");
    const [imageUrl, setImageUrl] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity() || nameError || countError || priceError || descrError) {
            alert("Данные некорректны")
            return
        }
        const data = new FormData();
        data.append('name', name)
        data.append('type', type)
        data.append('count', count)
        data.append('price', price)
        data.append('image', image)
        data.append('descr', descr)
        axios.post(process.env.REACT_APP_URL + "/api/equipments", data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            validateStatus: () => true
        }).then((response) => {
            window.location.href = "/admin";
        })
    };
    const handleNameChange = e => {
        setName(e.target.value);
        if (e.target.value.length < 10) {
            setNameError("Имя должно быть минимум 10 символов в длину");
        } else if (e.target.value.length > 50) {
            setNameError("Имя должно быть не больше 50 символов");
        } else {
            setNameError(false);
        }
    };
    const handleTypeChange = e => {
        setType((e.target.checked === true ? 1 : 0));
        if (e.target.checked) {
            setTypeLabel("Электронная техника")
        } else
            setTypeLabel("Бытовая техника")
    };
    const handleCountChange = e => {
        setCount(e.target.value);
        if (typeof Number(e.target.value) === "NaN" || e.target.value < 1 || e.target.value > 999999) {
            setCountError("Некорректный тип или слишком большое/отрицательное число");
        } else {
            setCountError(false);
        }
    };
    const handleDescrChange = e => {
        setDescr(e.target.value);
        if (e.target.value.length > 500) {
            setDescrError("Символов должно быть не больше 200");
        } else {
            setDescrError(false);
        }
    };
    const handleFileUpload = e => {
        setImage(e.target.files[0]);
        if (e.target.value.length > 500) {
            setDescrError("Символов должно быть не больше 200");
        } else {
            setDescrError(false);
        }
    };

    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
            console.log(imageUrl)
        }
    }, [image])
    const handlePriceChange = e => {
        setPrice(Number(e.target.value).toFixed(2));
        if (typeof Number(e.target.value) === "NaN" || e.target.value < 1 || e.target.value > 9999999) {
            setPriceError("Некорректный тип или слишком большое/отрицательное число");
        } else {
            setPriceError(false);
        }
    };
    return (
        <Container component="main" maxWidth="xs" className={"adminmain"}>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" style={{color: "white"}}>
                    Добавление оборудования
                </Typography>
                <Box mt={2} className={"adminImage"} textAlign="center">
                    <img style={{padding: "0"}} src={imageUrl} height="100px"/>
                </Box>
                <Box component="form" onSubmit={handleSubmit} validate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Название"
                        type="text"
                        id="name"
                        onChange={handleNameChange}
                        error={nameError}
                        helperText={nameError}
                        inputProps={{maxLength: 50}}
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
                        name="count"
                        label="Количество"
                        type="number"
                        id="count"
                        onChange={handleCountChange}
                        error={countError}
                        helperText={countError}
                        defaultValue={1}
                        inputProps={{max: 999999, min: 1}}
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
                        name="price"
                        label="Цена"
                        type="number"
                        id="price"
                        onChange={handlePriceChange}
                        error={priceError}
                        helperText={priceError}
                        defaultValue={1}
                        inputProps={{max: 9999999, min: 1}}
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
                        name="descr"
                        label="Описание"
                        type="text"
                        id="descr"
                        multiline
                        rows={10}
                        onChange={handleDescrChange}
                        error={descrError}
                        helperText={descrError}
                        inputProps={{maxLength: 500}}
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
                        id={"typeChecker"}
                        control={
                            <Checkbox onChange={handleTypeChange} name="role"/>
                        }
                        label={<span style={{color: "white"}}>{typeLabel}</span>}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        component="label"
                    >
                        Загрузить фотографию
                        <input
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={handleFileUpload}
                        />
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Добавить
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AdminPanel;