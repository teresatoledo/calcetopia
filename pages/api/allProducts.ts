import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDatabase();
    const query = `
      SELECT id, productName, slug, description, price, offer, image1, image2
      FROM Product
    `;
    const [results] = await db.execute(query);
    db.end();
    res.status(200).json({ data: results });
  } catch (error: any) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: error.message });
  }
}
