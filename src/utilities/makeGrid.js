const makeGrid = () => {
  const pitches = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3", "C3", "C2", "C1"];
  const vamp = [];

  for (const pitch of pitches) {
    const row = [];
    for (let i = 0; i < 16; i++) {
      row.push({ pitch: pitch, isActive: false });
    }
    vamp.push(row);
  }

  return vamp;
};

export default makeGrid;