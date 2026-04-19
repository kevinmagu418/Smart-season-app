import { Grid } from '@mui/material';
import { FieldCard } from './FieldCard';
import { DashboardStats as StatsType } from '@smartseason/types';

export const DashboardStats = ({ stats }: { stats: StatsType }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <FieldCard title="Total Fields" value={stats.totalFields} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FieldCard title="Active Fields" value={stats.activeCount} status="Active" as any />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FieldCard title="At Risk Fields" value={stats.atRiskCount} status="At Risk" as any />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FieldCard title="Completed" value={stats.completedCount} status="Completed" as any />
      </Grid>
    </Grid>
  );
};
