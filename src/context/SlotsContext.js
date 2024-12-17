import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

export const SlotsContext = createContext();

export const SlotsProvider = ({ children }) => {
  const [availableNowSlots, setAvailableNowSlots] = useState([]);
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const { authToken } = useContext(AppContext);

  // Fetch Available Now Slots
  const getAvailableNowSlots = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/slots/now`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAvailableNowSlots(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching available now slots:", error);
    }
  }, [authToken]);

  // Fetch Scheduled Slots
  const getScheduledSlots = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/slots/scheduled`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setScheduledSlots(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching scheduled slots:", error);
    }
  }, [authToken]);

  // Initial fetch when authToken changes
  useEffect(() => {
    if (authToken) {
      getAvailableNowSlots();
      getScheduledSlots();
    }
  }, [authToken, getAvailableNowSlots, getScheduledSlots]);

  return (
    <SlotsContext.Provider
      value={{ availableNowSlots, scheduledSlots, getAvailableNowSlots, getScheduledSlots }}
    >
      {children}
    </SlotsContext.Provider>
  );
};