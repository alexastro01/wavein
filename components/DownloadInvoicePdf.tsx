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
    requestId
 }
: generatePdfParams) => {
  const handleDownloadPdf = async () => {



    const pdfBytes = await generatePdf({requestId});
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
