import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { Patient } from '../models/patient.model';

export function generatePatients(count: number): Patient[] {
  const patients: Patient[] = [];

  for (let i = 0; i < count; i++) {
    const patient: Patient = {
      id: uuidv4(),
      name: faker.name.fullName(),
      room: faker.random.alphaNumeric(4).toUpperCase(),
      admitDate: faker.date.recent().toISOString(),
      healthPlan: faker.helpers.arrayElement(['Aetna', 'Blue Cross', 'United Healthcare', 'Cigna']),
      cds: faker.helpers.arrayElement(['Vishal', '', 'Ankit', 'Ashit']),
      queryStatus: faker.helpers.arrayElement(['Open', 'Closed']),
      reimbursementType: faker.helpers.arrayElement(['Medicare', 'Medicaid', 'Commercial']),
      comments: faker.lorem.sentence(),
      queryDate: faker.date.recent().toISOString(),
      facility: faker.helpers.arrayElement(['Appolo', 'Z-healthcare', 'Forties', 'Urgent Care D']),
      statusClass: faker.random.word(),
      statusClass2: faker.random.word()

    };

    patients.push(patient);
  }

  return patients;
}
