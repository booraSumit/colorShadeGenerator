function generateRandomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);
  return { h, s, l };
}

function generateUniqueId(color) {
  if (!color) return;
  const { h, s, l } = color;
  return `${+new Date()}${h}${s}${l}`;
}

function getColor() {
  const color = [];
  for (let i = 0; i < 4; i++) {
    const colorCode = generateRandomColor();
    color.push({
      colorCode,
      isLocked: false,
      id: generateUniqueId(colorCode),
    });
  }

  return color;
}

function generateShades(color) {
  const { h, s } = color.colorCode;
  let shades = [];
  for (let i = 1; i <= 100; i += 4) {
    shades.push(
      {
        h: h,
        s: i === 97 ? i + Math.floor(Math.random() * 3) : i,
        l: i === 97 ? i + Math.floor(Math.random() * 3) : i,
      },
      {
        h: h,
        s:
          i * 1.5 > 100
            ? i + Math.floor(Math.random() * 3)
            : Math.ceil(i * 1.5),
        l: i === 97 ? i + Math.floor(Math.random() * 3) : i,
      },
      {
        h: h,
        s: i === 97 ? i + Math.floor(Math.random() * 3) : i,
        l:
          i * 1.5 > 100
            ? i + Math.floor(Math.random() * 3)
            : Math.ceil(i * 1.5),
      },
      {
        h: h,
        s: s,
        l: i === 97 ? i + Math.floor(Math.random() * 3) : i,
      }
    );
  }
  shades = Array.from(new Set(shades.map(JSON.stringify))).map(JSON.parse); // remove duplicates
  return shades;
}

export default {
  generateRandomColor,
  generateUniqueId,
  getColor,
  generateShades,
};
