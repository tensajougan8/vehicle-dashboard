import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleRepository } from './vehicle.repository';
import { Vehicle } from './schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(private readonly vehiclesRepository: VehicleRepository) {}
  async create(
    createVehicleDto: CreateVehicleDto,
    userID: string,
  ): Promise<Vehicle> {
    createVehicleDto.owner = userID;
    return this.vehiclesRepository.create(createVehicleDto);
  }

  async findAllVehiclesByOwnerID(
    id: string,
    page: number,
    limit: number,
  ): Promise<Vehicle[]> {
    const skip = (page - 1) * limit;
    const vehicles = await this.vehiclesRepository.findAllVehiclesByOwnerID(
      id,
      skip,
      limit,
    );
    if (vehicles) {
      throw new NotFoundException('vehicles not found');
    }

    return vehicles;
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne(id);
    if (!vehicle) {
      throw new NotFoundException('vehicle not found');
    }

    return vehicle;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne(id);
    if (!vehicle) {
      throw new NotFoundException('vehicle not found');
    }
    return await this.vehiclesRepository.update(id, updateVehicleDto);
  }

  async remove(id: string): Promise<Vehicle> {
    return await this.vehiclesRepository.remove(id);
  }
}
