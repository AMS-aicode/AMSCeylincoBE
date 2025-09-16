'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DropdownConfigs', [
      {
        designation: 'LIFE_INSURANCE_ADVISOR,TRAINEE_INSURANCE_ADVISOR,SENIOR_INSURANCE_ADVISOR',
        title: 'Mr.,Mrs.,Ms.',
        nationality: 'SRI_LANKAN_SINHALESE,SRI_LANKAN_TAMIL',
        language: 'Sinhala,Tamil,English',
        civilStatus: 'Single,Married',
        addressLine2: 'Yasisiripura,Kandewatta,Colombo Fort,Galle Face,Matara Town,Jaffna Town,Batticaloa Town,Trincomalee Town',
        cityTown: 'Anuradhapura,Kandy,Colombo,Galle,Matara,Jaffna,Batticaloa,Trincomalee',
        province: 'North Central,Central,Western,Southern,Northern,Eastern,North Western,Uva,Sabaragamuwa',
        district: 'Colombo,Gampaha,Kandy,Matara,Jaffna,Batticaloa,Trincomalee',
        electorate: 'Colombo East,Colombo West,Kandy North,Kandy South',
        gramaNiladari: 'GN1,GN2,GN3,GN4',
        dSecretariat: 'DS1,DS2,DS3,DS4',
        postalCode: '10000,20000,30000,40000,50000',
        bank: 'Sampath Bank,Commercial Bank,BOC',
        bankBranch: 'Colombo,Kandy,Anuradhapura,Negombo,Ratnapura,Kurunegala,Matara,Galle,Jaffna',
        accountType: 'Savings,Current',
        groupDepartment: 'Sales,HR,Finance,IT',
        subDepartmentCluster: 'ClusterA,ClusterB,ClusterC',
        branch: 'Colombo Branch,Kandy Branch,Galle Branch',
        unit: 'Unit1,Unit2,Unit3',
        supervisorName: 'John Doe,Jane Smith,Michael Lee',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DropdownConfigs', null, {});
  }
};
