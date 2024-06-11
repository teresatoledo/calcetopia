import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';
import { RowDataPacket } from 'mysql2/promise'; // Importar RowDataPacket

interface ProductCategoryResult extends RowDataPacket { // Extender RowDataPacket
  categorySlug: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  try {
    const db = await connectToDatabase();

    // Obtener el categorySlug del producto actual
    const [product] = await db.execute<ProductCategoryResult[]>(
      'SELECT c.slug AS categorySlug FROM Product p INNER JOIN Category c ON p.categoryId = c.id WHERE p.slug = ?',
      [slug]
    );

    if (!product.length) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const categorySlug = product[0].categorySlug;

    // Obtener productos de la misma categoría
    const [results] = await db.execute<RowDataPacket[]>(
      `
        SELECT p.id, p.productName, p.slug, p.description, p.price, p.offer, p.image1, p.image2
        FROM Product p
        INNER JOIN Category c ON p.categoryId = c.id
        WHERE c.slug = ? AND p.slug != ?
      `,
      [categorySlug, slug]
    );

    db.end();
    res.status(200).json({ data: results });
  } catch (error: unknown) {
    console.error('Database query failed:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
