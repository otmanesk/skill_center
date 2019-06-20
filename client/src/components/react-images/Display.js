import React from 'react';
import Swiper from 'react-id-swiper';
import Pics from './Pics';

const initImg = require('assets/img/faces/initiative.PNG');
const cooptImg = require('assets/img/faces/cooptation.PNG');
const triImg = require('assets/img/faces/triathlon.PNG');
const ramadanImg = require('assets/img/faces/ramadan.PNG');

const { Pagination, Navigation } = require('swiper/dist/js/swiper.esm');

const Display = () => {
  const params = {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 10,
      shadowScale: 0.94
    },
    modules: [Pagination, Navigation],
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 20
  };

  return (
    <Swiper {...params}>
      <Pics src={initImg} />
      <Pics src={triImg} />
      <Pics src={cooptImg} />
      <Pics src={ramadanImg} />
    </Swiper>
  );
};

export default Display;
