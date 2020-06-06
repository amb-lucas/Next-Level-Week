import { Request, Response, request } from "express";

import knex from "../database/connection";

const IP = "192.168.1.67";

class PointsController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: Number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return res.json({ id: point_id, ...point });
  }

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .where(function () {
        this.where(city === undefined).orWhere("city", String(city));
      })
      .where(function () {
        this.where(uf === undefined).orWhere("uf", String(uf));
      })
      .where(function () {
        this.where(items === undefined).orWhereIn(
          "point_items.item_id",
          parsedItems
        );
      })
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => ({
      ...point,
      image: `http://${IP}:3333/uploads/points/${point.image}`,
    }));

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ error: "Point not found" });
    }

    const serializedPoint = {
      ...point,
      image: `http://${IP}:3333/uploads/points/${point.image}`,
    };

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", "=", id)
      .select("items.title");

    return res.json({ ...serializedPoint, items });
  }
}

export default PointsController;
