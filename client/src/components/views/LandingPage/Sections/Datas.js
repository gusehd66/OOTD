export const categories = [
  { _id: 1, name: "Top" },
  { _id: 2, name: "Bottom" },
  { _id: 3, name: "Shoes" },
  { _id: 4, name: "Outer" },
];

export const price = [
  { _id: 0, name: "모든 가격", array: [] },
  { _id: 1, name: "~50000", array: [0, 50000] },
  { _id: 2, name: "50000~100000", array: [50000, 100000] },
  { _id: 3, name: "100000~200000", array: [100000, 200000] },
  { _id: 4, name: "200000~", array: [100000, Number.MAX_SAFE_INTEGER] },
];
