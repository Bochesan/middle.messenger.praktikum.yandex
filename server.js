import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, './dist')));
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
