export const numericKeyboard = {
  default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
};

export const defaultKeyboard = {
  default: [
    // "q w e r t y u i o p {bksp}",
    // "a s d f g h j k l ` - @",
    // "z x c v b n m , . ?",
    // "{shift} {space} {alt}",
    "1 2 3 4 5 6 7 8 9 0",
    "Q W E R T Y U I O P {bksp}",
    "A S D F G H J K L",
    "Z X C V B N M",
    "{space}",
  ],
  shift: [
    "Q W E R T Y U I O P {bksp}",
    "A S D F G H J K L ` - @",
    "Z X C V B N M , . ?",
    "{space}",
  ],
  alt: [
    "1 2 3 4 5 6 7 8 9 0 {bksp}",
    "% / |  : ; ( ) - $ + @",
    "{ } “ ! [ ] * & ^ #",
    "{space}",
  ],
};

export const displayKeyboard = {

  "{bksp}": `<svg stroke="#C82E2E" fill="#C82E2E" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" height="45px" width="45px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" clip-rule="evenodd"></path></svg>`,
  "{enter}": `<svg stroke="#C82E2E" fill="#C82E2E" stroke-width="0" viewBox="0 0 1024 1024" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"></path></svg>`,
  "{space}": "space",
  "{alt}": "123",
  "{tab}": `<svg stroke="#C82E2E" fill="#C82E2E" stroke-width="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.59 7.41 15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z"></path></svg>`,
  "{lock}": `<svg stroke="#C82E2E" fill="#C82E2E" stroke-width="0" viewBox="0 0 16 16" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM14.346 8.5 8 1.731 1.654 8.5H4.5a1 1 0 0 1 1 1v1h5v-1a1 1 0 0 1 1-1h2.846zm-9.846 5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1zm6 0h-5v1h5v-1z"></path></svg>`,
  "{shift}": `<svg stroke="#C82E2E" fill="#C82E2E" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.5l-7.5 7.5h4.5v8h6v-8h4.5z"></path></svg>`,
};
