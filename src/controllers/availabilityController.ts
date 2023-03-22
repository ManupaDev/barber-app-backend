import { Request, Response } from "express";
import { prisma } from "../index";
import dayjs from "dayjs";

export const getAllAvailabilities = async (req: Request, res: Response) => {
  if (req.query.date) {
    const { date } = req.query;
    console.log(date);

    const selectedDate = dayjs(date.toString()).hour(0).minute(0).second(0).millisecond(0);
    const nextDate = selectedDate.add(1, "day");

    const availability = await prisma.availability.findMany({
      where: {
        on: {
          lt: nextDate.toDate(),
          gt: selectedDate.toDate(),
        },
      },
    });

    res.status(200).json({
      status: "success",
      availability: availability,
    });
    return;
  }
  const availabilities = await prisma.availability.findMany();

  res.status(200).json({
    status: "success",
    availabilities: availabilities,
  });
};

export const getAvailabilityById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const availability = await prisma.availability.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  console.log(availability);

  res.status(200).json({
    status: "success",
    availability: availability,
  });
};

export const createAvailability = async (req: Request, res: Response) => {
  const { on, slots } = req.body;
  console.log(slots);

  const newAvailability = await prisma.availability.create({
    data: {
      on: dayjs(on).toDate(),
      slots: slots,
    },
  });

  res.status(201).json({
    status: "success",
    newAvailability: newAvailability,
  });
};

export const deleteAvailabilityById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedAvailability = await prisma.availability.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  res.status(204).json({
    status: "success",
    deletedAvailability: deletedAvailability,
  });
};
