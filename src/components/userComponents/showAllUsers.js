import { Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FETCH_URL } from "../../fetchIp";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CreateUser = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const data = await axios.get(
        `${FETCH_URL}/api/user/getUsers?page=1&limit=100`
      );
      console.log({ data });
      setUserData(data?.data?.data);
    } catch (err) {
      console.log("Error is ", err);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "aqua", textAlign: "center" }}>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email&nbsp;</TableCell>
              <TableCell align="right">Country&nbsp;</TableCell>
              <TableCell align="right">State&nbsp;</TableCell>
              <TableCell align="right">City&nbsp;</TableCell>
              <TableCell align="right">Age&nbsp;</TableCell>
              <TableCell align="right">DOB&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((item) => (
              <TableRow
                key={item.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item?.firstName}
                </TableCell>
                <TableCell align="right">{item?.lastName}</TableCell>
                <TableCell align="right">{item?.email}</TableCell>
                <TableCell align="right">{item?.country}</TableCell>
                <TableCell align="right">{item?.state}</TableCell>
                <TableCell align="right">{item?.city}</TableCell>
                <TableCell align="right">{item?.age}</TableCell>
                <TableCell align="right">{item?.dob}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CreateUser;
