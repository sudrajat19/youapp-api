import { QueryTypes } from "sequelize";
import sequelize from "../utils/supabaseClient";

export const getAlbum = async (req, res) => {
  try {
    const results = await sequelize.query("SHOW TABLES", {
      type: QueryTypes.SHOWTABLES,
    });
    console.log(results);
    const albums = results.map((table) => Object.values(table)[0]);

    console.log("Daftar album:", albums);

    res.status(200).send(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const createAlbum = async (req, res) => {
  const albumName = req.body.albumName;

  try {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${albumName} (
                id_${albumName} INT AUTO_INCREMENT PRIMARY KEY,
                photo_path VARCHAR(255)
            )
        `;

    await sequelize.query(createTableQuery, { type: QueryTypes.RAW });
    res.status(200).send(`Tabel ${albumName} berhasil dibuat.`);

    if (albumName) {
      await sequelize.query.addColumn(albumName, `id_${albumName}`, {
        type: DataTypes.INDEX,
      });
      if (albumName) {
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error);
  }
};

export const addPhoto = async (req, res) => {
  const albumName = req.params.albumName;
  const photoPath = req.file ? "images/" + req.file.filename : null;

  try {
    const insertPhotoQuery = `
            INSERT INTO ${albumName} (photo_path) VALUES (?)
        `;

    await sequelize.query(insertPhotoQuery, {
      replacements: [photoPath],
      type: QueryTypes.INSERT,
    });
    res.status(200).send(`Foto berhasil ditambahkan ke ${albumName}.`);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error);
  }
};
