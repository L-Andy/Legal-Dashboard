import { NextResponse } from "next/server";
import { mockTimeEntries } from "@/app/api/time-tracking/route";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const { id } =  params;

        const timeEntryIndex = mockTimeEntries.findIndex(d => d.id === id);

        if (timeEntryIndex === -1) {
            return NextResponse.json(
                { error: 'Time entry not found' },
                { status: 404 }
            );
        }

        mockTimeEntries.splice(timeEntryIndex, 1);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}