import { Skeleton } from '@mui/material';

export const LoadingSkeleton = ({ count = 3, type = "card" }: { count?: number, type?: "card" | "table" }) => {
  return (
    <div className={`grid gap-4 ${type === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="rectangular" width="100%" height={type === 'card' ? 64 : 48} className="mt-4" />
        </div>
      ))}
    </div>
  );
};
