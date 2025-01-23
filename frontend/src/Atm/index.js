'use client'
import React from 'react';
import './atm.scss';
import { useAtmContext } from '../Context';
import Screen from '../Screen';

function ATM() {
  const { selectedCard, setSelectedCard } = useAtmContext();
  const cards = [
    {
      name: 'Star',
    },
    {
      name: 'Pulse',
    },
    {
      name: 'Maestro',
    },
    {
      name: 'MasterCard',
    },
    {
      name: 'Plus',
    },
    {
      name: 'Visa',
    }
  ];
  
  function changeCreditCard(card) {
    setSelectedCard(card.name);
  }

  return (
    <div className="atm">
      <header className="atm-header">
        <img src="/assets/atm_sign.png" />
        <img src="/assets/graffiti.png" className="graffiti" />
      </header>
      <div className="atm-body">
        <section className="credit-cards">
          <img src="/assets/creditcard_sprite.png" />
          <ul className="credit-cards__list">
            {cards.map((card, index) => (
              <li key={index} className={selectedCard === card.name ? '--active' : ''}>
                <button className={card.name}
                        onClick={() => changeCreditCard(card)}>
                  {card.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <Screen />
        <img src="/assets/sticker_graf.png" className="sticker" />
      </div>
    </div>
  );
}

export default ATM;