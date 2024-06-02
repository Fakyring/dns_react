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
import {useNavigate, useParams} from "react-router-dom";

function AdminPanel() {
    const [name, setName] = useState("");
    const [type, setType] = useState(2);
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(1);
    const [image, setImage] = useState(false);
    const [descr, setDescr] = useState("");
    const [nameError, setNameError] = useState(false);
    const [countError, setCountError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [descrError, setDescrError] = useState(false);
    const [typeLabel, setTypeLabel] = useState("Бытовая техника");
    const [imageUrl, setImageUrl] = useState(null);
    const history = useNavigate()
    const params = useParams()
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!event.target.checkValidity() || nameError || countError || priceError || descrError || params.id ? "" : !image) {
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
        if (params.id)
            data.append('_method', 'PUT')
        axios.post(process.env.REACT_APP_URL + "/api/equipments" + (params.id ? "/" + params.id : ""), data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            validateStatus: () => true
        }).then((response) => {
            history("/")
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
        setType(!isNaN(e) ? e : e.target.checked === true ? 1 : 2);
        if (!isNaN(e) ? e === 1 : e.target.checked) {
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
    };

    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
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
    const [eq, setEq] = useState([]);
    useEffect(() => {
        if (params.id)
            axios.get(process.env.REACT_APP_URL + "/api/equipments/" + params.id).then((equipment) => {
                setEq(equipment.data.data)
                setName(equipment.data.data.name)
                setType(equipment.data.data.id_type)
                handleTypeChange(equipment.data.data.id_type)
                setCount(equipment.data.data.count)
                setDescr(equipment.data.data.descr)
                setPrice(equipment.data.data.price)
            })
    }, [params.id]);
    let titleText = "Добавление оборудования"
    if (params.id) {
        titleText = "Изменение оборудования"
    }
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
                    {titleText}
                </Typography>
                <Box mt={2} className={"adminImage"} textAlign="center">
                    <img style={{padding: "0"}} src={eq.image && !imageUrl ? eq.image : imageUrl} height="100px"/>
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
                        value={name}
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
                        value={count}
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
                        defaultValue={1.00}
                        value={Number(price).toFixed(2)}
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
                        value={descr}
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
                            <Checkbox onChange={handleTypeChange} checked={type === 1} name="role"/>
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
                        {params.id ? "Обновить" : "Добавить"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AdminPanel;