import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';
import { RowDataPacket } from 'mysql2/promise';

interface ProductWithSize extends RowDataPacket {
    id: number;
    productName: string;
    slug: string;
    description: string;
    price: number;
    offer: boolean;
    image1: string;
    image2: string;
    sizeName: string;
    sizeSlug: string;
    
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({ error: 'Slug is required' });
    }

    try {
        const db = await connectToDatabase();
        const query = `
            SELECT 
                p.id, 
                p.productName, 
                p.slug, 
                p.description, 
                p.price, 
                p.offer, 
                p.image1, 
                p.image2,
                s.sizeName,
                s.slug AS sizeSlug
            FROM 
                Product p
            LEFT JOIN 
                Product_Size ps ON p.id = ps.productId
            LEFT JOIN 
                Size s ON ps.sizeId = s.id
            WHERE 
                p.slug = ?
        `;
        const [results] = await db.execute<ProductWithSize[]>(query, [slug]);
        db.end();

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = {
            id: results[0].id,
            productName: results[0].productName,
            slug: results[0].slug,
            description: results[0].description,
            price: results[0].price,
            offer: results[0].offer,
            images: [results[0].image1, results[0].image2].filter(Boolean),
            sizes: results.map(result => ({ sizeName: result.sizeName, sizeSlug: result.sizeSlug })).filter(size => size.sizeName)
        };

        res.status(200).json({ data: product });
    } catch (error: unknown) {
        console.error('Database query failed:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}
