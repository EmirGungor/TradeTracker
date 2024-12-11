/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const TradeForm = ({ onAddTrade }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [coin, setCoin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // form submit edildiğinde sayfa yeniden yüklenmesin
    if (amount && date && coin) {  // değer kontrolü
      onAddTrade({ coin, date, amount: parseFloat(amount) }); // Coin, tarih ve miktarı gönderiyoruz
      setAmount('');
    //   setDate(''); genellikle aynı güne art arda işlem verildiği için tarih kısmının aynı kalmasını uygun gördüm
    //   setCoin('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        label="Coin Adı"
        variant="outlined"
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
        required
      />
      <TextField
        label="Kar/Zarar Miktarı"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        required
      />
      <TextField
        label="Tarih"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Ekle
      </Button>
    </Box>
  );
};

export default TradeForm;
