"use server";

import { prisma } from "../prisma";
import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateAvatar } from "../utils";
import { unique } from "next/dist/build/utils";

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointment: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointment,
    }));
  } catch (error) {
    console.log("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}

interface createDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}
export async function createDoctor(input: createDoctorInput) {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and Email are required");

    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });

    revalidatePath("/admin");
    return doctor;
  } catch (error: any) {
    console.log("Error creating doctor", error);

    if (error?.code == "P2002") {
      throw new Error("A doctor with this email already exists!");
    }

    throw new Error("Failed to create new doctor");
  }
}

interface updateDoctorInput extends Partial<createDoctorInput> {
  id: string;
  email: string;
}
export async function updateDoctor(input: updateDoctorInput) {
  try {
    if (!input.name || !input.email)
      throw new Error("Name and email are required");

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true },
    });

    if (!currentDoctor) throw new Error("Doctor not found!");

    //if email is changing , check if the new email already exists
    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findFirst({
        where: { email: input.email },
      });

      if (existingDoctor) {
        throw new Error("A doctor with this email already exists");
      }
    }

    const doctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });
    return doctor;
  } catch (error) {
    console.log("Error updating doctor:", error);
    throw new Error("Failed to update doctor");
  }
}

export async function getAvailableDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { appointment: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointment,
    }));
  } catch (error) {
    console.error("Error fetching available doctors:", error);
    throw new Error("Failed to fetch available doctors");
  }
}
