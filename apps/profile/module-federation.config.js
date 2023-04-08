module.exports = {
  name: 'profile',
  exposes: {
    './ProfileAdminModule': 'apps/profile/src/app/admin/admin.module',
    './DetailsRoutingModule': 'apps/profile/src/app/admin/details/details-routing.module.ts'
  },
};
