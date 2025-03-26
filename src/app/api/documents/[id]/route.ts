import { NextResponse } from "next/server";
import { mockDocuments } from "@/app/api/documents/route";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const documentIndex = mockDocuments.findIndex(d => d.id === id);

        if (documentIndex === -1) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        mockDocuments.splice(documentIndex, 1);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}