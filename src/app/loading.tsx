import { GradientText } from '@/components/ui/GradientText';
import { profile } from '@/data/profile';

export default function Loading() {
  return (
    <div className="fixed inset-0 grid min-h-screen place-items-center bg-bg">
      <GradientText className="font-display text-h1 animate-pulse">
        {profile.brandName}
      </GradientText>
    </div>
  );
}
