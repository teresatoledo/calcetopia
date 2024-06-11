import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    try {
        const db = await connectToDatabase();

        let query = '';
        let params: any[] = [];

        if (slug) {
            query = `
                SELECT p.id, p.productName, p.slug, p.description, p.price, p.offer, p.image1, p.image2, c.categoryName
                FROM Product p
                INNER JOIN Category c ON p.categoryId = c.id
                WHERE c.slug = ?
            `;
            params = [slug];
        } else {
            query = `
                SELECT id, categoryName, slug, mainImage
                FROM Category
            `;
        }

        const [results] = await db.execute(query, params);
        db.end();
        res.status(200).json({ data: results });
    } catch (error: any) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: error.message });
    }
}
