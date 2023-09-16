import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Vehicle created successfully',
    type: CreateVehicleDto,
  })
  create(@Body() createVehicleDto: CreateVehicleDto, @Request() request) {
    const userID = request.user._id;
    return this.vehicleService.create(createVehicleDto, userID);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Vehicle updated successfully' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    console.log(id);
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @CacheKey('custom_key')
  @CacheTTL(50)
  @Get()
  @ApiResponse({ status: 200, description: 'List of vehicles' })
  findAll(@Request() req, @Query('page') page: number | 1) {
    const limit: number = 10;
    const id = req.user._id;
    return this.vehicleService.findAllVehiclesByOwnerID(id, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @CacheKey('getById_key')
  @CacheTTL(20)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Vehicle found' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Vehicle deleted successfully' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
