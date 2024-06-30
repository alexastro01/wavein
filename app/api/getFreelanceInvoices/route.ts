import { RequestNetwork } from '@requestnetwork/request-client.js';
import { NextResponse } from 'next/server';
import { IRequestDataWithEvents } from '@requestnetwork/request-client.js/dist/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address || !address.startsWith('0x')) {
      return NextResponse.json({ status: 'error', message: 'Invalid address parameter' }, { status: 400 });
    }

    console.log('Received address:', address);

    const requestClient = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: "https://sepolia.gateway.request.network/",
      },
    });

    enum TYPE {
      ETHEREUM_ADDRESS = "ethereumAddress",
      ETHEREUM_SMART_CONTRACT = "ethereumSmartContract"
    }

    try {
      const requests = await requestClient.fromIdentity(
        { type: TYPE.ETHEREUM_ADDRESS, value: address },
      );
      const requestDatas = await Promise.all(requests.map((request) => request.getData()));

      console.log('All request data:', requestDatas);

      // Filter the requests by payee.value equal to the provided address and RequestType 'wavein'
      const filteredRequests = requestDatas
        .filter(request => request.payee?.value === address)
        .filter(request => request.contentData?.RequestType === 'wavein');

      console.log('Filtered request data:', filteredRequests);

      // Calculate the total expected amount
      const totalExpectedAmount = filteredRequests.reduce((total, request) => {
        const expectedAmount = parseFloat(request.expectedAmount as string || '0'); // parse the expectedAmount to a number
        return total + expectedAmount;
      }, 0);

      console.log('Total expected amount:', totalExpectedAmount);

      return NextResponse.json({
        status: 'success',
        data: filteredRequests,
        totalExpectedAmount: totalExpectedAmount
      });
    } catch (error) {
      console.error('Error fetching request data:', error);
      return NextResponse.json({ status: 'error', message: 'Error fetching request data' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ status: 'error', message: 'An error occurred' }, { status: 500 });
  }
}
