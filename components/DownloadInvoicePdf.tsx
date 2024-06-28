import React from 'react';
import { saveAs } from 'file-saver';
import { generatePdf } from '@/lib/generatePdf';
import { Button } from './ui/button';


type generatePdfParams = {
    dueDate: string;
    reason: string;
    payer: string;
    payee: string;
    expectedAmount: number;
    requestId: string;   
}


const DownloadInvoicePdf = ({ 
    dueDate, reason, payer, payee, expectedAmount, requestId 
 }
: generatePdfParams) => {
  const handleDownloadPdf = async () => {



    const pdfBytes = await generatePdf({ 
        dueDate, reason, payer, payee, expectedAmount, requestId,    declaredPaymentsSent: [
          { date: "2024-06-01", amount: 200 },
          { date: "2024-06-15", amount: 300 },
        ], 
        declaredPaymentsReceived: [
          { date: "2024-06-05", amount: 100 },
          { date: "2024-06-20", amount: 150 },
        ],
     });
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'wavein-details.pdf');
  };

  return (
    <Button onClick={handleDownloadPdf}>
      Download PDF
      </Button>
  );
};

export default DownloadInvoicePdf;
