import {NextRequest, NextResponse} from "next/server";
import path from "node:path";
import { writeFile, mkdir } from 'fs/promises';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'Keine Datei gefunden.' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniqueSuffix}-${file.name.replace(/\s/g, '_')}`;

        // 1. Zielverzeichnis definieren
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // 2. Ordner erstellen, falls er nicht existiert
        await mkdir(uploadDir, { recursive: true });

        // 3. Gesamten Pfad zur Datei zusammenbauen
        const uploadPath = path.join(uploadDir, filename);

        // 4. Datei auf der Festplatte speichern
        await writeFile(uploadPath, buffer);

        // 5. Erfolgreiche Antwort zurückgeben (mit korrigierten Klammern)
        return NextResponse.json({
            success: true,
            status: 200,
            message: 'Bild erfolgreich gespeichert!',
            url: `/uploads/${filename}`
        });

    } catch (error) {
        console.error('Fehler beim Speichern der Datei:', error);
        return NextResponse.json(
            { success: false, message: 'Fehler beim Upload.' },
            { status: 500 }
        );
    }
}