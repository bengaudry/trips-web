export function setUserReachedMaxKms(reached?: boolean) {
  if (reached) {
    localStorage.setItem("max_kms_reached", "true");
    return;
  }
  localStorage.removeItem("max_kms_reached");
}

export function hasUserReachedMaxKms(): boolean {
  const item = localStorage.getItem("max_kms_reached");
  if (item && JSON.parse(item) === "true") return true;
  return false;
}
