import React, { useEffect } from 'react';
import { socketValueStore } from '../../store';
import { saveEveryCash } from '../../hook/hook';
import { Port } from '../../config';

export const CashHook = () => {
  const { addValue } = socketValueStore();
  const { mutate, isPending, isError } = saveEveryCash();

  useEffect(() => {
    const socket = new WebSocket(Port);

    socket.onopen = () => {
      const openCommand = JSON.stringify({
        device: "BILL_ACCEPTOR",
        method: "OPEN",
      });
      socket.send(openCommand);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);

        if (message.data === "REJECTED") {
          alert("Transaction rejected. The amount will not be added.");
        } else if (message.method === "READ" && message.data) {
          const valueObject = { id: Date.now(), amount: message.data };
          console.log(message.data, "data");
          mutate({ amount: message.data });
          addValue(valueObject);
        } else if (message.method === "TIMEOUT") {
          socket.onopen = () => {
            const openCommand = JSON.stringify({
              device: "BILL_ACCEPTOR",
              method: "OPEN",
            });
            socket.send(openCommand);
          };
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }

      const stackCommand = JSON.stringify({
        device: "BILL_ACCEPTOR",
        method: "STACK",
      });
      socket.send(stackCommand);
    };

    return () => {
      socket.close();
    };
  }, [addValue, mutate]); // addValue va mutate ga bog'liq bo'lishi kerak

  return null; // UI bo'lmagan holda WebSocket ishlashini ta'minlash
};
