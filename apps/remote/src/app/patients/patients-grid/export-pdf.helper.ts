import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';

export class ExportPDFHelper {

  public static generatePDF(patientsData) {
    const pdfReport = new jsPDF({ format: 'a4', orientation: 'l' });

    autoTable(pdfReport, {
      theme: 'grid',
      rowPageBreak: 'avoid',
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { cellWidth: 25 },
        3: { cellWidth: 45 },
        4: { cellWidth: 30 },
        5: { cellWidth: 80 }
      },
      headStyles: {
        valign: 'middle',
        fillColor: [200, 230, 255],
        textColor: 100,
        lineColor: 220,
        lineWidth: 0.1,
        fontSize: 11,
      },
      bodyStyles: { valign: 'middle', fontSize: 11 },
      head: [
        [
          { content: ' Patient #\n Patient Name\n Room' },
          { content: ' Admint Date\n Att. Physician\n Patient Type' },
          { content: ' CDS\n Review Status\n Reimb. Type' },
          { content: ' Insurance\n Financial Class\n Total Charges' },
          { content: ' LOS/GLOS\n Trans. DRG\n DRG Type' },
          { content: ' DRG No.\n DRG Description\n DRG Weight' }
        ]
      ],
      body: this.createTableBody(patientsData),
      tableLineColor: 150
    });

    pdfReport.save(
        'patients_' + moment(Date.now()).format('YYYY_MM_DD_hh:mm:ss') + '.pdf'
    );
  }

  private static createTableBody(patientsData) {
    const body = [];
    patientsData.result.forEach((patient) => {
        const row = [];
        row.push({ content: `${patient.patientNo}\n${patient.patientName}\n${patient.room}` });
        row.push({ content: `${patient.admitDate}\n${patient.attendingPhysician}\n${patient?.patientClass === 'Out' ? 'OBS': 'IN'}` });
        row.push({ content: `${patient.cds || "-"}\n${patient.reviewStatus}\n${patient.reimbursementType}` });
        row.push({ content: `${patient.healthPlan || "-"}\n${patient.financialClass}\n${patient.totalCharges || '-'}` });
        row.push({ content: `${patient.los +"/"+ patient.geo || "-"}\n${patient.transferDrg || '-'}\n${patient.drgType || '-'}` });
        row.push({ content: `${patient.drgNo }\n${patient.diagnosis || '-'}\n${patient.drgWeight || '-'}` });
        body.push(row);
    });
    return body;
  }

}
