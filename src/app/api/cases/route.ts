import { NextResponse } from 'next/server';
import  { ICase, CaseStatusEnum } from '@/lib/interfaces';

export const mockCases: ICase[] = [
  {
    id: '1',
    title: 'Smith vs Johnson',
    status: CaseStatusEnum.ACTIVE,
    lastUpdated: '2024-03-15',
    type: 'Civil',
    date: '2024-01-10',
  },
  {
    id: '2',
    title: 'Corporate Merger - ABC Corp',
    status: CaseStatusEnum.PENDING,
    lastUpdated: '2024-03-14',
    type: 'Corporate',
    date: '2024-02-05',
  },
  {
    id: '3',
    title: 'Estate Planning - Williams',
    status: CaseStatusEnum.CLOSED,
    lastUpdated: '2024-03-10',
    type: 'Civil',
    date: '2023-11-20',
  },
  {
    id: '4',
    title: 'Intellectual Property Dispute',
    status: CaseStatusEnum.ACTIVE,
    lastUpdated: '2024-03-12',
    type: 'Civil',
    date: '2024-01-25',
  },
  {
    id: '5',
    title: 'Divorce Proceedings',
    status: CaseStatusEnum.PENDING,
    lastUpdated: '2024-03-11',
    type: 'Family',
    date: '2024-02-15',
  },
];

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (Math.random() < 0.1) { // 10% API failure
      return NextResponse.json(
        { error: 'Failed to fetch cases' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(mockCases);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newCase = await request.json();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (Math.random() < 0.1) {
      return NextResponse.json(
        { error: 'Failed to create case' },
        { status: 500 }
      );
    }
    
    const createdCase: ICase = {
      ...newCase,
      id: String(mockCases.length + 1),
    };
    
    return NextResponse.json(createdCase);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
