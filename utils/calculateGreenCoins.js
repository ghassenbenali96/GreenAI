// utils/calculateGreenCoins.js
export function calculateGreenCoins(
  numberOfTrees,
  averageDiameter,
  averageHeight
) {
  const diameter = parseFloat(averageDiameter);
  const height = parseFloat(averageHeight);
  const number = parseInt(numberOfTrees);

  let GW_above;
  if (diameter < 28) {
    GW_above = 0.25 * diameter * diameter * height;
  } else {
    GW_above = 0.15 * diameter * diameter * height;
  }

  const GW = GW_above * 1.2;
  const DW = GW * 0.725;
  const CS = DW * 0.5;
  const CO2 = 3.67 * CS;
  const CO2_total = number * CO2;

  // Convert kg of CO2 to GreenCoins (100,000 kg CO2 = 1 GRC)
  return Math.round((CO2_total / 100000) * 100) / 100;
}
