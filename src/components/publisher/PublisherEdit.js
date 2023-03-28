import React from "react";
import { Paper, Box, Button } from "@mui/material";
import TextInput from "../toolbox/TextInput";
import FileInput from "../toolbox/FileInput";
import TextAreaInput from "../toolbox/TextAreaInput";

const PublisherEdit = ({ publisher, onSubmit, onChange, errors }) => {
  return (
 
      <Box
        onSubmit={onSubmit}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        autoComplete="off"
      >
        <h2>{publisher.id ? "EDIT" : "ADD"}</h2>
        <TextInput
          name="publisherName"
          value={publisher.publisherName || ""}
          placeholder={publisher.publisherName}
          label="Publisher Name"
          error={!!errors.publisherName}
          helperText={errors.publisherName}
          onChange={onChange}
        />
        <TextInput
          name="publisherPhone"
          value={publisher.publisherPhone || ""}
          placeholder={publisher.publisherPhone}
          label="Publisher Phone"
          error={!!errors.publisherPhone}
          helperText={errors.publisherPhone}
          onChange={onChange}
        />
        <TextInput
          name="publisherEmail"
          value={publisher.publisherEmail || ""}
          placeholder={publisher.publisherEmail}
          label="Publisher Email"
          error={!!errors.publisherEmail}
          helperText={errors.publisherEmail}
          onChange={onChange}
        />
        <TextInput
          name="publisherWebsite"
          value={publisher.publisherWebsite || ""}
          placeholder={publisher.publisherWebsite}
          label="Publisher Website"
          error={!!errors.publisherWebsite}
          helperText={errors.publisherWebsite}
          onChange={onChange}
        />
        <TextAreaInput
          name="publisherInfo"
          value={publisher.publisherInfo || ""}
          placeholder={publisher.publisherInfo}
          label="Publisher Info"
          onChange={onChange}
        />

        <FileInput
          name="publisherLogo"
          value=""
          label="Select Logo"
          onChange={onChange}
        />

        <Box sx={{ "& button": { m: 1 }, size: "large" }}>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </Box>
    
  );
};
export default PublisherEdit;
