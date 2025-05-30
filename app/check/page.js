
"use client"
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, MenuItem, Button, Divider } from '@mui/material';

const BookingDetails = () => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Top Summary Cards */}
      <Grid container spacing={2}>
        {[
          { label: 'Booking No:', value: '810180464', color: 'primary' },
          { label: 'Booking Date:', value: '17/06/2023', color: 'error' },
          { label: 'Payment Method:', value: 'COD', color: 'success' },
          { label: 'Payment Status:', value: 'Pending', color: 'warning' },
          { label: 'Booking Status:', value: 'Pending', color: 'warning' }
        ].map((item, idx) => (
          <Grid item xs={12} sm={6} md={2.4} key={idx}>
            <Card sx={{ borderLeft: `5px solid`, borderColor: item.color }}>
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Details Table */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Room Type</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}><Typography>EXECUTIVE SUITE ROOM</Typography></Grid>
              <Grid item xs={4} md={1}><Typography>01</Typography></Grid>
              <Grid item xs={4} md={2}><Typography>$250</Typography></Grid>
              <Grid item xs={12} md={3}>
                <Typography>Check In: 2023-06-21</Typography>
                <Typography>Check Out: 2023-06-23</Typography>
              </Grid>
              <Grid item xs={4} md={1}><Typography>2</Typography></Grid>
              <Grid item xs={12} md={2}><Typography>$500</Typography></Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}><Typography>Subtotal</Typography></Grid>
              <Grid item xs={12} md={2}><Typography>$500</Typography></Grid>
              <Grid item xs={12} md={2}><Typography>Discount</Typography></Grid>
              <Grid item xs={12} md={2}><Typography>$50</Typography></Grid>
              <Grid item xs={12} md={2}><Typography>Grand Total</Typography></Grid>
              <Grid item xs={12} md={2}><Typography>$450</Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Manage Room and Date + Payment & Booking Status */}
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Manage Room and Date</Typography>
                <TextField
                  label="CheckIn"
                  type="date"
                  defaultValue="2023-06-21"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ my: 1 }}
                />
                <TextField
                  label="CheckOut"
                  type="date"
                  defaultValue="2023-06-23"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ my: 1 }}
                />
                <TextField
                  label="Room"
                  defaultValue="01"
                  fullWidth
                  sx={{ my: 1 }}
                />
                <Button variant="contained">Update</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Payment & Booking Status</Typography>
                <TextField
                  select
                  label="Payment Status"
                  fullWidth
                  defaultValue="Pending"
                  sx={{ my: 1 }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Booking Status"
                  fullWidth
                  defaultValue="Pending"
                  sx={{ my: 1 }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
                <Button variant="contained">Update</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Customer Info */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Customer Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}><Typography>Name: User</Typography></Grid>
              <Grid item xs={12} md={4}><Typography>Email: user@gmail.com</Typography></Grid>
              <Grid item xs={12} md={4}><Typography>Phone: 01711</Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BookingDetails;
