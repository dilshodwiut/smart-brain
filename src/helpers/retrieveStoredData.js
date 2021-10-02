import calculateRemainingTime from "./calculateRemainingTime";

export default function retrieveStoredData() {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expiresAt");
  const storedUid = localStorage.getItem("uid");
  const storedCredentials = JSON.parse(localStorage.getItem("credentials"));

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("uid");
    localStorage.removeItem("credentials");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    uid: storedUid,
    credentials: storedCredentials,
  };
}
