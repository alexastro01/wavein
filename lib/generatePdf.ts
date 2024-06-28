import { PDFDocument, rgb } from 'pdf-lib';

type Payment = {
  date: string;
  amount: number;
};

type generatePdfParams = {
  dueDate: string;
  reason: string;
  payer: string;
  payee: string;
  expectedAmount: number;
  requestId: string;
  declaredPaymentsSent?: Payment[];
  declaredPaymentsReceived?: Payment[];
};

export const generatePdf = async ({
  dueDate,
  reason,
  payer,
  payee,
  expectedAmount,
  requestId,
  declaredPaymentsSent = [],
  declaredPaymentsReceived = [],
}: generatePdfParams) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 700]);

  const { width, height } = page.getSize();

  page.drawText(`WaveIn Details`, {
    x: 50,
    y: height - 50,
    size: 24,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Request ID: ${requestId}`, {
    x: 50,
    y: height - 75,
    size: 8,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Reason: ${reason}`, {
    x: 50,
    y: height - 100,
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Due Date: ${dueDate}`, {
    x: 50,
    y: height - 130,
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Expected Amount: ${expectedAmount} USDC`, {
    x: 50,
    y: height - 160,
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Payer: ${payer}`, {
    x: 50,
    y: height - 190,
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Payee: ${payee}`, {
    x: 50,
    y: height - 220,
    size: 12,
    color: rgb(0, 0, 0),
  });

  // Declared Payments Sent
  page.drawText(`Declared Payments Sent:`, {
    x: 50,
    y: height - 250,
    size: 12,
    color: rgb(0, 0, 0),
  });

  let currentY = height - 270;

  (declaredPaymentsSent as Payment[]).forEach((payment, index) => {
    page.drawText(`- Date: ${payment.date}, Amount: ${payment.amount} USDC`, {
      x: 50,
      y: currentY - (index * 20),
      size: 8,
      color: rgb(0, 0, 0),
    });
  });

  currentY -= declaredPaymentsSent.length * 20;

  // Declared Payments Received
  page.drawText(`Declared Payments Received:`, {
    x: 50,
    y: currentY - 30,
    size: 12,
    color: rgb(0, 0, 0),
  });

  currentY -= 50;

  (declaredPaymentsReceived as Payment[]).forEach((payment, index) => {
    page.drawText(`- Date: ${payment.date}, Amount: ${payment.amount} USDC`, {
      x: 50,
      y: currentY - (index * 20),
      size: 8,
      color: rgb(0, 0, 0),
    });
  });

  currentY -= declaredPaymentsReceived.length * 20 + 20;

  // Calculate total sent amount
  const totalSent = (declaredPaymentsSent as Payment[]).reduce((acc, payment) => acc + payment.amount, 0);

  // Outstanding amount
  page.drawText(`Outstanding amount: ${expectedAmount - totalSent} USDC`, {
    x: 50,
    y: currentY - 30,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
