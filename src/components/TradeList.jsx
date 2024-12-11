/* eslint-disable react/prop-types */
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TradeList = ({ trades, onDeleteTrade }) => {
  const dates = Object.keys(trades); // Tüm tarihleri alıyoruz bu tarihler tradesdeki key değeridir

  return (
    <List>
      {dates.map((date, index) => {
        const coins = trades[date];
        const dailyTotal = Object.values(coins).reduce(
          (sum, amount) => sum + amount,
          0
        ); // günlük toplamı hesapla

        return (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={`Tarih: ${date}`} />
            </ListItem>
            {Object.entries(coins).map(([coin, amount], coinIndex) => (
              <ListItem key={coinIndex} sx={{ paddingLeft: 4 }}>
                <ListItemText
                  primary={
                    <span
                      style={{
                        color: amount > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {`${coin}: ${amount > 0 ? "+" : ""}${amount}$`}
                    </span>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteTrade(date, coin)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
            <ListItem sx={{ paddingLeft: 4 }}>
              <ListItemText
                primary={
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Toplam Kar/Zarar:{" "}
                    <span style={{ color: dailyTotal > 0 ? "green" : "red" }}>
                      {dailyTotal > 0
                        ? `+${Number(dailyTotal)}`
                        : `${Number(dailyTotal)}`}
                      $
                    </span>
                  </span>
                }
              />
            </ListItem>

            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default TradeList;
