const makeGrid = () => {
  const notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3", "C3", "C2", "C1"];
  const rows = [];

  for (const note of notes) {
    const row = [];
    for (let i = 0; i < 16; i++) {
      row.push({ note: note, isActive: false });
    }
    rows.push(row);
  }

  return rows;
};

export default makeGrid;