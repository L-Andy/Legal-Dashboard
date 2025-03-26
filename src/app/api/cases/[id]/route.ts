import { NextResponse } from "next/server";
import { mockCases } from "@/app/api/cases/route";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const updates = await request.json();

        const caseIndex = mockCases.findIndex(c => c.id === id);

        if (caseIndex === -1) {
            return NextResponse.json(
                { error: 'Case not found' },
                { status: 404 }
            );
        }

        const updatedCase = {
            ...mockCases[caseIndex],
            ...updates,
            lastUpdated: new Date().toISOString()
        };

        mockCases[caseIndex] = updatedCase;

        return NextResponse.json(updatedCase);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const caseIndex = mockCases.findIndex(c => c.id === id);

        if (caseIndex === -1) {
            return NextResponse.json(
                { error: 'Case not found' },
                { status: 404 }
            );
        }

        mockCases.splice(caseIndex, 1);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}