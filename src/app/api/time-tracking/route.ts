import { NextResponse } from 'next/server';
import { ITimeEntry } from '@/lib/interfaces';

export const mockTimeEntries: ITimeEntry[] = [
  {
    id: '1',
    hours: 5.5,
    date: '2024-03-15',
    case: 'Smith v. Johnson',
    description: 'Case research and document preparation',
    billable: true,
  },
  {
    id: '2',
    hours: 3.2,
    date: '2024-03-15',
    case: 'ABC Corp Acquisition',
    description: 'Client meeting and contract review',
    billable: true,
  },
  {
    id: '3',
    hours: 2.8,
    date: '2024-03-14',
    case: 'Smith v. Johnson',
    description: 'Court appearance',
    billable: true,
  },
  {
    id: '4',
    hours: 4.0,
    date: '2024-03-14',
    case: 'Estate of Williams',
    description: 'Document drafting',
    billable: false,
  },
  {
    id: '5',
    hours: 1.5,
    date: '2024-03-13',
    case: 'ABC Corp Acquisition',
    description: 'Phone consultation',
    billable: true,
  },
];

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(mockTimeEntries);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const entry = await request.json();

    await new Promise(resolve => setTimeout(resolve, 500));

    const createdEntry: ITimeEntry = {
      ...entry,
      id: String(mockTimeEntries.length + 1),
    };

    return NextResponse.json(createdEntry);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 