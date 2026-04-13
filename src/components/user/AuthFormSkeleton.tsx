export const AuthFormSkeleton = () => (
  <div className="w-full animate-pulse space-y-6">
    <div className="space-y-2">
      <div className="h-4 w-20 bg-gray-200 rounded" />
      <div className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-28 bg-gray-200 rounded" />
      <div className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
    <div className="h-12 w-full bg-gray-200 rounded-xl" />
  </div>
);
