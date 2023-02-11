import { Request, Response } from "express";
import { prisma } from "../index";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.status(200).json({
    status: "success",
    users: users,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { uid } = req.body;

  console.log(uid);
  
  const newUser = await prisma.user.create({
    data: {
      uid:uid
    },
  });

  res.status(201).json({
    status: "success",
    newUser: newUser,
  });
};


export const getUserById = async (req: Request, res: Response) => {
  const {id} = req.params; 
  const user = await prisma.user.findFirst({
    where:{
      uid: id,
    }
  })

  res.status(200).json({
    status: "success",
    user,
  });
}