import { Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FETCH_URL } from "../../fetchIp";
import axios from "axios";
import { Autocomplete } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import "../../App.css";


const Home = () => {
  const [countryNames, setCountryName] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCountry();
  }, []);

  useEffect(() => {
    getStateNames();
  }, [country]);

  useEffect(() => {
    getCityNames();
  }, [state]);

  const getAllCountry = async () => {
    const data = await axios.get(`${FETCH_URL}/api/country/getCountryName`);
    setCountryName(data?.data?.data);
  };

  const getStateNames = async () => {
    if (country?.length > 0) {
      const data = await axios.get(
        `${FETCH_URL}/api/country/getStateByCountryName?countryName=${country}`
      );
      setStateNames(data?.data?.data);
    }
  };

  const getCityNames = async () => {
    if (country?.length > 0 && state?.length > 0) {
      const data = await axios.get(
        `${FETCH_URL}/api/country/getCityByCountryName?countryName=${country}&stateName=${state}`
      );

      setCityNames(data?.data?.data);
    }
  };

  const submitData = async () => {
    try {
      const body = {
        firstName,
        lastName,
        dob,
        gender,
        city,
        country,
        state,
        email,
      };

      const data = await axios.post(`${FETCH_URL}/api/user/createUser`, body);
      console.log({ data });

      if (data?.status == 201) {
        alert("Account Created");
        navigate("/");
      }
    } catch (err) {
      alert(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <Grid
        container
        item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          container
          sm={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "40px",
            paddingBottom: "40px",
            background: "antiquewhite",
          }}
        >
          <Grid item sm={5} style={{ margin: "1em" }}>
            <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              label="First name"
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item sm={5} style={{ margin: "1em" }}>
            <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              label="Last name"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item sm={5} style={{ margin: "1em" }}>
            <TextField
              id="outlined-basic"
              label="email"
              style={{ width: "100%" }}
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid
            item
            sm={5}
            style={{ margin: "1em", display: "flex", justifyContent: "center" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryNames.map((item) => {
                  return (
                    <MenuItem key={item} value={item} width={"50%"}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            sm={5}
            style={{ margin: "1em", display: "flex", justifyContent: "center" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="Country"
                onChange={(e) => setState(e.target.value)}
              >
                {stateNames.map((item, index) => {
                  return (
                    <MenuItem key={item + index} value={item} width={"50%"}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            sm={5}
            style={{ margin: "1em", display: "flex", justifyContent: "center" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Country"
                onChange={(e) => setCity(e.target.value)}
              >
                {cityNames.map((item, index) => {
                  return (
                    <MenuItem
                      key={item?.city + index}
                      value={item?.city}
                      width={"50%"}
                    >
                      {item?.city}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            sm={5}
            style={{ margin: "1em", display: "flex", justifyContent: "center" }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Grid>

          <Grid
            item
            sm={5}
            style={{ margin: "1em", display: "flex", justifyContent: "center" }}
          >
            <input
              className="dateStyle"
              type="date"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            />
          </Grid>

          <Grid
            item
            sm={5}
            style={{ margin: "1em", display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" onClick={() => submitData()}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
