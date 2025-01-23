'use client'
import React from 'react';
import './screen.scss';
import { useAtmContext } from '../Context';

function Screen() {
  const { selectedCard, setSelectedCard } = useAtmContext();
  const { instructions, atmHeader, userPin } = useAtmContext();

  return (
    <div className="atm__screen__container">
      <ul className="screen__buttons__list">
        {instructions.map((instruction, index) => (
          <li key={index}>
            <button onClick={instruction.action}>
              {index}
            </button>
          </li>
        ))}
      </ul>
      <article className="atm__screen">
        <section className="atm__screen__header">
          {atmHeader}
        </section>
        <section className="atm__screen__instructions">
          <ul className="atm__screen__instructions-list">
            {instructions.map((instruction, index) => (
              <li key={index}>
                {instruction.title}
              </li>
            ))}
          </ul>
        </section>
      <img src="/assets/systems.png" className="img-systems" />
      </article>
    </div>
  );
}

export default Screen;