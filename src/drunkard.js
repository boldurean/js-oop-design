const Drunkard = class {
  run(cards1, cards2) {

    const firstPlayer = [...cards1];
    const secondPlayer = [...cards2];

    const getRoundWiner = (p1, p2, round = 0) => {

      if (p1.length === 0 && p2.length === 0) {
        return 'Botva!'
      }
      if (p1.length === 0) {
        return `Second player. Round: ${round}`;
      }
      if (p2.length === 0) {
        return `First player. Round: ${round}`;
      }
      if (round === 100) {
        return 'Botva!';
      }

      const p1Card = p1.pop();
      const p2Card = p2.pop();

      if (p1Card > p2Card) {
        p1.unshift(p1Card, p2Card);
      }
      if (p2Card > p1Card) {
        p2.unshift(p2Card, p1Card);
      }
      return getRoundWiner(p1, p2, round += 1);
    };
    return getRoundWiner(firstPlayer, secondPlayer);
  }
}

module.exports = Drunkard;

