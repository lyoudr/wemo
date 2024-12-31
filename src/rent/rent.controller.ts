import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Controller, Post, Get, Query, Body, Param } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { RentService } from './rent.service';
import { ScooterStatus } from '../scooter/scooter.entity';

export class StartRentDto {
    @ApiProperty({
        description: 'ID of the user renting the scooter',
        type: 'number',
    })
    userId: number;
    
    @ApiProperty({
        description: 'ID of the scooter being rented',
        type: 'number',
    })
    scooterId: number;
}

@Controller('rent')
export class RentController {
    constructor(private readonly rentService: RentService) {}

    @Post('start')
    @ApiOperation({ summary: 'Start a new rent for a user with a scooter' })
    @ApiBody({
        description: 'Request body to start a new rent',
        type: StartRentDto,  // Use a DTO to define the request body structure
    })
    @ApiResponse({
        status: 201,
        description: 'The scooter has been successfully rented',
    })
    async startRent(
        @Body('userId') userId: number,
        @Body('scooterId') scooterId: number,
    ){
        return this.rentService.rentScooter(userId, scooterId);
    }

    @Post('end/:rentId')
    @ApiOperation({ summary: 'End a rent by rent ID' })
    @ApiParam({
        name: 'rentId',
        type: 'number',
        description: 'The ID of the rent to end',
    })
    @ApiResponse({
        status: 200,
        description: 'The scooter has been successfully returned',
    })
    async endRent(@Param('rentId') rentId: number){
        return this.rentService.returnScooter(rentId);
    }

    @Get('scooters')
    @ApiOperation({ summary: 'Get all scooters: "ALL", "AVAILABLE", "RENTED"' })
    @ApiResponse({
        status: 200,
        description: 'List of available scooters',
        type: [String],  // Replace with an appropriate DTO if needed
    })
    async getAvailableScooters(
        @Query('status') status?: ScooterStatus.AVAILABLE | ScooterStatus.RENTED, // Query parameter for status
    ) {
        return this.rentService.getAvailableScooters(status);
    }

    @Get('records')
    @ApiOperation({ summary: 'Get all rented records.'})
    @ApiResponse({
        status: 200,
        description: 'Get all rented records',
    })
    async getAllRentedRecords() {
        return this.rentService.getAllRentedRecords();
    }
}