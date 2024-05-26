import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public/data', 'cartItems.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log('req.method', req.method);

  // Handle GET request
  if (req.method === 'GET') {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Error reading data file' });
        return;
      }

      const items = JSON.parse(data);
      res.status(200).json({ success: true, data: items });
    });
  }
  //   Handle POST request
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    if (body?.item) {
      const cartItem = {
        id: new Date().getTime(),
        item: body.item,
      };

      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ error: 'Error reading data file' });
          return;
        }

        const items = JSON.parse(data);
        items.push(cartItem);
        fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), err => {
          if (err) {
            res.status(500).json({ error: 'Error writing to data file' });
            return;
          }

          res.status(200).json({ success: true, data: items });
        });
      });
    }
  }
  //   Handle DELETE request
  if (req.method === 'DELETE') {
    const body = JSON.parse(req.body);
    if (body?.id) {
      console.log('handler  body:', body);
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ error: 'Error reading data file' });
          return;
        }

        let items = JSON.parse(data);
        items = items.filter((item: any) => item.id !== body.id);
        fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), err => {
          if (err) {
            res.status(500).json({ error: 'Error writing to data file' });
            return;
          }

          res.status(200).json({ success: true, data: items });
        });
      });
    }
  }
}
