// src/users/users.repository.ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './schemas/vehicle.schema';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<Vehicle>,
  ) {}

  async create(vehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(vehicleDto);
    return createdVehicle.save();
  }

  async findAllVehiclesByOwnerID(
    id: string,
    skip: number,
    limit: number,
  ): Promise<Vehicle[]> {
    return this.vehicleModel.find({ owner: id }).skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicleModel.findById(id).exec();
  }

  async update(id: string, vehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehicleModel
      .findByIdAndUpdate(id, vehicleDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Vehicle> {
    return this.vehicleModel.findByIdAndRemove(id).exec();
  }
}
