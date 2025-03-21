import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const initial = { 
    profile: "Frontend Developer", 
    exp: 1, 
    techs: [], 
    desc: "Front-end web development is the development of the graphical user int…" 
  };

  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" }
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://jobportal-backend-latest.onrender.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate('/employee/feed');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const { profile, exp, desc } = form;

  const handleChange = (e) => {
    // Only add the skill if it's not already in the array
    if (e.target.checked) {
      setForm({ ...form, techs: [...form.techs, e.target.value] });
    } else {
      setForm({
        ...form,
        techs: form.techs.filter(tech => tech !== e.target.value)
      });
    }
  };

  return (
    <Paper sx={{ 
      padding: "2%", 
      maxWidth: "800px", 
      margin: "0 auto",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }} elevation={3}>
      <Typography 
        sx={{ 
          margin: "3% auto", 
          fontWeight: 600,
          color: "#1976d2"
        }} 
        align="center" 
        variant="h5"
      >
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="string"
            sx={{ 
              width: "50%", 
              margin: "2% auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px"
              }
            }}
            required
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
            label="Job-profile"
            variant="outlined"
            value={profile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ 
              width: "50%", 
              margin: "2% auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px"
              }
            }}
            required
            onChange={(e) => setForm({ ...form, exp: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={exp}
          />

          <TextField
            type="string"
            sx={{ 
              width: "50%", 
              margin: "2% auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px"
              }
            }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={desc}
          />
          <Box sx={{ margin: "1% auto", width: "50%" }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
              Please mention required skills
            </Typography>
            <FormGroup>
              {skillSet.map(({ name }, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      onChange={handleChange}
                      checked={form.techs.includes(name)}
                      sx={{
                        color: "#1976d2",
                        '&.Mui-checked': {
                          color: "#1976d2",
                        },
                      }}
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
          </Box>
          <Button
            sx={{ 
              width: "50%", 
              margin: "2% auto",
              padding: "10px 0",
              borderRadius: "6px",
              textTransform: "uppercase",
              fontWeight: 600
            }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;