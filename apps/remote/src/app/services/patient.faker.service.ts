
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { GeneralComments } from '../models/general-comments.model';
import { Patient } from '../models/patient.model';

export function generatePatients(count: number): Patient[] {
  const patients: Patient[] = [];

  for (let i = 0; i < count; i++) {
    const comment:  GeneralComments  = {
      comments : faker.lorem.sentence(),
      addedBy : faker.helpers.arrayElement(['Vishal', '', 'Ankit', 'Ashit']),
      addedOn : faker.date.recent().toISOString()
    }

    // const finding: Finding = {

    // }
    const patient: Patient = {
      id: uuidv4(),
      // name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      roomId: faker.random.alphaNumeric(4).toUpperCase(),
      admissioinDate: faker.date.recent().toISOString(),
      healthPlanName: faker.helpers.arrayElement(['Aetna', 'Blue Cross', 'United Healthcare', 'Cigna']),
      cds: faker.helpers.arrayElement(['Vishal', '', 'Ankit', 'Ashit']),
      queryStatus: faker.helpers.arrayElement(['No findings', 'Reviewed', 'Revised', 'Review Later']),
      reimbursementType: faker.helpers.arrayElement(['Medicare', 'Medicaid', 'Commercial']),
      generalComment: comment,
      // queryDate: faker.date.recent().toISOString(),
      facilityId: faker.helpers.arrayElement(['Appolo', 'Z-healthcare', 'Forties', 'Urgent Care D']),
      statusClass: faker.random.word(),
      createdBy: faker.helpers.arrayElement(['Vishal', '', 'Ankit', 'Ashit']),
      createdTime: faker.date.recent().toISOString(),
      accountNo: +faker.random.numeric(8),
      isActive: faker.datatype.boolean(),
      age: +faker.random.numeric(2),
      sex: faker.helpers.arrayElement(['Male', 'Female']),
      los: +faker.datatype.number({ min: 0, max: 10 }).toFixed(2),
      financialClass: '',
      mrn: '',
      dischargeDate: faker.date.future().toISOString(),
      concurrent_postDC: '',
      secondaryInsurance: '',
      contracted: faker.datatype.boolean(),
      patientClass: '',
      pdx: '',
      lastUpdatedBy: faker.date.recent().toISOString(),
      lastUpdatedTime: faker.date.recent().getHours() +':' + faker.date.recent().getMinutes() + 'hr'
    };

    patients.push(patient);
  }

  return patients;
}
