export const javaProtocolMap: Record<number, string> = {
  47: '1.8',
  107: '1.9',
  210: '1.10',
  315: '1.11',
  335: '1.12',
  393: '1.13',
  498: '1.14',
  578: '1.15',
  735: '1.16',
  755: '1.17',
  757: '1.18',
  759: '1.19',
  761: '1.20',
  767: '1.21',
};

export const bedrockProtocolMajor: Record<number, string> = {
  560: '1.19',
  582: '1.19',
  594: '1.20',
  748: '1.21',
};

/**
 * Gibt die Major-Version zurück (z.B. "1.20", "1.21").
 */
export function getMajorVersionFromResponse(serverResponse: any, bedrock: boolean): string {
  // 1️⃣ Prüfe version.name aus dem Response (Full-Version)
  const versionString =
    serverResponse?.data?.version?.name || // richtige Ebene
    serverResponse?.version?.name ||      // fallback
    serverResponse?.data?.version ||      // falls nur Objekt
    serverResponse?.version;              // fallback

  if (typeof versionString === 'string') {
    // erste Major.Minor Kombination extrahieren
    const match = versionString.match(/\d+\.\d+/);
    if (match) return match[0].trim();
  }

  // 2️⃣ Prüfe Protocol
  const protocol = serverResponse?.data?.version?.protocol ?? serverResponse?.version?.protocol;
  if (typeof protocol === 'number' && protocol > 0) {
    const map = bedrock ? bedrockProtocolMajor : javaProtocolMap;
    if (map[protocol]) return map[protocol];

    // Java 1.21+ fallback
    if (!bedrock && protocol >= 767) return '1.21';
  }

  // 3️⃣ fallback
  return 'unknown';
}