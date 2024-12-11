/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import TradeForm from "./components/TradeForm";
import TradeList from "./components/TradeList";
import BuyMeACoffee from "./components/BuyMeACoffee";

function App() {
  const [trades, setTrades] = useState(() => {
    const savedTrades = localStorage.getItem("trades");
    return savedTrades ? JSON.parse(savedTrades) : {};
  });

  const handleAddTrade = (trade) => {   // fonksiyona gelen trade değeri bir objedir
    const { coin, date, amount } = trade; //? destructing işlemi coin = trade.coin   date=trade.date    amount=trade.amount yazmaya eşittir
    setTrades((prevTrades) => {   //! Bunu callback olarak kullandık mevcut state yani trades callback olarak prevTrades'e geçti bunu veri güvenliği için kullanıyoruz yani direkt trades üzerinden işlem yapmıyoruz
      const updatedTrades = { ...prevTrades }; // trades state'inin kopyası
      if (!updatedTrades[date]) {
        // Eğer bu tarih daha önce yoksa, ekle
        updatedTrades[date] = {};
      }
      if (updatedTrades[date][coin]) {
        // Eğer coin daha önce eklenmişse, miktarı güncelle
        updatedTrades[date][coin] += amount;
        console.log(typeof(amount))
      } else {
        // Eğer coin eklenmemişse, yeni bir coin ekle
        updatedTrades[date][coin] = amount;
      }
      return updatedTrades;
    });
  };

  const handleDeleteTrade = (date, coin) => {
    setTrades((prevTrades) => {  // yukarıdaki işlemin birebir aynısı
      const updatedTrades = { ...prevTrades };
      if (updatedTrades[date] && updatedTrades[date][coin] !== undefined) {
        delete updatedTrades[date][coin]; // Coin siliniyor
        if (Object.keys(updatedTrades[date]).length === 0) {
          delete updatedTrades[date]; // Eğer gün boş kaldıysa günü de siliyoz
        }
      }
      return updatedTrades;
    });
  };

  useEffect(() => {
    localStorage.setItem("trades", JSON.stringify(trades));
  }, [trades]);

   console.log(trades)

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", margin: "20px 0" }}>
        <Typography variant="h4" gutterBottom>
          Trade Tracker
        </Typography>
        <Typography variant="subtitle1">
          Günlük kar/zararlarınızı takip edin
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Günlük Kar/Zarar Girişi
        </Typography>
        <TradeForm onAddTrade={handleAddTrade} />
      </Box>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Günlük İşlem Listesi
        </Typography>
        <TradeList trades={trades} onDeleteTrade={handleDeleteTrade} />
      </Box>

      <Box
        sx={{
          position: "fixed", // Sayfada sabit bir konuma yerleştir
          bottom: "20px", // Sayfanın altından 20px yukarıda
          right: "20px", // Sayfanın sağından 20px içeride
          zIndex: 1, // Butonu diğer elemanların üzerinde göster
        }}
      >
        <BuyMeACoffee />
      </Box>
    </Container>
  );
}

export default App;
