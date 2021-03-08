function countDistanceGivenTwoPoints(
  lattitude1,
  lattitude2,
  longitude1,
  longitude2
) {
  const R = 6371e3; // metres
  const φ1 = (lattitude1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lattitude2 * Math.PI) / 180;
  const Δφ = ((lattitude2 - lattitude1) * Math.PI) / 180;
  const Δλ = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d;
}

export default countDistanceGivenTwoPoints;
