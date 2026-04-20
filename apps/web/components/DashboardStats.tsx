"use client";
import { Grid } from '@mui/material';
import { Layers, LocalFlorist, ErrorOutline, CheckCircleOutline } from '@mui/icons-material';
import { FieldCard } from './FieldCard';
import { DashboardStats as StatsType, FieldStatus } from '@smartseason/types';

export const DashboardStats = ({ stats }: { stats: StatsType }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <FieldCard title="Total Fields" value={stats.totalFields} icon={Layers} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <FieldCard title="Active Fields" value={stats.activeCount} status={FieldStatus.ACTIVE} icon={LocalFlorist} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <FieldCard title="At Risk Fields" value={stats.atRiskCount} status={FieldStatus.AT_RISK} icon={ErrorOutline} />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <FieldCard title="Completed" value={stats.completedCount} status={FieldStatus.COMPLETED} icon={CheckCircleOutline} />
      </Grid>
    </Grid>
  );
};
