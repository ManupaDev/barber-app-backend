import { Request, Response } from "express";
import { prisma } from "../index";
import dayjs from "dayjs";

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
      stime: dayjs(stime).toDate(),
      etime: dayjs(etime).toDate(),
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
