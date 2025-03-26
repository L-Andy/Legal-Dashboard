import { NextResponse } from 'next/server';
import type { IDocument } from '@/lib/interfaces';

export const mockDocuments: IDocument[] = [
  {
    id: '1',
    name: 'Contract Draft v2',
    case: 'Smith v. Johnson',
    version: '2.0',
    status: 'approved',
    lastUpdated: '2023-11-15',
  },
  {
    id: '2',
    name: 'Merger Agreement',
    case: 'ABC Corp Acquisition',
    version: '1.1',
    status: 'in review',
    lastUpdated: '2023-11-10',
  },
  {
    id: '3',
    name: 'Will and Testament',
    case: 'Estate of Williams',
    version: '1.0',
    status: 'finalized',
    lastUpdated: '2023-10-28',
  },
  {
    id: '4',
    name: 'Patent Application',
    case: 'TechCo Innovation Filing',
    version: '1.2',
    status: 'draft',
    lastUpdated: '2023-11-05',
  },
  {
    id: '5',
    name: 'Settlement Agreement',
    case: 'Martinez v. City Hospital',
    version: '1.0',
    status: 'in review',
    lastUpdated: '2023-11-12',
  },
];

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(mockDocuments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const document = await request.json();

    await new Promise(resolve => setTimeout(resolve, 500));

    const createdDocument: Document = {
      ...document,
      id: String(mockDocuments.length + 1),
    };

    return NextResponse.json(createdDocument);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 