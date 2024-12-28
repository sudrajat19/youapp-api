import Interest from "../models/interest.js";
import { QueryTypes } from "sequelize";
import sequelize from "../utils/db.js";

export const getInterest = async (req, res) => {
  try {
    const results = await Interest.findAll();
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const getInterestId = async (req, res) => {
  const id_users = req.params.id_users;
  try {
    const data = await sequelize.query(
      `SELECT * FROM interests
       WHERE interests.id_users = :id_users`,
      {
        replacements: { id_users },
        type: QueryTypes.SELECT,
      }
    );
    if (!data) {
      return res.status(404).json({ message: "Interest tidak ditemukan" });
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createInterests = async (req, res) => {
  const interests = req.body.interests;
  const id_users = req.body.id_users;
  console.log(req.body);
  if (!Array.isArray(interests)) {
    return res.status(400).send("Interests must be an array");
  }

  try {
    const data = await Interest.bulkCreate(
      interests.map((interest) => ({
        interest,
        id_users,
      }))
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error);
  }
};

export const updateInterest = async (req, res) => {
  const id_interest = req.params.id_interest;
  const interests = req.body.interest;
  const id_users = req.body.id_users;

  try {
    const data = await Interest.findByPk(id_interest);
    if (!data) {
      console.log("data tidak ditemukan");
    }
    const interest = await data.update({ interests, id_users });
    res.status(200).json({
      message: "interest berhasil diupdate",
      data: interest,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteInterest = async (req, res) => {
  const id_interest = req.params.id_interest;

  try {
    const interest = await Interest.findOne({ where: { id_interest } });
    console.log(interest);
    await interest.destroy();
    res.status(200).json({ message: "interest berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus interest",
      error: error.message,
    });
  }
};
