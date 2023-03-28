import React from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Container,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import TextInput from "../toolbox/TextInput";
const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

const UserEdit = ({ user, onSubmit, onChange, errors }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        flexGrow: 1,
        py: 8,
      }}
      autoComplete="off"
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src="../../images/avatar.jpg"
                        sx={{
                          height: 80,
                          mb: 1,
                          width: 80,
                        }}
                      />
                      <Typography gutterBottom variant="h5">
                        {user.firstName}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button fullWidth variant="text">
                      Upload picture
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <Card>
                  <CardHeader title="Profile" />
                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: 2 }}>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
                          <TextInput
                            name="firstName"
                            value={user.firstName || ""}
                            placeholder={user.firstName || ""}
                            label="First Name"
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            onChange={onChange}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextInput
                            name="lastName"
                            value={user.lastName || ""}
                            placeholder=""
                            label="last Name"
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            onChange={onChange}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextInput
                            name="email"
                            value={user.email || ""}
                            placeholder=""
                            label="Email"
                            error={!!errors.email}
                            helperText={errors.email}
                            onChange={onChange}
                          />
                        </Grid>
                       
                        
                      </Grid>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button type="submit" variant="contained">
                      Save details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};
export default UserEdit;
