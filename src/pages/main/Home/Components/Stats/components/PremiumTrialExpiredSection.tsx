import { Cta } from "@/components";

export function PremiumTrialExpiredSection({
  onSeePremium,
}: {
  onSeePremium: () => void;
}) {
  return (
    <div className="bg-gradient-to-r from-[#DA22FF] to-[#9733EE] p-6 rounded-lg flex flex-col gap-4">
      <p className="text-lg text-grayblue-100">
        Your 10 days of free trial have expired. To see your stats again, please
      </p>
      <Cta type="button" color="white" onClick={onSeePremium}>
        See premium
      </Cta>
    </div>
  );
}
