import { Text } from "@/components";

export const OfflineTripsWarning = () => (
  <Text.Secondary className="text-lg text-center py-5">
    Unable to load your trips,
    <br />
    it appears you are no longer connected to the internet.
  </Text.Secondary>
);
