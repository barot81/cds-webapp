import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';

export class ExportPDFHelper {

  public static generatePDF(patientsData, exportOption) {
    const pdfReport = new jsPDF({ format: 'a4', orientation: 'l' });
    if(exportOption === 'NoComments')
      this.addTableContent(pdfReport, patientsData);
    else
      this.addTableContentWithComments(pdfReport, patientsData);
    savePDF(pdfReport);
  }

  private static addTableContent(pdfReport: jsPDF, patientsData: any) {
    autoTable(pdfReport, {
      theme: 'grid',
      rowPageBreak: 'avoid',
      margin: 5,
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { cellWidth: 25 },
        3: { cellWidth: 50 },
        4: { cellWidth: 30 },
        5: { cellWidth: 80 }
      },
      headStyles: {
        valign: 'middle',
        fillColor: [200, 230, 255],
        textColor: 100,
        lineColor: 220,
        lineWidth: 0.1,
        fontSize: 12,
        fontStyle: "bold"
      },
      bodyStyles: { valign: 'middle', fontSize: 11 },
      head: [
        [
          { content: 'Patient #\nPatient Name\nRoom' },
          { content: 'Admint Date\nAtt. Physician\nPatient Type' },
          { content: 'CDS\nReview Status\nReimb. Type' },
          { content: 'Insurance\nFinancial Class\nTotal Charges' },
          { content: 'LOS/GLOS\nTrans. DRG\nDRG Type' },
          { content: 'DRG No.\nDRG Description\nDRG Weight' }
        ]
      ],
      body: this.createTableBody(patientsData),
      tableLineColor: 150
    });
  }

  private static addTableContentWithComments(pdfReport: jsPDF, patientsData: any) {
    autoTable(pdfReport, {
      theme: 'grid',
      rowPageBreak: 'avoid',
      margin: 5,
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 40 },
        4: { cellWidth: 25 },
        5: { cellWidth: 60 },
        6: { cellWidth: 60 }
      },
      headStyles: {
        valign: 'middle',
        fillColor: [200, 230, 255],
        textColor: 100,
        lineColor: 220,
        lineWidth: 0.1,
        fontSize: 11,
        fontStyle: "bold"
      },
      bodyStyles: { valign: 'middle', fontSize: 10 },
      head: [
        [
          { content: ' Patient #\n Patient Name\n Room' },
          { content: ' Admint Date\n Att. Physician\n Patient Type' },
          { content: ' CDS\n Review Status\n Reimb. Type' },
          { content: ' Insurance\n Financial Class\n Total Charges' },
          { content: ' LOS/GLOS\n Trans. DRG\n DRG Type' },
          { content: ' DRG No.\n DRG Description\n DRG Weight' },
          { content: ' Followup Comments' }
        ]
      ],
      body: this.createTableBody(patientsData, true),
      didParseCell: function (data) {
        // Check if it's the cell you want to format (e.g., third column)
        if (data.column.index === 0) {
          data.cell.styles.fontStyle = 'bold';
        }
      },
      tableLineColor: 150
    });
  }

  private static createTableBody(patientsData, isCommentsIncluded = false) {
    const body = [];
    patientsData.result.forEach((patient) => {
        const row = [];
        row.push({ content: `${patient.patientNo}\n${patient.patientName}\n${patient.room}` });
        row.push({ content: `${patient.admitDate}\n${patient.attendingPhysician || "-"}\n${patient?.patientClass === 'Out' ? 'OBS': 'IN'}` });
        row.push({ content: `${patient.cds || "-"}\n${patient.reviewStatus}\n${patient.reimbursementType || "-"}` });
        row.push({ content: `${patient.healthPlan || "-"}\n${patient.financialClass}\n${patient.totalCharges || '-'}` });
        row.push({ content: `${(patient.los || "0") +"/" + (patient.geo || "0")}\n${patient.transferDrg || '-'}\n${patient.drgType || '-'}` });
        row.push({ content: `${patient.drgNo }\n${patient.diagnosis || '-'}\n${patient.drgWeight || '-'}` });
        if(isCommentsIncluded) {
          const comments = patient.followupComments.map(item => `${item.addedOn}: "${item.comments}"`).join(',\n');
          row.push({ content: comments });
        }
        body.push(row);
    });
    return body;
  }

}
function savePDF(pdfReport: jsPDF) {
  pdfReport.save(
    'patients_' + moment(Date.now()).format('YYYY_MM_DD_hh:mm:ss') + '.pdf'
  );
}

