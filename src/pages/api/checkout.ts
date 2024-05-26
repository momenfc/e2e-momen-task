import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public/data', 'cartItems.json');
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log('req.method', req.method);

  // Handle GET request
  if (req.method === 'GET') {
    fs.writeFile(dataFilePath, JSON.stringify([], null, 2), err => {
      if (err) {
        res.status(500).json({ error: 'Error writing to data file' });
        return;
      }

      res.status(200).json({ success: true, data: [] });
    });
  }
}
