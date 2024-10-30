import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Vérifier que 'page' est fourni dans la requête, sinon, assigner une valeur par défaut
  const page = req.query.page || 1;
  const poule = req.query.poule || '1';

  const apiUrl = `https://api-dofa.prd-aws.fff.fr/api/compets/431336/phases/1/poules/${poule}/matchs?page=${page}`;

  try {
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
      // Détails de l'erreur avec le code de statut
      throw new Error(`Failed to fetch match data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Vérifie la structure des données
    if (!data || !data["hydra:member"]) {
      throw new Error("Invalid data format received from the API.");
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des matchs' });
  }
}
