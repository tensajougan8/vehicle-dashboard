import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EngineDto } from '../dto/engine.dto';

@Schema({
  timestamps: true,
})
export class Vehicle extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate RTO number entered'] })
  rtoNumber: string;

  @Prop()
  modelNo: string;

  @Prop()
  color: string;

  @Prop()
  brand: string;

  @Prop({
    type: EngineDto,
  })
  engine: EngineDto;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: mongoose.Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
