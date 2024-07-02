import { RequestNetwork } from '@requestnetwork/request-client.js';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Helper function to interpolate between two colors


type Payment = {
  date: string;
  amount: number;
};

type generatePdfParams = {
  requestId: string;
};

export const generatePdf = async ({
  requestId
}: generatePdfParams) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 700]);

  const { width, height } = page.getSize();

  const requestClient = new RequestNetwork({
    nodeConnectionConfig: { 
      baseURL: "https://sepolia.gateway.request.network/",
    },
  });

  const request = await requestClient.fromRequestId(requestId);
  const requestData = await request.getData();

  const declaredPaymentsReceived = [];
  for (let i = 0; i < requestData.extensionsData.length; i++) {
    if (requestData.extensionsData[i].action === 'declareReceivedPayment') {
      const amount = requestData.extensionsData[i].parameters.amount;
      const note = requestData.extensionsData[i].parameters.note;
      declaredPaymentsReceived.push({ amount, note });
    }
  }

  let declaredPaymentSent;

  for (let i = 0; i < requestData.extensionsData.length; i++) {
    if (requestData.extensionsData[i].action === 'declareSentPayment') {
      declaredPaymentSent = {
        amount: requestData.extensionsData[i].parameters.amount,
        note: requestData.extensionsData[i].parameters.note
      };
    }
  }

  const requestDataReceived = {
    dueDate: requestData.contentData.dueDate,
    reason: requestData.contentData.reason,
    payee: requestData.payee?.value as string,
    payer: requestData.payer?.value as string,
    expectedAmount: requestData.expectedAmount,
    requestId: requestData.requestId,
    currencyAddress: requestData.currencyInfo.value,
    expectedFlowRate: requestData.extensionsData[0].parameters.expectedFlowRate,
    declaredPaymentsReceived: declaredPaymentsReceived,
    declaredPaymentSent: declaredPaymentSent
  };

  console.log("------request data received------");
  console.log(requestDataReceived);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Header with gradient text
  page.drawText('WaveIn Request Details', {
    x: 25,
    y: height - 50,
    size: 30,
    color: rgb(0, 0, 0),
    font: font,
  });

  page.drawText(`Request ID: ${requestId}`, {
    x: 25,
    y: height - 75,
    size: 8,
    color: rgb(0, 0, 0),
    font: font,
  });

  page.drawText(`Reason: ${requestDataReceived.reason}`, {
    x: 25,
    y: height - 100,
    size: 12,
    color: rgb(0, 0, 0),
    font: font,
  });

  page.drawText(`Due Date: ${requestDataReceived.dueDate}`, {
    x: 25,
    y: height - 130,
    size: 12,
    color: rgb(0, 0, 0),
    font: font,
  });

  page.drawText(`Expected Amount: ${requestDataReceived.expectedAmount} USDC`, {
    x: 25,
    y: height - 160,
    size: 12,
    color: rgb(0, 0, 0),
    font: font,
  });

  page.drawText(`Payer: ${requestDataReceived.payer}`, {
    x: 25,
    y: height - 190,
    size: 12,
    color: rgb(0, 0, 0),
    font: font,
  });

  page.drawText(`Payee: ${requestDataReceived.payee}`, {
    x: 25,
    y: height - 220,
    size: 12,
    color: rgb(0, 0, 0),
    font: font,
  });

  // Declared Payments Sent
  page.drawText(`Declared Payments Sent:`, {
    x: 25,
    y: height - 250,
    size: 12,
    color: rgb(0, 0, 0),
    font: font,
  });

  if (declaredPaymentSent) {
    page.drawText(`Amount: ${declaredPaymentSent.amount} , Date: ${declaredPaymentSent.note}`, {
      x: 25,
      y: height - 270,
      size: 10,
      color: rgb(0, 0, 0),
      font: font,
    });
  }

  // Declared Payments Received
  page.drawText(`Declared Payments Received:`, {
    x: 25,
    y: height - 300,
    size: 12,
    color: rgb(0, 0, 0),
    font: font,
  });

  let yOffset = height - 320;

  if (requestDataReceived.declaredPaymentsReceived.length > 0) {
    requestDataReceived.declaredPaymentsReceived.forEach(payment => {
      page.drawText(`Amount: ${payment.amount}, Date: ${payment.note}`, {
        x: 25,
        y: yOffset,
        size: 10,
        color: rgb(0, 0, 0),
        font: font,
      });
      yOffset -= 20;
    });
  }

  

  function calculateTotalPaymentReceived(declaredPaymentsReceived: Payment[]) {
    let total = 0;
    declaredPaymentsReceived.forEach(payment => {
      total += Number(payment.amount);
    });
    return total;
  }

  const totalPaymentsReceived = calculateTotalPaymentReceived(declaredPaymentsReceived as any);
  console.log('Total Payments Received: ')
  console.log(totalPaymentsReceived)

  const outstandingAmount =  Number(requestDataReceived.expectedAmount) - totalPaymentsReceived;

    // Outstanding Amount
    page.drawText(`Outstanding Amount: ${outstandingAmount} USDC`, {
      x: 25,
      y: yOffset - 20,
      size: 12,
      color: rgb(0, 0, 0),
      font: font,
    });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
