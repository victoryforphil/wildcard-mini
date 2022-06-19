

export interface Card {
  value: number;
  color: string;
  is_wild: boolean;
  is_reverse: boolean;
  is_skip: boolean;
  is_draw_two: boolean;
  is_draw_four: boolean;
}

export const genDeck = ():
    Card[] => {
      let deck: Card[] = [];

      for (let i = 0; i < 10; i++) {
        deck.push({
          color: 'red',
          value: i + 1,
          is_reverse: false,
          is_skip: false,
          is_wild: false,
          is_draw_two: false,
          is_draw_four: false
        });

        deck.push({
          color: 'green',
          value: i + 1,
          is_reverse: false,
          is_skip: false,
          is_wild: false,
          is_draw_two: false,
          is_draw_four: false
        });

        deck.push({
          color: 'blue',
          value: i + 1,
          is_reverse: false,
          is_skip: false,
          is_wild: false,
          is_draw_two: false,
          is_draw_four: false
        });

        deck.push({
          color: 'yellow',
          value: i + 1,
          is_reverse: false,
          is_skip: false,
          is_wild: false,
          is_draw_two: false,
          is_draw_four: false
        });
      }

      deck = deck.concat(
          ['red', 'green', 'blue', 'yellow'].map(color => ({
                                                   color,
                                                   value: 0,
                                                   is_reverse: true,
                                                   is_skip: false,
                                                   is_wild: false,
                                                   is_draw_two: false,
                                                   is_draw_four: false
                                                 })));
      deck =

          deck.concat(
              ['red', 'green', 'blue', 'yellow'].map(color => ({
                                                       color,
                                                       value: 0,
                                                       is_reverse: false,
                                                       is_skip: true,
                                                       is_wild: false,
                                                       is_draw_two: false,
                                                       is_draw_four: false
                                                     })));
      deck = deck.concat(
          ['red', 'green', 'blue', 'yellow'].map(color => ({
                                                   color,
                                                   value: 0,
                                                   is_reverse: false,
                                                   is_skip: false,
                                                   is_wild: true,
                                                   is_draw_two: false,
                                                   is_draw_four: false
                                                 })));

      deck = deck.concat(
          ['red', 'green', 'blue', 'yellow'].map(color => ({
                                                   color,
                                                   value: 0,
                                                   is_reverse: false,
                                                   is_skip: false,
                                                   is_wild: false,
                                                   is_draw_two: true,
                                                   is_draw_four: false
                                                 })));
      deck = deck.concat(
          ['red', 'green', 'blue', 'yellow'].map(color => ({
                                                   color,
                                                   value: 0,
                                                   is_reverse: false,
                                                   is_skip: false,
                                                   is_wild: false,
                                                   is_draw_two: false,
                                                   is_draw_four: true
                                                 })));

      return deck;
    }

const shuffle = (deck: Card[]):
    Card[] => {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
    }

const drawRandom = (deck: Card[]): Card => {
  return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
}
