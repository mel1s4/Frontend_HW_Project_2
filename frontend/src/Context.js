'use client'

import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [selectedCard, setSelectedCardVariable] = useState('Star');
  const [atmHeader, setAtmHeader] = useState('Welcome to ATM');  
  const [database, setDatabase] = useState({});

  function setSelectedCard(card) {
    const oldPin = window.localStorage.getItem('user');
    if (!oldPin){ 
      window.localStorage.setItem('card', card);
      setSelectedCardVariable(card);
    }
  }

  function setPin(pin) {
    const oldPin = window.localStorage.getItem('user');
    if (oldPin) {
      if (oldPin.length >= 4) {
        return;
      }
      window.localStorage.setItem('user', oldPin + pin);
    } else {
      window.localStorage.setItem('user', pin);
    }
    setAtmHeader("Enter Pin: " + window.localStorage.getItem('user'));
  }

  function resetPin() {
    window.localStorage.removeItem('user');
  }

  function exit() {
    resetPin();
    setAtmHeader("Welcome to ATM");
    setInstructions(homeInstructions);
  }

  const homeInstructions = [
    {
      title: "",
      action: () => {}
    },
    {
      title: "",
      action: () => {}
    },
    {
      title: "",
      action: () => {}
    },
    {
      title: "",
      action: () => {}
    },
    {
      title: "",
      action: () => {}
    },
    {
      title: "",
      action: () => {}
    },
    {
      title: "",
      action: () => {}
    },
    {
      title: "Enter Pin",
      action: () => {
        enterPin();
      }
    },
  ];
  const [instructions, setInstructions] = React.useState(homeInstructions);
  function enterPin() {
    setAtmHeader("Enter Pin");
    setInstructions([
      {
        title: "0",
        action: () => {
          setPin(0)
        }
      },
      {
        title: "1",
        action: () => {
          setPin(1)
        }
      },
      {
        title: "2",
        action: () => {
          setPin(2)
        }
      },
      {
        title: "3",
        action: () => {
          setPin(3)
        }
      },
      {
        title: "4",
        action: () => {
          setPin(4)
        }
      },
      {
        title: "5",
        action: () => {
          setPin(5)
        }
      },
      {
        title: "Cancel",
        action: () => {
          exit();
        }
      },
      {
        title: "Accept",
        action: () => {
          goToUserActionsMenu();
        }
      }
  ]);
  }

  useEffect(() => {
    console.log(window.localStorage.getItem('database'));
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('card');
  }, []);

  function goToUserActionsMenu() {
    const user = window.localStorage.getItem('user').toString();
    setAtmHeader(`Hello ${user}! Please make a choice...`);
    setInstructions([
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "Exit",
        action: () => {
          exit();
        }
      },
      {
        title: "Withdraw",
        action: () => {
          withdraw();
        }
      },
      {
        title: "Balance",
        action: () => {
          checkBalance();
        }
      },
      {
        title: "Deposit",
        action: () => {
          deposit();
        }
      },
      {
        title: "Re Enter Pin",
        action: () => {
          enterPin();
        }
      },
    ]);
  }

  function withdraw() {
    setAtmHeader("How much do you wish to withdraw?");
    setInstructions([
      {
        title: "100",
        action: () => {
          withdrawAmount(100);
        }
      },
      {
        title: "200",
        action: () => {
          withdrawAmount(200);
        }
      },
      {
        title: "500",
        action: () => {
          withdrawAmount(500);
        }
      },
      {
        title: "1000",
        action: () => {
          withdrawAmount(1000);
        }
      },
      {
        title: "2000",
        action: () => {
          withdrawAmount(2000);
        }
      },
      {
        title: "5000",
        action: () => {
          withdrawAmount(5000);
        }
      },
      {
        title: "Exit",
        action: () => {
          exit();
        }
      },
      {
        title: "Back",
        action: () => {
          goToUserActionsMenu();
        }
      },
     
    ]);
  }

  function withdrawAmount(amount) {
    const user = window.localStorage.getItem('user').toString();
    let card = window.localStorage.getItem('card');
    if (!card) {
      card = "Star";
    }
    const nDatabase = window.localStorage.getItem('database') ? JSON.parse(window.localStorage.getItem('database')) : {};
    if (nDatabase[card] && nDatabase[card][user]) {
      let balance = nDatabase[card][user];
      if (balance < amount) {
        setAtmHeader("Insufficient Funds");
      } else {
        balance -= amount;
        nDatabase[card][user] = balance;
        window.localStorage.setItem('database', JSON.stringify(nDatabase));
        setDatabase(nDatabase);
        setAtmHeader(`You have withdrawn $${amount}`);
      }
    } else {
      console.log({user, card, nDatabase});

      console.log('inexistent user');
      setAtmHeader("Insufficient Funds");
    }
        
    setInstructions([
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "Exit",
        action: () => {
          exit();
        }
      },
      {
        title: "Back",
        action: () => {
          goToUserActionsMenu();
        }
      },
    ]);
  }

  function checkBalance() {
    let balance = 0;
    const user = window.localStorage.getItem('user').toString();
    let card = window.localStorage.getItem('card');
    if (!card) {
      card = "Star";
    }
    const nDatabase = window.localStorage.getItem('database') ? JSON.parse(window.localStorage.getItem('database')) : {};
    if (nDatabase[card] && nDatabase[card][user]) {
      balance = nDatabase[card][user];
    }
    setAtmHeader("Your Current Balance");
    setInstructions([
      {
        title: "Total:",
        action: () => {}
      },
      {
        title: `$${balance}`,
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "Exit",
        action: () => {
          exit();
        }
      },
      {
        title: "Back",
        action: () => {
          goToUserActionsMenu();
        }
      },
    ]);
  }

  function deposit() {
    setAtmHeader("Deposit");
    setInstructions([
      {
        title: "100",
        action: () => {
          depositAmmount(100);
        }
      },
      {
        title: "200",
        action: () => {
          depositAmmount(200);
        }
      },
      {
        title: "500",
        action: () => {
          depositAmmount(500);
        }
      },
      {
        title: "1000",
        action: () => {
          depositAmmount(1000);
        }
      },
      {
        title: "2000",
        action: () => {
          depositAmmount(2000);
        }
      },
      {
        title: "5000",
        action: () => {
          depositAmmount(5000);
        }
      },
      {
        title: "Exit",
        action: () => {
          exit();
        }
      },
      {
        title: "Back",
        action: () => {
          goToUserActionsMenu();
        }
      },
    ]);
  }

  function depositAmmount(amount) {

    const user = window.localStorage.getItem('user').toString();
    let card = window.localStorage.getItem('card');
    if (!card) {
      card = "Star";
    }
    const nDatabase = window.localStorage.getItem('database') ? JSON.parse(window.localStorage.getItem('database')) : {};
    if (!nDatabase[card]) {
      nDatabase[card] = {};
    }
    if (!nDatabase[card][user]) {
      nDatabase[card][user] = amount;
    } else {
      const userBalance = nDatabase[card][user] + amount;
      nDatabase[card][user] = userBalance;
    }
    window.localStorage.setItem('database', JSON.stringify(nDatabase));
    setDatabase(nDatabase);

    setAtmHeader(`You have Deposited $${amount}`);
    setInstructions([
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "",
        action: () => {}
      },
      {
        title: "Exit",
        action: () => {
          exit();
        }
      },
      {
        title: "Back",
        action: () => {
          goToUserActionsMenu();
        }
      },
    ]);
  }

  return (
    <GlobalContext.Provider value={{ 
      selectedCard, 
      setSelectedCard,
      instructions,
      setInstructions,
      atmHeader,
     }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useAtmContext = () => React.useContext(GlobalContext);