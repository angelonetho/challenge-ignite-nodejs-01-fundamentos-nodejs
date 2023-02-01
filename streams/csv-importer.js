import { parse } from 'csv-parse';
import fs from 'node:fs'

(async () => {

    const path = new URL('./tasks.csv', import.meta.url)

    const stream = fs.createReadStream(path)

    const parseCsv = parse({
        delimiter: ',',
        from_line: 2
    })

  // Report start
  console.log('start\n');

  const parser = stream.pipe(parseCsv)

  // Iterate through each records
  for await (const record of parser) {
    const [title, description] = record

    await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description
        })
    })
  }
  // Report end
  console.log('...done\n');
})();