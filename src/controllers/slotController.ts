import { Request, Response } from "express";
import { prisma } from "../index";

export const getAllSlots = async (req: Request, res: Response) => {
  const slots = await prisma.slot.findMany();

  res.status(200).json({
    status: "success",
    slots: slots,
  });
};

export const createSlot = async (req: Request, res: Response) => {
  const { stime, etime } = req.body;

  const newSlot = await prisma.slot.create({
    data: {
      stime: stime,
      etime: etime,
    },
  });

  res.status(201).json({
    status: "success",
    newSlot: newSlot,
  });
};

export const deleteSlotById = async (req: Request, res: Response) => {
  const {id} = req.params;

  const deletedSlot = await prisma.slot.delete({
    where: {
      id: parseInt(id,10),
    },
  })

  res.status(204).json({
    status: "success",
    deletedSlot: deletedSlot,
  });
};
