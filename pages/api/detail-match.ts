// pages/api/detail-match.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { matchId } = req.query;

    // Check for method type
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        // Fetch data from the external API
        const response = await fetch(`https://api-dofa.prd-aws.fff.fr/api/match_entities/${matchId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if response is okay
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch match details' });
        }

        const data = await response.json();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', 'application/json');

        // Return data to the client
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching match details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
