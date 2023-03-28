import React from "react";
import { Paper, Box, Button } from "@mui/material";
import TextInput from "../toolbox/TextInput";

import FileInput from "../toolbox/FileInput";

import TextAreaInput from "../toolbox/TextAreaInput";

const AuthorEdit = ({ author, onSubmit, onChange, errors }) => {
  // let newauthorCountryOfBirth = author?.authorInfo?.authorDateOfBirth
  //   .split(/(\d)/)
  //   .slice(-1)
  //   .join("");
  // let newauthorCountryOfDeath = author?.authorInfo?.authorDateOfDeath
  //   .split(/(\d)/)
  //   .slice(-1)
  //   .join("");

  // let newauthorDateOfBirth = author?.authorInfo?.authorDateOfBirth
  //   .split(/(\d)/)
  //   .slice(1, -1)
  //   .join("")
  //   .split(" ")
  //   .join(" ");
  // let newauthorDateOfDeath = author?.authorInfo?.authorDateOfDeath
  //   .split(/(\d)/)
  //   .slice(1, -1)
  //   .join("")
  //   .split(" ")
  //   .join(" ");

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>{author.id ? "EDIT" : "ADD"}</h2>

      <TextInput
        name="authorName"
        value={author.authorName || ""}
        placeholder={author.authorName || ""}
        label="Author Name"
        error={!!errors.authorName}
        helperText={errors.authorName}
        onChange={onChange}
      />
      <TextInput
        name="authorDateOfBirth"
        value={author.authorInfo?.authorDateOfBirth || ""}
        placeholder="Please write author birth year and country!!"
        label="Author Date of Birth"
        error={!!errors.authorDateOfBirth}
        helperText={errors.authorDateOfBirth}
        onChange={onChange}
      />
      <TextInput
        name="authorDateOfDeath"
        value={author.authorInfo?.authorDateOfDeath || ""}
        placeholder="Please write author death year and country!!"
        label="Author Date of Death"
        error={!!errors.authorDateOfDeath}
        helperText={errors.authorDateOfDeath}
        onChange={onChange}
      />

      <TextAreaInput
        name="authorLife"
        value={author.authorInfo?.authorLife || ""}
        label="Author Life"
        onChange={onChange}
      />

      <FileInput name="authorImage" value={""} />

      <Box sx={{ "& button": { m: 1 }, size: "large" }}>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default AuthorEdit;
