import { Request, Response } from "express";
import { prisma } from "../index";
import dayjs from "dayjs";

export const getAllAvailabilities = async (req: Request, res: Response) => {
  if (req.query.date) {
    const { date } = req.query;

    const selectedDate = dayjs(date.toString()).hour(0).minute(0).second(0).millisecond(0);
    const nextDate = selectedDate.add(1, "day");

    const availability = await prisma.availability.findFirst({
      where: {
        on: {
          lt: nextDate.toDate(),
          gt: selectedDate.toDate(),
        },
      },
      include: {
        slots: {
          orderBy: {
            slot: {
              stime: "asc",
            },
          },
          select: {
            slot: true,
          },
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
  

  const selectedDate = dayjs(on).hour(0).minute(0).second(0).millisecond(0);
  const nextDate = selectedDate.add(1, "day");

  const existingAvailability = await prisma.availability.findFirst({
    where: {
      on: {
        lt: nextDate.toDate(),
        gt: selectedDate.toDate(),
      },
    },
  });

  if (!existingAvailability) {
    const newAvailability = await prisma.availability.create({
      data: {
        on: dayjs(on).toDate(),
      },
    });
  
    slots.forEach(async (slot: number) => {
      const newSlotsOnAvailability = await prisma.slotsOnAvailabilities.create({
        data: {
          availabilityId: newAvailability.id,
          slotId: slot,
          assignedBy: "System",
        },
      });
    });
  
    res.status(201).json({
      status: "success",
      newAvailability: newAvailability,
    });

  }else{
    res.status(400).json({
      status: "failure",
      newAvailability: null,
    });
  }

  
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
